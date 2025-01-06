import logo from './logo.svg';
import './App.css';
import TranfersFilter from './components/TransfersFilter';
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';

export const context = createContext({});

function App() {
  
  
  const [flights, setFlights] = useState([]);
  var data = [];

  // useEffect(()=>{
  //   axios.get("http://localhost:3031/flights").then((response) => {
  //     data = response.data;
  //     setFlights(data);

  //     return data;
      
  //   }).then((flights) => {
  //     console.log("Available flights: ", flights);

  //   }).catch((err)=> console.log("Error when fetching flights: ", err));

  // }, []);
  useEffect(() => {
    axios.get("http://localhost:3031/flights")
      .then((response) => {
        data = response.data;
        setFlights(response.data);
        console.log("Available flights: ", data);
      })
      .catch((err) => console.log("Error when fetching flights: ", err));
  }, []);

  useEffect(() => {
    console.log("Available flights 2:", flights);
  }, [flights]); 

  
  const filterByTransfer = useCallback(async (selectedTransfers) => {
    // if(!data || data.length === 0){
    //   console.error("Data is empty!");
    //   return;
    // }
    try{
      const res = await axios.get("http://localhost:3031/flights");
      const resData = await res.data;
      const transferCounts = selectedTransfers.map(option => {
        if (option === "1 пересадка") return 1;
        if (option === "2 пересадки") return 2;
        if (option === "3 пересадки") return 3;
        return 0;
      });
    
      // Filter the flights based on the selected transfer counts
      const filteredData = resData.filter((item) =>
        transferCounts.includes(item.transfers.length)
      );
    
      setFlights(filteredData);
    }catch(err){
      console.err("Error during filtering data: ", err);
    }

    // var filteredData = [...data].filter((item, id) => 
    //   item["transfers"].length === amount
    // );
    // setFlights(filteredData);
   

  }, [data])
  const contextValues = useMemo(()=>({
    data,
    flights,
    setFlights,
    filterByTransfer
  }),[
    data,
    flights,
    setFlights
  ])
  return (
    <div className="App">
      <h1>App</h1>
      
      <context.Provider value={contextValues}>
        <div style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "row",
          justifyContent: "space-around"
        }}>
        <TranfersFilter />
        {
          flights &&  <FlightList />
        }

        </div>
        
       
      </context.Provider>
      
    </div>
  );
}

export default App;
