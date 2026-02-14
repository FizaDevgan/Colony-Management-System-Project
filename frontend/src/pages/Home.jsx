import axios from "axios";
import {useEffect, useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import {server_url} from "../utils/script.jsx";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100 bannerImg"
                        src="assets/img/all-images/hero/hero-img2.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className="text-white">Find Your Dream Home
                            with Housa</h3>
                        {/*<h5 className="text-white">We Make An  Excellent Food</h5>*/}
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>

            <div className="about2 sp1">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Column */}
                        <div className="col-lg-4">
                            <div className="heading1">
                                <h5>About Company</h5>
                                <div className="space16"></div>
                                <h2 className="text-anime-style-3">
                                    Building Dreams,<br/>
                                    One Home a Time
                                </h2>
                                <div className="space50"></div>
                                <div className="img1 ">
                                    <img
                                        src="assets/img/all-images/about/about-img3.png"
                                        alt="housa"/>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column */}
                        <div className="col-lg-4">
                            <div className="space30 d-lg-none d-block"></div>
                            <div className="img2 ">
                                <img
                                    src="assets/img/all-images/about/about-img4.png"
                                    alt="housa"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-4">
                            <div className="heading1">
                                <div
                                    className="arrow-btnarea"
                                    data-aos="fade-left"
                                    data-aos-duration="900">
                                    <Link to="/about-us">
                                        <div className="content keyframe5">
                                            <h6 className="circle rotateme">

                                            </h6>
                                        </div>
                                        <img
                                            src="assets/img/icons/arrow1.svg"
                                            alt="housa"
                                            className="arrow1"
                                        />
                                    </Link>
                                </div>

                                <div className="space30"></div>
                                <p >
                                    We are passionate about simplifying the real estate experience.
                                    With a deep understanding of the housing market and a
                                    client-first approach, we strive to help buyers, sellers, and
                                    renters achieve their property goals. Our team of experienced
                                    professionals is dedicated to providing personalized service,
                                    transparency, and expert advice.
                                </p>

                                <div className="space32"></div>
                                <div className="btn-area1" >
                                    <Link to="/" className="vl-btn1">
                                        Add Listing{" "}
                                        <span className="arrow1">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                                        <span className="arrow2">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;