import React, {useContext, useState} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";
import { Card, Divider, Typography, Row, Col, Image, List, Space, Avatar, Radio } from 'antd';



const FlightList = () => {
    const { data,
          flights,
          setFlights,
          filterByTransfer } = useContext(context);
          const positionOptions = ['Самый дешевый', 'Самый быстрый'];
          const [position, setPosition] = useState('Самый дешевый');

    return <div>
        <Space
        direction="vertical"
        style={{
          marginBottom: '20px',
        }}
        size="middle"
      >
        <Space>
         
          <Radio.Group
            optionType="button"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          >
            {positionOptions.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
        
      </Space>

        {
        [...flights].map((flight) => <FlightCard item={flight} />)
        }
    </div>

}
export default FlightList;