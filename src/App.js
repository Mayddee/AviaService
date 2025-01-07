import logo from './logo.svg';
import './App.css';
import TranfersFilter from './components/TransfersFilter';
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';

export const context = createContext({});


function App() {
  const [originalFlights, setOriginalFlights] = useState([]); // Store the original data
  const [flights, setFlights] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3031/flights")
      .then((response) => {
        setOriginalFlights(response.data); // Update originalFlights
        setFlights(response.data); // Also set flights initially
        console.log("Available flights: ", response.data);
      })
      .catch((err) => console.log("Error when fetching flights: ", err));
  }, []);


  const filterByTransfer = useCallback(
    (selectedTransfers) => {
      const transferCounts = selectedTransfers.map((option) => {
        if (option === "1 пересадка") return 1;
        if (option === "2 пересадки") return 2;
        if (option === "3 пересадки") return 3;
        return 0;
      });
  
      if (!originalFlights || originalFlights.length === 0) {
        console.error("Original flights data is empty!");
        return;
      }
  
      const filteredData = originalFlights.filter((item) =>
        transferCounts.includes(item.transfers.length)
      );
  
      if (JSON.stringify(filteredData) !== JSON.stringify(flights)) {
        setFlights(filteredData);
      }
    },
    [originalFlights, flights] 
  );
  

const sortFlights = useCallback(
  (sortBy) => {
    if (!flights || flights.length === 0) {
      console.error("Flights data is empty!");
      return;
    }
    const sortedFlights = [...flights].sort((a, b) => {
      if (sortBy === "Самый быстрый") return a.duration - b.duration;
      if (sortBy === "Самый дешевый") return a.price - b.price;
      return 0;
    });

    if (JSON.stringify(sortedFlights) !== JSON.stringify(flights)) {
      setFlights(sortedFlights);
    }
  },
  [flights] 
);

const handleSortChange = (sortOption) => {
  setCurrentSort(sortOption);
};

  const contextValues = useMemo(
    () => ({
      originalFlights,
      flights,
      setFlights,
      filterByTransfer,
      sortFlights,
      handleSortChange
    }),
    [originalFlights, flights, setFlights]
  );

  return (
    <div className="App">
      <h1>App</h1>
      <context.Provider value={contextValues}>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TranfersFilter />
          {flights && <FlightList />}
        </div>
      </context.Provider>
    </div>
  );
}






export default App;