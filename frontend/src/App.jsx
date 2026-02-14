import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {createContext, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

{/* Public */}
import PublicLayout from "./layouts/PublicLayout.jsx";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";

{/* Admin */}
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";

{/* User */}
import UserLayout from "./layouts/UserLayout.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
import Profile from "./pages/users/Profile.jsx";
import ChangePassword from "./pages/users/ChangePassword.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Book from "./pages/users/Book.jsx";
import Visitors from "./pages/users/Visitors.jsx";
import Vehicle from "./pages/users/Vehicle.jsx";
import ManageAdmins from "./pages/admin/ManageAdmins.jsx";
import GaurdLayout from "./layouts/GaurdLayout.jsx";
import GaurdLogin from "./pages/GaurdLogin.jsx";
import Flats from "./pages/admin/Flats.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageGaurds from "./pages/admin/ManageGaurds.jsx";
import ManageHelpers from "./pages/admin/ManageHelpers.jsx";
import Complaints from "./pages/admin/Complaints.jsx";
import AdminChangePassword from "./pages/admin/ChangePassword.jsx";
import RegisterComplaint from "./pages/users/RegisterComplaint.jsx";
import Amenities from "./pages/users/Amenities.jsx";
import UserChangePassword from "./pages/users/ChangePassword.jsx";

// Gaurd
import GaurdDashboard from "./pages/gaurd/Dashboard.jsx";
import ManageVisitors from "./pages/gaurd/ManageVisitors.jsx";
import ManageVehicles from "./pages/gaurd/ManageVehicles.jsx";
import ViewComplaints from "./pages/users/ViewComplaints.jsx";
import GaursChangePassword from "./pages/gaurd/ChangePassword.jsx";


export const NameContext = createContext();

function App() {
    const [name, setName] = useState("Pratham");

    const [user, setUser] = useState({
        name: 'Aryan',
        age: 24,
        gender: 'Male',
    });

    return (
        <BrowserRouter>
            <NameContext.Provider value={{name, setName, user, setUser}}>
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<PublicLayout/>}>
                        <Route index element={<Home/>}/>

                        <Route path="user-Signup" element={<UserSignup/>}/>
                        <Route path="about-us" element={<AboutUs/>}/>
                        <Route path="contact-us" element={<ContactUs/>}/>
                        <Route path="user-login" element={<UserLogin/>}/>
                        <Route path="admin-login" element={<AdminLogin/>}/>
                        <Route path="gaurd-login" element={<GaurdLogin/>}/>
                    </Route>

                    {/* Admin */}
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route path="home" element={<DashboardAdmin/>}/>
                        <Route path="manage-admin" element={<ManageAdmins/>}/>
                        <Route path="manage-flats" element={<Flats/>}/>
                        <Route path="manage-users" element={<ManageUsers/>}/>
                        <Route path="manage-gaurds" element={<ManageGaurds/>}/>
                        <Route path="manage-helpers" element={<ManageHelpers/>}/>
                        <Route path="view-complaints" element={<Complaints/>}/>
                        <Route path="change-password" element={<AdminChangePassword/>}/>
                    </Route>

                    {/* User */}
                    <Route path="/user" element={<UserLayout/>}>
                        <Route path="home" element={<Dashboard/>}/>
                        <Route path="book-helper" element={<Book/>}/>
                        {/*<Route path="view-bookings" element={<ViewBookings/>}/>*/}
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                        <Route path="visitors" element={<Visitors/>}/>
                        <Route path="vehicle" element={<Vehicle/>}/>
                        <Route path="register-complaint" element={<RegisterComplaint/>}/>
                        <Route path="amenities" element={<Amenities/>}/>
                        <Route path="change-password" element={<UserChangePassword/>}/>
                        <Route path="view-complaints" element={<ViewComplaints/>}/>

                    </Route>
                    {/*Gaurd*/}
                    <Route path="/gaurd" element={<GaurdLayout/>}>
                        <Route path="home" element={<GaurdDashboard/>}/>

                        <Route path="profile" element={<Profile/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                        <Route path="manage-visitors" element={<ManageVisitors/>}/>
                        <Route path="manage-vehicles" element={<ManageVehicles/>}/>
                        <Route path="change-password" element={<GaursChangePassword/>}/>
                    </Route>
                </Routes>
            </NameContext.Provider>
        </BrowserRouter>
    )
}

export default App;