import React, { useState} from "react";
import { useNavigate } from "react-router";
import { useLocation,Link} from "react-router-dom"
import Top from "../../components/top/Top";
import "./book.css"

export default function Book(){

  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
      username:"",
      hotel:"hotel0",
      movein:"03/20/2023",
      moveout:"04/20/2023",
      people: 5,
      reservation: 5,
  });
  

   // These methods will update the state properties.
 function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}


  return (
    <div>
        <Top/>
        Book</div>
  )
};
