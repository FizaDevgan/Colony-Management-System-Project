import {Link} from "react-router-dom";

function PublicNavbar() {
    return (
        <>

            <header className="homepage1-body">
                <div id="vl-header-sticky" className="vl-header-area vl-transparent-header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-6 col-6">
                                <div className="vl-logo">
                                    <a href="/"><img src="/assets/img/logo/logo1.png" alt="housa"/></a>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="vl-main-menu text-end menu2">
                                    <nav className="vl-mobile-menu-active">
                                        <ul>
                                            <li><Link to="/">Home </Link></li>
                                            <li><Link to="/user-login">Book Helper </Link></li>
                                            <li><Link to="/user-login">Register Complaints</Link></li>

                                            <li className="has-dropdown">
                                                <Link to="#">User <span><i
                                                    className="fa-solid fa-angle-down d-lg-inline d-none"></i></span></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="/user-signup">Create an account</Link></li>
                                                    <li><Link to="/user-login">User Login</Link></li>

                                                </ul>
                                            </li>
                                            <li><Link to="/gaurd-login">Gaurd Login</Link></li>
                                            <li><Link to="/about-us">About Us</Link></li>
                                            <li><Link to="/contact-us">Contact Us</Link></li>


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