//This goes to filteredPage

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./filteredHotels.css";


const Record = (props) => (
    <div className="hotelItem">
    <img
    src="data:image/jpeg;base64,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"
    alt="blah"
    className="hotelImg"
    />
    <div className="hotelTxt1">
        <h1 className="hotelName">{props.record.name}</h1>
        <span className="hotelFeature">1 King bed / 1 bathroom</span>
        <div className="hotelLocation">
            {`Location: ${props.record.location}`}
        </div>
    </div>
  
    <div className="hotelTxt2">
    <div className="hotelRating">
      <span>Rating</span>
      <button>{props.record.ratings}</button>
    </div>
    <div className="hotelTxt3">
    <div className="hotelDetail">
      <span className="Price">{`$ ${props.record.price}`}</span>
      <button className="saveBtn" onClick={() => {
            props.saveRecord();
          }}>Save</button>
      <button className="bookBtn btn-link"
          onClick={() => {
            props.bookRecord();
          }}
  
        >Book
        </button>
    </div>
    </div>
    
    </div>
  </div>
  ); 


   export default function FilteredHotels(condition) {
    const [records, setRecords] = useState([]);

    // SANITIZE INPUT
    
    useEffect(() => { // fetch filtered hotels
      async function getRecords() {
        const response = await fetch(`http://localhost:5000/hotels/filter`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(condition),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        
        const records = await response.json();
        setRecords(records);
      };
    
      getRecords();
    
      return;
    }, [records.length]);
    
    // This method will book the hotel with the search result 
    async function bookRecord(hotel) {
      let start = "";
      start = start.concat(condition["movein"]);
      let startArray = start.split(' '); 
      start = startArray[1] + "/" +startArray[2]+"/"+startArray[3];
      let end = "";
      end = end.concat(condition["moveout"]);
      console.log(end);
      let endArray = end.split(' ');
      end = endArray[1] + "/" +endArray[2]+"/"+endArray[3];
      let myObj = JSON.parse(JSON.stringify(condition)); // deep copy of read-only object
      myObj.movein = start;
      myObj.moveout = end;

      console.log("trying to book hotel name: ", hotel);
      myObj.hotel =hotel;
      myObj.username = condition["username"]["username"];
      console.log(myObj);
      console.log("here");
// TODO need username passed into filteredPage
    await fetch("http://localhost:5000/reservations/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myObj),
    })
    .then(
      alert("Booked")
    )
    .catch(error => {
      window.alert(error);
      return;
    });
      
      const newRecords = records; // need to return lists of new hotels
      setRecords(newRecords);
    }

        // This method will add the hotel to the "saved" list
    async function saveRecord(hotel) {
      console.log("trying to save hotel name: ", hotel);
      let myObj = JSON.parse(JSON.stringify(condition)); // deep copy of read-only object
      myObj.hotel = hotel;
      myObj.username = condition["username"]["username"];
      myObj.location =condition["location"];
      myObj.price = condition["price"];

      console.log("user: ",myObj.username);
      console.log("location: ",myObj.location);
      console.log("price: ",myObj.price);
    // TODO need username passed into filteredPage
        await fetch("http://localhost:5000/savedlist/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myObj),
        })
        .then(
          alert("Saved")
        )
        .catch(error => {
          window.alert(error);
          return;
        });
          
          const newRecords = records; // need to return lists of new hotels
          setRecords(newRecords);
        }

    
    // This method will map out the records on the table
    function FilteredList() {
      return records.map((record) => {
        //console.log("record is ", record);
        return (
          <Record
            record={record}
            saveRecord={() => saveRecord(record.name)}
            bookRecord={() => bookRecord(record.name)}
            key={record._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <div class="main">
      <div className="all">
        <div className="nameCtn">
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>{FilteredList()}</tbody>
        </table>
      </div>
      </div>
    );
   }