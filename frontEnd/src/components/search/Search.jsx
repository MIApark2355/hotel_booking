import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from 'react-date-range';
import "./search.css";
import { faBed, faCalendarDays, faHotel, faPerson, faFilter } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useLocation, useNavigate } from "react-router-dom";

const Search = ({username}) => {
  console.log(username);

  console.log("did search page received username? ", username);
  
  const navigate = useNavigate();
  const current = new Date(); 
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(current.getTime() + 86400000),
      key: 'selection'
    }
  ]);
  //state for calendar (opened or closed)
  const [openCal,setOpenCal] = useState(false);

  //state for location data
  const [loc,setLoc] = useState("St.Louis");

  //state for a box for choosing the number of people and rooms
  const [openPpl,setOpenPpl] = useState(false);
  const [openRoom,setOpenRoom] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [ppl, setPpl] = useState(1);
  const [priceF, setPriceF] = useState(100);
  const [ratingF , setRatingF] = useState(5);
  
  //when clicking search button
  const searchClicked = () =>{
    navigate("/searchResult", {state: {loc, date, ppl, rooms, priceF, ratingF, username, loggedIn: true}})
  }

  return (
    <div className="header">
        <div className="headerCtn">
            <div className="headerSearch">
              <div className="searchItem">
              <FontAwesomeIcon icon={faHotel} size="lg" style={{color: "#ffcf24",}} />
              <input type="text" placeholder={loc} className="searchInput" onChange={e=>setLoc(e.target.value)}/>
              </div>
              <div className="searchItem">
              <FontAwesomeIcon icon={faCalendarDays} size="lg" style={{color: "#ffcf24",}} />
              <span onClick={() => 
                setOpenCal(!openCal)}
                className="searchText">{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
              {openCal && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
              />}
              </div>
              <div className="searchItem">
              <FontAwesomeIcon icon={faPerson} size="lg" style={{color: "#ffcf24",}} />
              <span
              onClick={() => {
                setOpenPpl(!openPpl)}}
              className="searchText">{`${ppl} people`}</span>
              {openPpl && (
              <div className="options">
                <div className="option">
                  <span className="optionTxt">People </span>
                  <button 
                  disabled={ppl <= 1 }
                  className="counterBtn" onClick ={() => setPpl(ppl - 1)}> - </button>
                  <span className="counterNum">{ppl}</span>
                  <button className="counterBtn" onClick ={() => setPpl(ppl + 1)}> + </button>
                </div>
              </div>)}
              </div>

              <div className="searchItem">
              <FontAwesomeIcon icon={faBed} size="lg" style={{color: "#ffcf24",}} />
              <span
              onClick={() => {
                setOpenRoom(!openRoom)}}
              className="searchText">{`${rooms} rooms`}</span>
              {openRoom && (
              <div className="options">
                <div className="option">
                  <span className="optionTxt">Room </span>
                  <button 
                  disabled={rooms <= 1 }
                  className="counterBtn" onClick ={() => setRooms(rooms - 1)}> - </button>
                  <span className="counterNum">{rooms}</span>
                  <button className="counterBtn" onClick ={() => setRooms(rooms + 1)}> + </button>
                </div>
              </div>)}
              </div>

            <div className="filterLst">
            
            <div className="searchItem">
            <FontAwesomeIcon icon={faFilter} size="lg" style={{color: "#ffcf24",}} />
              <span
              onClick={() => {
                setOpenFilter(!openFilter)}}
              className="searchText">Filter</span></div>
              {openFilter && (
              <div className="options">
                <div className="option">
                  <span className="optionTxt">Max Price </span>
                  <input  
                  className="lstOptionInput" 
                  type="number"
                  placeholder={priceF}
                  onChange = {(e) => setPriceF(Number(e.target.value))}
                  min={0}/>
                </div>

                <div className="option">
                  <span className="optionTxt">
                    Min Rating
                  </span>
                  <input  
                  className="lstOptionInput" 
                  type="number"
                  placeholder={ratingF}
                  min={0}
                  max={5}
                  onChange = {(e) => setRatingF(Number(e.target.value))}/>
                </div>
              </div>
              )}
          </div>
          {username !== null && (
              <button className="searchBtn" onClick={searchClicked}>Search</button>
            ) }
          
          </div>

              
            </div>
        </div>
  )
}

export default Search