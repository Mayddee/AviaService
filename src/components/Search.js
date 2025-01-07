import React, {useContext, useState, useEffect} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";
import { Input, Card, Divider, Button } from 'antd';
import axios from "axios";
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

 


const SearchComponent = () => {
    const { data,
        flights,
        setFlights,
        filterByTransfer, sortFlights, handleSortChange, onSearch } = useContext(context);

    const [value, setValue] = useState("");
        

    return <div style={{
        margin: "30px"
    }}>
        {/* <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    /> */}
    <div style={{ margin: "30px" }}>
  <input
    type="text"
    placeholder="input search text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    
    style={{
      width: 200,
      padding: "5px",
      fontSize: "16px",
    }}
  />
</div>
<Button
        type="primary"
        onClick={() => onSearch(value)}
        style={{
          padding: "5px 15px",
          fontSize: "16px",
        }}
      >
        Search
      </Button>

    </div>
}

export default SearchComponent;