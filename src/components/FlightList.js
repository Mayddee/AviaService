import React, {useContext, useState, useEffect} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";
import { Card, Divider, Typography, Row, Col, Image, List, Space, Avatar, Radio } from 'antd';
import axios from "axios";



const FlightList = () => {
    const { data,
          flights,
          setFlights,
          filterByTransfer, sortFlights, handleSortChange } = useContext(context);
          const positionOptions = ['Самый дешевый', 'Самый быстрый'];
          const [position, setPosition] = useState('Самый дешевый');

          useEffect(() => {
            handleSortChange(position); 
            sortFlights(position); 
          }, [position, sortFlights, handleSortChange]);
        

      

    return <div>
        <Space
        direction="vertical"
        style={{ marginBottom: '20px' }}
        size="middle"
      >
        <Radio.Group
          optionType="button"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <Radio.Button value="Самый дешевый">Самый дешевый</Radio.Button>
          <Radio.Button value="Самый быстрый">Самый быстрый</Radio.Button>
        </Radio.Group>
      </Space>
        

        {
        [...flights].map((flight, index) => <FlightCard key={index} item={flight} />)
        }
    </div>

}
export default FlightList;

// import React, { useContext, useState, useEffect } from "react";
// import { context } from "../App";
// import FlightCard from "./FlightCard";
// import { Space, Radio } from "antd";

// const FlightList = () => {
//   const { flights, sortFlights, currentSort, handleSortChange } = useContext(context);
//   const positionOptions = ["Самый дешевый", "Самый быстрый"];
//   const [position, setPosition] = useState(currentSort || "Самый дешевый");

//   // Synchronize the sorting with the context
//   useEffect(() => {
//     handleSortChange(position); // Update the current sort in context
//     sortFlights(position); // Apply sorting
//   }, [position, sortFlights, handleSortChange]);

//   return (
//     <div>
//       {/* Sorting Options */}
//       <Space direction="vertical" style={{ marginBottom: "20px" }} size="middle">
//         <Radio.Group
//           optionType="button"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//         >
//           {positionOptions.map((option) => (
//             <Radio.Button key={option} value={option}>
//               {option}
//             </Radio.Button>
//           ))}
//         </Radio.Group>
//       </Space>

//       {/* Flight List */}
//       {flights.map((flight, index) => (
//         <FlightCard key={index} item={flight} />
//       ))}
//     </div>
//   );
// };

// export default FlightList;
