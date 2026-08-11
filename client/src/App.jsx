import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import MyBookings from "./Pages/MyBookings";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/hotelOwner/Layout";
import DashBoard from "./Pages/hotelOwner/DashBoard";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import ListRoom from "./Pages/hotelOwner/ListRoom";
import {Toaster} from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";
import Loader from "./Components/Loader";


function App(){

  const isOwnerPath=useLocation().pathname.includes("owner");

  const {showHotelReg}=useAppContext();


  return(
    <div>
      <Toaster/>
      {showHotelReg && <HotelReg/>}
      {!isOwnerPath && <Navbar/>}

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/rooms" element={<AllRooms/>}/>
          <Route path="/rooms/:id" element={<RoomDetails/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route path='/loader/:nextUrl' element={<Loader/>}/>

          <Route path="/owner" element={<Layout/>}>
            <Route index element={<DashBoard/>}/>
            <Route path="add-room" element={<AddRoom/>}/>
            <Route path="list-room" element={<ListRoom/>}/>
          </Route>
        </Routes>

      </div>

      <Footer/>
    </div>
  )
}

export default App;