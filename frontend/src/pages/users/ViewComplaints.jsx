import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";

let ViewComplaints = ()=>{
    let [comp,setComp]=useState([]);
    useEffect(()=>{
        fetchComplaints().then()
    })
    let fetchComplaints = async () => {
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/fetchcomplaint`;
        let res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(res.data)
        res = res.data
        console.log(res)
        setComp(res.records)
    }
    return(
        <>
            <div className="space30"></div>
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Complaints</h2>
                                <div className="space28"></div>
                                <p><a href="/user/userdash">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B"/>
                                    </svg>
                                    My Complaints
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
                <table className={"table table-striped"}>
                    <thead>
                    <tr className={"text-center"}>
                        <th>Sr. No.</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Suggestion</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        comp.length > 0 ?
                            comp.map((item,index) => (
                                <tr key={item.id} className={"text-center"}>
                                    <td>{index+1}</td>
                                    <td>{item.date.split('T')[0]}</td>
                                    <td>{item.type}</td>
                                    <td>{item.description}</td>
                                    <td>{item.suggestion}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )):
                            <tr>
                                <th className={"text-center"} colSpan={"8"}>No data found</th>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ViewComplaints;