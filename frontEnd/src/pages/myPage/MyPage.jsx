import "./myPage.css";
import { DateRange } from 'react-date-range';
import {useState} from 'react';
import Top from "../../components/top/Top";
import HotelItem from "../../components/hotelItem/HotelItem";
import Search from "../../components/search/Search";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import BookingList from "../../components/myBookings/myBookings";
import SavedList from "../../components/myBookings/MySaved";

const MyPage = () => {
  const location = useLocation();
  console.log("location.state.username ",location.state.username);
  const username = location.state.username.username;

  const [tabType, setTabType] =useState('My Bookings');
  console.log("tabType: ", tabType);
  return (
    <div>
      <Top type="list"/>
      <div className="tabs">
        <button onClick={()=>setTabType('My Bookings')} className="booked">My bookings</button>
        <button onClick={()=>setTabType('Saved Hotels')} className="saved">Saved hotels</button>
      </div>
      <div className="main">
      <div className="body">
        {(tabType==="My Bookings") ? (<div><BookingList username={username}/></div>) : (<div><SavedList username={username}/></div>)}
      </div>
    
        </div>
        </div>
  )
}

export default MyPage
