import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from 'react-date-range';
import "./result.css";
import { faBed, faCalendarDays, faHotel, faPerson, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  
 const location = useLocation();
 console.log(location);
  const navigate = useNavigate();
 
  const [loc, setLoc] = useState(location.state.loc);
  const [date, setDate] = useState(location.state.date);
  const [ppl, setPpl] = useState(location.state.ppl);
  const [rooms, setRooms] = useState(location.state.rooms);

  const [priceF, setPriceF] = useState(location.state.priceF);
  const [ratingF , setRatingF] = useState(location.state.ratingF);
  
  console.log({date});
  return (
    <div className="header">
        <div className="headerCtn">
            <div className="headerSearch">
              <div className="searchItem">
              <FontAwesomeIcon icon={faHotel} size="lg" style={{color: "#ffcf24",}} />
              {loc}
              </div>
              <div className="searchItem">
              <FontAwesomeIcon icon={faCalendarDays} size="lg" style={{color: "#ffcf24",}} />
              <span>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
              </div>
              <div className="searchItem">
              <FontAwesomeIcon icon={faPerson} size="lg" style={{color: "#ffcf24",}} />
              {`${ppl} people`}
              </div>

              <div className="searchItem">
              <FontAwesomeIcon icon={faBed} size="lg" style={{color: "#ffcf24",}} />
              {`${rooms} rooms`}
              </div>
            
            <div className="searchItem">
            <FontAwesomeIcon icon={faDollarSign} size="lg" style={{color: "#ffcf24",}} />
            {`MAX ${priceF} dollars`}</div>

            <div className="searchItem">
            <FontAwesomeIcon icon={faStar} size="lg" style={{color: "#ffcf24",}} />
            {`MIN ${ratingF} ratings`}</div>

          </div>

              
            </div>
        </div>
  )
}

export default Result