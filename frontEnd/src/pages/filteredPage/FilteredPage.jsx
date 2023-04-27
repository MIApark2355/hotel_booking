//This is the second page
import "./filteredPage.css";
import { DateRange } from 'react-date-range';
import {useState} from 'react';
import Top from "../../components/top/Top";
import FilteredHotels from "../../components/filteredHotels/FilteredHotels";
import Result from "../../components/result/Result";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const FilteredPage = () => {

  const location = useLocation();
  const [loc, setLoc] = useState(location.state.loc);

  const [date, setDate] = useState(location.state.date);
  const [ppl, setPpl] = useState(location.state.ppl);
  const [rooms, setRooms] = useState(location.state.rooms);

  const [priceF, setPriceF] = useState(location.state.priceF);
  const [ratingF , setRatingF] = useState(location.state.ratingF);
  const [username, setUsername] = useState(location.state.username);
  console.log(location);



  return (
    <div>
      <Top type="list"/>
      <div className="main">
        <Result/>
      <div className="body">
        <FilteredHotels price={priceF} movein = {date[0]["startDate"]} moveout = {date[0]["endDate"]} location={loc} ratings={ratingF} people={ppl} username = {username}/>
      </div>
        </div>
        </div>
  );
}

export default FilteredPage
