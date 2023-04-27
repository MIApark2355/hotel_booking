import { useState } from "react";
import Search from "../../components/search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import "./top.css";

const Top = ({ type}) => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(location.state?.loggedIn || false);
  const [username, setUsername] = useState(location.state?.username || null);
  const navigate = useNavigate();

  const loginClicked = () => {
    navigate("/login");
  };

  const logoutClicked = () => {
    setLoggedIn(false);
    setUsername(null);
    navigate("/", { state: { username: null ,loggedIn:false}});
  };

  const userGoBackClicked = () => {
    navigate("/",{ state: { username: username ,loggedIn:true}});
  };

  const goBackClicked = () => {
    navigate("/",{ state: { username: username ,loggedIn:false}});
  };

  const userHomeClicked = () => {
    navigate("/",{ state: { username: username ,loggedIn:true }});
  };
  const homeClicked = () => {
    navigate("/",{ state: { username: username ,loggedIn:false }});
  };

  const myPageClicked = () => {
    navigate("/userPage", {state: { username: username ,loggedIn:true}});
  };

  console.log("what would be send to search page?" , {username});
  return (
    <div className="top">


    <div className="topHalf">
      <div className={type === "list" ? "topCtn listMode" : "topCtn"}>
          {loggedIn ? (
              <span className="title" onClick={userHomeClicked}>
              WashUHotels
            </span>
            ) : (
              <span className="title" onClick={homeClicked}>
          WashUHotels
        </span>
            )}
        
        <div className="topItems">
          {type === "home" ? (
            loggedIn ? (
              <button className="topBtn" onClick={logoutClicked}>
                Log out
              </button>
            ) : (
              <button className="topBtn" onClick={loginClicked}>
                Log in
              </button>
            )
          ) : (
            loggedIn ? (
              <button className="topBtn" onClick={userGoBackClicked}>
                Go Back
              </button>
            ) : (
              <button className="topBtn" onClick={goBackClicked}>
                Go Back
              </button>
            )
          )}
          <div className="topRightItems">
            {loggedIn && (
              <div>
                <span className="helloTxt">{`HELLO, ${username.username}`}</span>
                <button className="topBtn" onClick={myPageClicked}>
                  My page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="bottomHalf">
      <Search username={username} />
    </div>

    </div>
  );
};

export default Top;
