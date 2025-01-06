import React, {useContext} from "react";
import { context } from "../App";
import FlightCard from "./FlightCard";


const FlightList = () => {
    const { data,
          flights,
          setFlights,
          filterByTransfer } = useContext(context);


    return <div>
        {
        [...flights].map((flight) => <FlightCard item={flight} />)
        }
    </div>

}
export default FlightList;