import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { context } from "../App";
import { Card, Typography, Row, Col, Divider, Button, List, Tag } from 'antd';
import './FlightDetails.css';

const FlightDetails = () => {
  const { id } = useParams(); 
  const { originalFlights } = useContext(context);
  const [flightDetails, setFlightDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const flight = originalFlights.find(f => f.id === id);
    setFlightDetails(flight);
  }, [id, originalFlights]);

  if (!flightDetails) return <div>Loading...</div>;

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const renderTransfers = (transfers) => {
    return transfers.map((transfer, index) => (
      <div key={index}>
        <Typography.Text>
          Transfer {index + 1}: {transfer.departure_airport.name} ({transfer.departure_airport.id}) 
          → {transfer.arrival_airport.name} ({transfer.arrival_airport.id})
        </Typography.Text>
        <br />
        <Typography.Text>
          {formatDuration(transfer.duration)} | Departure: {transfer.departure_airport.time.slice(11, 16)} 
          → Arrival: {transfer.arrival_airport.time.slice(11, 16)}
        </Typography.Text>
        <Divider />
      </div>
    ));
  };

  return (
    <div className="flight-details-container">
      <Button onClick={() => navigate(-1)} className="back-button">Back</Button>
      
      <Card className="flight-details-card" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Typography.Title level={3}>{flightDetails.airline} ({flightDetails.flight_number})</Typography.Title>
            <Typography.Text strong>From: </Typography.Text>
            <Typography.Text>{flightDetails.departure_airport.name} ({flightDetails.departure_airport.id})</Typography.Text>
            <br />
            <Typography.Text strong>To: </Typography.Text>
            <Typography.Text>{flightDetails.arrival_airport.name} ({flightDetails.arrival_airport.id})</Typography.Text>
            <br />
            <Typography.Text>{flightDetails.departure_airport.time.slice(11, 16)} - {flightDetails.arrival_airport.time.slice(11, 16)}</Typography.Text>
            <br />
            <Typography.Text>Duration: {formatDuration(flightDetails.duration)}</Typography.Text>
            <br />
            <Typography.Text>Airplane: {flightDetails.airplane}</Typography.Text>
            <br />
            <Typography.Text>Travel Class: {flightDetails.travel_class}</Typography.Text>
            <br />
            <Typography.Text>Legroom: {flightDetails.legroom}</Typography.Text>
            <br />
            <Typography.Text>Overnight Flight: {flightDetails.overnight ? 'Yes' : 'No'}</Typography.Text>
            <br />
            <Typography.Text>Often Delayed: {flightDetails.often_delayed_by_over_30_min ? 'Yes' : 'No'}</Typography.Text>
          </Col>

          <Col xs={24} sm={12}>
            <Typography.Text strong>Price: ${flightDetails.price}</Typography.Text>
            <br />
            <Typography.Text strong>Ticket sold by: </Typography.Text>
            <List
              size="small"
              bordered
              dataSource={flightDetails.ticket_also_sold_by}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <br />
            <Typography.Text strong>Available Extensions: </Typography.Text>
            <List
              size="small"
              bordered
              dataSource={flightDetails.extensions}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
        </Row>

        <Divider />
        <Typography.Title level={4}>Transfer Details</Typography.Title>
        {flightDetails.transfers && flightDetails.transfers.length > 0 ? (
          renderTransfers(flightDetails.transfers)
        ) : (
          <Typography.Text>No transfers</Typography.Text>
        )}
      </Card>
    </div>
  );
};

export default FlightDetails;
