import {Link} from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="footer-cta-bg-area">

                <div className="vl-footer1-section-area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-time-area">
                                    <img src="/assets/img/logo/logo1.png" alt="housa"/>
                                    <div className="space24"></div>
                                    <p>We are committed to making your real estate journey seamless and stress-free.
                                        Whether you’re buying, selling, or renting every step the way.</p>
                                    <div className="space32"></div>
                                    <ul>
                                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-6">
                                <div className="space30 d-md-none d-block"></div>
                                <div className="footer-widget-area foot-padding1">
                                    <h3>Quick Links</h3>
                                    <ul>
                                        <li><Link to="">Home</Link></li>
                                        <li><Link to="">About Us</Link></li>
                                        <li><Link to="">Services</Link></li>
                                        <li><Link to="">Properties</Link></li>
                                        <li><Link to="">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-4">
                                <div className="space30 d-lg-none d-block"></div>
                                <div className="footer-widget-area foot-padding2">
                                    <h3>Near Place</h3>
                                    <ul>
                                        <li><Link to="#">Barcelona </Link></li>
                                        <li><Link to="#">Valencia</Link></li>
                                        <li><Link to="#">Los Angeles</Link></li>
                                        <li><Link to="#">New York</Link></li>
                                        <li><Link to="#">Marbella</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg col-md-4">
                                <div className="space30 d-lg-none d-block"></div>
                                <div className="footer-widget-area">
                                    <h3>Contact Us</h3>

                                </div>
                            </div>
                            <div className="col-lg col-md-4">
                                <div className="space30 d-lg-none d-block"></div>
                                <div className="footer-widget-area">
                                    <h3>We Are Here</h3>
                                    <div className="space28"></div>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd"
                                        width="600" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="space24"></div>
                        <div className="col-lg-12">
                            <div className="copyright-area">
                                <p>© 2025 Housa, Inc. All Rights Reserved.</p>
                                <ul>
                                    <li><Link to="privacy-policy.html">Privacy Policy</Link><span> | </span></li>
                                    <li><Link to="privacy-policy.html">Terms Of Condition</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer;