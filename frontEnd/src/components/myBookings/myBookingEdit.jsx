import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Top from "../../components/top/Top";
import { DateRange } from 'react-date-range';
import "./myBookingEdit.css";
export default function Edit() {

const [username, setUsername] = useState("");

 const [form, setForm] = useState({
  hotel:"",
  people: "",
   movein: "",
   moveout: "",
   ratings: 5,
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     console.log(id);
     const response = await fetch(`http://localhost:5000/reservations/search/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     
     const record = await response.json();
     console.log("this is record ", record);

     const username_name = record.name;
    //  const date_startdate = record.moveIn;
    //  const date_enddate = record.moveOut;
     //console.log("after first fetching",username_name);
     setUsername(username_name);
     //console.log("after setting username",{username:username});
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/userPage", {state: {username:{username}}});
       return;
     }
     
     console.log("trying to setForm");
     setForm(record);
   }
 
   fetchData();

   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    hotel: form.hotel,
    people: form.people,
     movein: form.movein,
     moveout: form.moveout,
     ratings: form.ratings,
   };

   console.log("before second fetching",{username});
   // This will send a post request to update the data in the database.
  //  await fetch(`http://localhost:5000/reservations/edit/${params.id.toString()}`,
  //    {method: "POST",
  //    body: JSON.stringify(editedPerson),
  //    headers: {
  //      'Content-Type': 'application/json'
  //    },
  //  });

  //  console.log("after second fetching",{username});

  try {
    await fetch(`http://localhost:5000/reservations/edit/${params.id.toString()}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log("after second fetching", {username});
  } catch (error) {
    console.error(error);
  }
  
   navigate("/userPage", {state: {username:{username}, loggedIn:true}});
 }

   //when clicking search button
   const btnClicked = () =>{
    navigate("/userPage", {state: {username:{username}, loggedIn:true}})
  }
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
    <Top type="notHome"/>
    <div className="logCtn">
    <div className="logWp">
  <button className="myPageBtn" onClick={btnClicked}>Go to my page</button>
  <form className="fields" onSubmit={onSubmit}>
  <h3 className="logTxt">{`Hotel Name: ${form.hotel}`}</h3>
  <h3 className="logTxt">Edit My Reservation</h3>
  <div className="form-group">
      <label htmlFor="name">How many people? : </label>
      <input
        type="number"
        className="form-control"
        id="people"
        value={form.people}
        onChange={(e) => updateForm({ people: Number(e.target.value) })}
      />
    </div>
    {/* <div className="form-group">
              <span onClick={() => 
                setOpenCal(!openCal)}
                className="searchText">{`${form.movein} to ${form.moveout}`}</span>
              {openCal && <DateRange
                editableDateInputs={true}
                onChange={(e) => updateForm({ movein: e.target.value ,  moveout: e.target.value })}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
              />}
              </div> */}
    <div className="form-group">
      <label htmlFor="name">Move in date: </label>
      <input
        type="text"
        className="form-control"
        id="in"
        value={form.movein}
        onChange={(e) => updateForm({ movein: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="position">Move out date: </label>
      <input
        type="text"
        className="form-control"
        id="out"
        value={form.moveout}
        onChange={(e) => updateForm({ moveout: e.target.value })}
      />
    </div>
    <div className="form-group">
    <label htmlFor="name">Rate the hotel : </label>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="Ratings"
          id="Rating1"
          value="1"
          //checked={form.ratings === 1}
          onChange={(e) => updateForm({ ratings:Number(e.target.value) })}
        />
        <label htmlFor="positionIntern" className="form-check-label">1</label>
      
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="Ratings"
          id="Rating2"
          value="2"
          //checked={form.ratings === 2}
          onChange={(e) => updateForm({ ratings:Number(e.target.value) })}
        />
        <label htmlFor="positionJunior" className="form-check-label">2</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="Ratings"
          id="Rating3"
          value="3"
          //checked={form.ratings === 3}
          onChange={(e) => updateForm({ ratings:Number(e.target.value) })}
        />
        <label htmlFor="positionSenior" className="form-check-label">3</label>
        </div>
        <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="Ratings"
          id="Rating4"
          value="4"
          //checked={form.ratings === 4}
          onChange={(e) => updateForm({ ratings:Number(e.target.value) })}
        />
        <label htmlFor="positionSenior" className="form-check-label">4</label>
        </div>
        <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="Ratings"
          id="Rating5"
          value="5"
          //checked={form.ratings === 5}
          onChange={(e) => updateForm({ ratings:Number(e.target.value) })}
        />
        <label htmlFor="positionSenior" className="form-check-label">5</label>
        </div>
        
    
    </div>
    <br />

    <div className="form-group">
    <button type="submit" className="loginBtn">Edit</button>
    </div>
  </form>
</div>
</div>
</div>
 );
}