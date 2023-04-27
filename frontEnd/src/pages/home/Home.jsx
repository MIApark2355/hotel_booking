import "./home.css";
import Top from "../../components/top/Top";
// import Search from "../../components/search/Search";
import Featured from "../../components/featured/Featured";
import Bottom from "../../components/bottom/Bottom";
import RecordList from "../../components/hotelRecords/hotelRecords";
import { useLocation} from "react-router-dom";
import { useState } from "react";
const Home = () => {
  const location = useLocation();
  // const [loggedIn, setLoggedIn] = useState(location.state?.loggedIn || false);
  // const log_input = loggedIn.loggedIn;
  return (
    <div>
        <Top type="home"/>
        {/* <Search/> */}
        <div className="homeCtn">
          <Featured/>
          <RecordList/>
          <Bottom/>
        </div>
        </div>
  )
}

export default Home