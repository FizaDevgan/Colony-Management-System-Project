import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {FaCalculator, FaCaretRight, FaCheckCircle} from "react-icons/fa";

function Dashboard() {
    let [gaurds, setGaurds] = useState([])
    let [helpers, setHelpers] = useState([])
    let [users, setUsers] = useState([])

    useEffect(()=>{
        fetchGaurds().then()
        fetchHelpers().then()
        fetchUsers().then()
    },[])
    let fetchGaurds = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let url = `${server_url}/admin/viewgaurddata`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log(res)
        if (res.error) {
            toast.error(res.message)
        } else {
            // toast.success(res.message)
            setGaurds(res.records)
        }
    }
    let fetchHelpers = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);

        let url = `${server_url}/admin/viewhelperdata`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("Response----");
        console.log(res)
        if (res.error) {
            toast.error(res.message);
        } else {
            // toast.success(res.message);
            setHelpers(res.records)
        }
    }
    let fetchUsers = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let url = `${server_url}/admin/viewuserdata`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log(res)
        if (res.error) {
            toast.error(res.message)
        } else {
            // toast.success(res.message)
            setUsers(res.records)
        }
    }

    return (
        <>
            <div className="space30"></div>
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Admin Dashboard</h2>
                                <div className="space28"></div>
                                <p><Link to="/admin/home">Dashboard</Link>
                                </p>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="inner-images">
                                <img src="/assets/img/all-images/hero/hero-img9.png" alt="housa"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space30"></div>
            <div className="container">
                <div className="mt-5"
                     style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", margin: "auto", width: "90%"}}>
                    {/*<div
                        style={{flex: "1", minWidth: "400px", padding: "20px", background: "white", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"}}>
                        <h2 style={{color: "#001F3F", marginBottom: "20px"}}>Residents & Security Guards</h2>
                        <canvas id="barChart"></canvas>
                    </div>

                    <div
                        style={{flex: "1", minWidth: "400px", padding: "20px", background: "white", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"}}>
                        <h2 style={{color: "#001F3F", marginBottom: "20px"}}>Monthly Registrations</h2>
                        <canvas id="lineChart"></canvas>
                    </div>*/}

                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className={"text-center"}>User Accounts</h3>
                            </div>
                            <div className="card-body text-center">
                                <h4><FaCheckCircle/> {users.length}</h4>

                            </div>
                            <div className="card-footer text-end">
                                <Link to={"/admin/manage-users"} className={"fw-bold btn-link"}>View Users</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className={"text-center"}>Security Guards</h3>
                            </div>
                            <div className="card-body text-center">
                                <h4><FaCheckCircle/> {gaurds.length}</h4>
                            </div>
                            <div className="card-footer text-end">
                                <Link to={"/admin/manage-helpers"} className={"fw-bold btn-link"}>View Gaurds</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className={"text-center"}>Helpers</h3>
                            </div>
                            <div className="card-body text-center">
                                <h4><FaCheckCircle/> {helpers.length}</h4>

                            </div>
                            <div className="card-footer text-end">
                                <Link to={"/admin/manage-helpers"} className={"fw-bold btn-link"}>View Helpers</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;