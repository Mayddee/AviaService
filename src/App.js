import logo from './logo.svg';
import './App.css';
import TranfersFilter from './components/TransfersFilter';
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';
import SearchComponent from './components/Search';
import FlightDetails from './components/FlightDetails'; // Assuming you have this component for flight details
import { Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components

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
    <div className="App" style={{ marginTop: "50px" }}>
      <Router>
      <context.Provider value={contextValues}>
      <Routes>
      <Route path="/" element={<div>
        <SearchComponent className="search-container" />

        <div className="flights-container">
              <TranfersFilter />
              {loading ? (
                <Spin size="large" style={{ marginTop: "20px" }} />
              ) : (
                <FlightList />
              )}
            </div>
        </div>} />
            <Route path="/flight/:id" element={<FlightDetails />} />

      </Routes>
      
    </context.Provider>
      </Router>
    
  </div>
  );
}






export default App;