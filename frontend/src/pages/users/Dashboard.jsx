import {Link} from "react-router-dom";

function Dashboard() {
    return (
        <>
            <div className="space30"></div>
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <div className="space28"></div>
                                <h2>User Dashboard</h2>

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="inner-images">
                                <img src="../assets/img/all-images/hero/hero-img9.png" alt="housa"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space30"></div>
            (
            <div className="dashboard-message">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Show Dashboard</h3>
                            <div className="space40"/>
                            <div className="dashboard-info-sider-deatils">
                                <div className="dashboard-info-sider">

                                    {/* Message 1 */}
                                    <div className="message-boxarea">
                                        <div className="img1">
                                            <img src="../assets/img/all-images/others/others-img1.png" alt="housa"/>
                                        </div>
                                        <div className="conatent-area">
                                            <div className="content">
                                                <Link to="#">Henry Nicolas</Link>
                                                <p>3 Days Ago</p>
                                            </div>
                                            <div className="space14"/>
                                            <p>
                                                We're excited to help you find the perfect neighborhood and home for
                                                your
                                                family. Let us know how.
                                            </p>
                                            <ul>
                                                {Array(5).fill().map((_, idx) => (
                                                    <li key={idx}><i className="fa-solid fa-star"/></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Message 2 */}
                                    <div className="message-boxarea">
                                        <div className="space32"/>
                                        <div className="img1">
                                            <img src="/assets/img/all-images/others/others-img2.png" alt="housa"/>
                                        </div>
                                        <div className="conatent-area">
                                            <div className="content">
                                                <Link to="#">Kane Williamson</Link>
                                                <p></p>
                                            </div>
                                            <div className="space14"/>
                                            <p>
                                                Thank you for reaching out! We’re here to guide you every step of the
                                                way in finding the ideal home.
                                            </p>
                                            <ul>
                                                {Array(5).fill().map((_, idx) => (
                                                    <li key={idx}><i className="fa-solid fa-star"/></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Message 3 */}
                                    <div className="message-boxarea">
                                        <div className="space32"/>
                                        <div className="img1">
                                            <img src="/assets/img/all-images/others/others-img3.png" alt="housa"/>
                                        </div>
                                        <div className="conatent-area">
                                            <div className="content">
                                                <Link to="#">Martin Guptill</Link>
                                                <p>2 Days Ago</p>
                                            </div>
                                            <div className="space14"/>
                                            <p>
                                                We're committed to making your house-hunting experience seamless and
                                                enjoyable.
                                            </p>
                                            <ul>
                                                {Array(5).fill().map((_, idx) => (
                                                    <li key={idx}><i className="fa-solid fa-star"/></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space30"></div>


        </>
    )
}

export default Dashboard;