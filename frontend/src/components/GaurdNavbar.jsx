import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Amenities from "../pages/users/Amenities.jsx";

function UserNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        if (confirm("Are you sure you want to logout?")) {
            event.preventDefault();
            document.cookie = "gaurdToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
            navigate('/gaurd-login');
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
                                    <Link to="/gaurd/home"><img src="/assets/img/logo/logo1.png" alt="housa"/></Link>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="vl-main-menu text-end menu2">
                                    <nav className="vl-mobile-menu-active">
                                        <ul>
                                            <li><Link to="/gaurd/home">Home</Link></li>
                                            <li className="has-dropdown">
                                                <Link to="javascript:void(0);">Manage <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                to="/gaurd/manage-visitors">Manage Visitors</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to="/gaurd/manage-vehicles">Manage
                                                        Vehicles</Link></li>

                                                </ul>
                                            </li>

                                            <li className="has-dropdown">
                                                <Link to="javascript:void(0);">Settings <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">
                                                    {/*<li><Link to="/gaurd/change-password">Change Password</Link></li>*/}
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