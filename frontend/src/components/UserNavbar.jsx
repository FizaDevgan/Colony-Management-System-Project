import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Amenities from "../pages/users/Amenities.jsx";

function UserNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        if (confirm("Are you sure you want to logout?")) {
            event.preventDefault();
            document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
            navigate('/user-login');
        }
    }

    return (
        <>

            <header className="homepage1-body">
                <div id="vl-header-sticky" className="vl-header-area vl-transparent-header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-6 col-6">
                                <div className="vl-logo">
                                    <a href="/user/home"><img src="/assets/img/logo/logo1.png" alt="housa"/></a>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="vl-main-menu text-end menu2">
                                    <nav className="vl-mobile-menu-active">
                                        <ul>
                                            <li><a href="/user/home">Home </a></li>
                                            <li className="nav-item"><a className="nav-link" href="/user/book-helper">Book
                                                Helper </a></li>
                                            {/*<li className="nav-item"><a className="nav-link" href="/user/view-bookings">View
                                                Bookings </a></li>*/}


                                            <li className="has-dropdown">
                                                <a href="#">Register <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></a>
                                                <ul className="sub-menu">
                                                    <li><a href="/user/visitors">Visitor(s)</a></li>
                                                    <li><a href="/user/vehicle">Vehicle</a></li>
                                                    <li><a href="/user/register-complaint">Complaint</a></li>

                                                </ul>
                                            </li>
                                            <li><a href="/user/view-complaints">View Complaints </a></li>

                                            <li><Link to="/user/amenities">Amenities</Link></li>
                                            <li className="has-dropdown">
                                                <Link to="#">Settings <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="/user/change-password">Change Password</Link></li>
                                                    <li><Link to="javascript:void(0)"
                                                              onClick={handleLogout}>Logout</Link></li>

                                                </ul>
                                            </li>

                                        </ul>
                                    </nav>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default UserNavbar;