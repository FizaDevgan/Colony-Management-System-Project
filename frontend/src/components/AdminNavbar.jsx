import {Link, useNavigate} from "react-router-dom";

function PublicNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        if (confirm("Are you sure you want to logout?")) {
            event.preventDefault();
            document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
            navigate('/admin-login');
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
                                    <Link to="/admin/home"><img src="/assets/img/logo/logo1.png" alt="housa"/></Link>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="vl-main-menu text-end menu2">
                                    <nav className="vl-mobile-menu-active">
                                        <ul>
                                            <li><Link to="/admin/home">Home </Link></li>
                                            <li><Link to="/admin/manage-admin">Manage Admin</Link></li>
                                            <li><Link to="/admin/manage-flats">Add Flat</Link>
                                            </li>


                                            <li className="has-dropdown">
                                                <Link to="#">Manage <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">

                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/manage-gaurds">Manage
                                                        Gaurd</Link></li>
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/manage-helpers">Manage
                                                        Helper/Service Provider</Link></li>

                                                </ul>
                                            </li>

                                            <li className="has-dropdown">
                                                <Link to="#">View <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/manage-users">View
                                                        Users</Link></li>
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/view-complaints">Complaints</Link>
                                                    </li>
                                                    {/*<li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/managegaurd">Manage
                                                        Gaurd</Link></li>
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/managehelper">Manage
                                                        Helper/Service Provider</Link></li>*/}


                                                </ul>
                                            </li>
                                            <li className="has-dropdown">
                                                <Link to="#">Settings <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">

                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="/admin/change-password">Change
                                                        Password</Link></li>
                                                    <li className="nav-item"><Link className="nav-link"
                                                                                   to="javascript:void(0)" onClick={handleLogout}>Logout</Link></li>
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

export default PublicNavbar;