import React, { useState} from "react";
import { useNavigate } from "react-router";
import { Link} from "react-router-dom"
import Top from "../../components/top/Top";
import "./register.css"

export default function Register(){

  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

   // These methods will update the state properties.
 function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

async function onSubmit(e) {
  e.preventDefault();

  // When a post request is sent to the create url, we'll add a new record to the database.
  const newPerson = { ...form };

  await fetch("http://localhost:5000/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  alert("successfully registered");
  setForm({ name: "", password: ""});
  navigate("/");
}

  return (
    <div>
    <Top type="notHome"/>
    <div className="regCtn">
      <div className="regWp">
        <h1 className="regTxt">Register</h1>
        <form className="fields" onSubmit={onSubmit}
        // onSubmit={registerUser}
        >
          <input type="text"
                 placeholder="Username"
                //  value={name}
                onChange={(e) => updateForm({ name: e.target.value })}
                 />
          <input type="password"
                 placeholder="password"
                //  value={password}
                onChange={(e) => updateForm({ password: e.target.value })}
                 />
          <button className="RegisterBtn">Register</button>
          <div className="bottomTxt">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

