import React, {useContext, useState, useEffect} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";
import { Card, Divider, Typography, Row, Col, Image, List, Space, Avatar, Radio } from 'antd';
import axios from "axios";
import "./FlightList.css";



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
        

      

    return <div className="flights-container">
      <div className="sort-container">
      <Space
        direction="vertical"
        style={{ marginBottom: '20px', width: '100%' }}
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
      </div>
        
        
      <div className="cards-container">
        {
            [...flights].map((flight, index) => <FlightCard key={index} item={flight} />)
        }
      </div>
       
    </div>

}
export default FlightList;

