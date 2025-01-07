import logo from './logo.svg';
import './App.css';
import TranfersFilter from './components/TransfersFilter';
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';
import SearchComponent from './components/Search';

export const context = createContext({});


function App() {
  const [originalFlights, setOriginalFlights] = useState([]); 
  const [flights, setFlights] = useState([]);
  const [currentSort, setCurrentSort] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get("http://localhost:3031/flights")
      .then((response) => {
        setOriginalFlights(response.data); 
        setFlights(response.data); 
        
        console.log("Available flights: ", response.data);
      })
      .catch((err) => console.log("Error when fetching flights: ", err));
      setLoading(false); 
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

const onSearch = useCallback((value) => {
  console.log('Searching for:', value);
  if (!originalFlights || originalFlights.length === 0) {
    console.error("Original flights data is empty or still loading!");
    return;
  }
  if (!value) {
    setFlights(originalFlights);
    return;
  }

  const searchValue = value.toLowerCase();

  const searchedData = originalFlights.filter((flight) => {
    return [flight.airline, flight.departure_airport.id, flight.arrival_airport.id].some((field) =>
      field.toLowerCase().includes(searchValue)
    );
  });

  setFlights(searchedData); 
}, [originalFlights]);



  const contextValues = useMemo(
    () => ({
      originalFlights,
      flights,
      setFlights,
      filterByTransfer,
      sortFlights,
      handleSortChange,
      originalFlights,
      onSearch
    }),
    [originalFlights, flights, setFlights]
  );

  return (
    <div className="App" style={{
      marginTop: "50px"
    }}>
      
      {/* <h1>App</h1> */}
      <context.Provider value={contextValues}>
        <SearchComponent />
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