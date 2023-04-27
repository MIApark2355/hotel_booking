import React, { useState} from "react";
import { useNavigate } from "react-router";
import { Link} from "react-router-dom"
import Top from "../../components/top/Top";
import "./log.css";

export default function Log() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    const userlog = {username, password};
    // Send login request to server and get response
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userlog)
    });

    const result = await(response.json()); // turn response into JSON object
    if (result.success) {
      // If login is successful, navigate to home page with username as state parameter
      alert("successfully logged in!");
      navigate("/", { state: { username: username ,loggedIn:true} });
    } else {
      // Handle error
      alert("Wrong username or password, please try again!");
      console.error("Login failed");
    }
  }

 

    return (
      <div>
      <Top type="notHome"/>
      <div className="logCtn">
        <div className="logWp">
          <h1 className="logTxt">Login</h1>
          <form className="fields" onSubmit={onSubmit}>
            <input type="name"
                   placeholder="your username"
                  //  value={name}
                  onChange={(e) => setUsername({ username: e.target.value })}
                  />
            <input type="password"
                   placeholder="password"
                  //  value={password}
                  onChange={(e) => setPassword({ password: e.target.value })}
                  />
            <button type="submit" className="loginBtn">Login</button>
            <div className="bottomTxt">
              Don't have an account yet? 
              <Link className="underline text-black" to={'/register'}>Register now</Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
}