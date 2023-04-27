import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import FilteredPage from "./pages/filteredPage/FilteredPage";
import Log from "./pages/log/Log";
import MyPage from "./pages/myPage/MyPage";
import Edit from "./components/myBookings/myBookingEdit";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/searchResult" element={<FilteredPage/>}/>
        <Route path="/logIn" element={<Log/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/userPage" element={<MyPage/>}/>
        <Route path="/reservations/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;