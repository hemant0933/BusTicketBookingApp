import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Landingpage from "./pages/Landingpage";
import TicketBrowsing from "./pages/TicketBrowsing";
import TicketBooking from "./pages/TicketDashboard";
import BusDetailPage from "./pages/BusDetailPage";
import UserDashBoard from "./pages/UserDashBoard";


function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
 
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/browse-tickets" element={isAuth ? <TicketBrowsing /> : <Navigate to="/" />}/>
      <Route path="/book-ticket" element={isAuth ? <TicketBooking /> : <Navigate to="/" />}/>
      <Route path="/userProfile" element={isAuth ? <UserDashBoard /> : <Navigate to="/" />}/>
      <Route path="/:busId" element={isAuth ? <BusDetailPage /> : <Navigate to="/" />}/>
    </Routes>
  )
}

export default App
