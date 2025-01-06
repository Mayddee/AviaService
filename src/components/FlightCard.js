import React, { useContext } from "react";
import { context } from "../App";
import { Card, Divider, Typography, Row, Col, Image, List } from 'antd';
import './FlightCard.css';

const FlightCard = ({ item }) => {
  const { flights } = useContext(context);

  const renderTransfers = (transfers) => {
    
    return transfers.map((transfer, index) => (
        <List
        size="small"
        dataSource={transfers}
        renderItem={(transfer, index) => (
          <List.Item key={index}>
      
              {transfer.departure_airport.id} , {transfer.arrival_airport.id} 
              {/* {transfers.length} */}
              {/* {transfer.departure_airport.time.slice(11, 16)} - {transfer.arrival_airport.time.slice(11, 16)} */}
           
          </List.Item>
        )}
      />
    ));
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <Card
    style={{
      width: '600px',
      margin: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
    }}
    hoverable
  >
    <Row  style={{ flex: 2 }}>
      {/* <Col span={8}>
        <Image
          width={50}
          src={item.airline_logo}
          alt={item.airline}
          style={{ borderRadius: '5px' }}
        />
      </Col> */}
      <Col span={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography.Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
          {item.airline}
        </Typography.Text>

        <Typography.Text style={{ color: '#333' }}>
          {item.departure_airport.id} - {item.arrival_airport.id}
          <br />
          {item.departure_airport.time.slice(11, 16)} - {item.arrival_airport.time.slice(11, 16)}
        </Typography.Text>
        <Typography.Text style={{ color: '#333' }}>Duration: {formatDuration(item.duration)}</Typography.Text>
      </Col>
      
      <div>{item.transfers.length > 0 &&  <div>{item.transfers.length} пересадки</div>} {renderTransfers(item.transfers)}</div>

    <Row style={{ marginTop: '10px', flexDirection: 'row', width: '100%' }}>
      <Col span={12}>
        <Typography.Text strong style={{ color: '#333' }}>
          Price:
        </Typography.Text>
      </Col>
      <Col span={12}>
        <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
          ${item.price}
        </Typography.Text>
      </Col>
    </Row>
    </Row>

    <Divider />

    
  </Card>
  );
};
export default FlightCard;