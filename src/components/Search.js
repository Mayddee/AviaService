import React, {useContext, useState, useEffect} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";
import { Input, Card, Divider, Button } from 'antd';
import axios from "axios";
import { AudioOutlined } from '@ant-design/icons';
import "./Search.css";

const { Search } = Input;

 


const SearchComponent = () => {
    const { data,
        flights,
        setFlights,
        filterByTransfer, sortFlights, handleSortChange, onSearch } = useContext(context);

    const [value, setValue] = useState("");
        

    return <div className="search-bar" style={{
        margin: "30px"
    }}>
        <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
   

    </div>
}

export default SearchComponent;