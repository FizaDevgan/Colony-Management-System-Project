import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";


let Complaints = () => {
    let [comp, setComp] = useState([]);
    useEffect(() => {
        fetchComplaints().then()
    }, [])
    let fetchComplaints = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let url = `${server_url}/admin/viewcomplaints`;
        let res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("fetched")
        console.log(res)
        if (res.error) {
            toast.error(res.message)
        } else {
            setComp(res.records)
        }
    }
    let addressed = async (id) => {
        console.log(id);
        if (confirm("Are you sure?")) {
            let token = getCookie('adminToken');
            let data = {
                status :"Addressed"
            }
            let url = `${server_url}/admin/changecomplaint/${id}`;
            let res = await axios.put(url, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            if(res.error) {
                toast.error(res.message)
            }
            else{
                toast.success(res.message);
                fetchComplaints().then()
            }
        }
    }
    return (
        <>
            <div className="space20"></div>
            <div className="inner-header-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Complaints</h2>
                                <div className="space28"></div>
                                <p>
                                    <a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path
                                            d="M1.5 1.74997L7.75 7.99997L1.5 14.25"
                                            stroke="#1B1B1B"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Complaints
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

            <div className="space36"></div>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Suggestion</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comp && comp.length > 0 ? (
                        comp.map((compItem) => (
                            <tr key={compItem.id}>
                                <td>{compItem.email}</td>
                                <td>{compItem.type}</td>
                                <td>{compItem.description}</td>
                                <td>{compItem.date.split('T')[0]}</td>
                                <td>{compItem.suggestion}</td>
                                <td>{compItem.status}</td>
                                <td>{compItem.createdAt.split("T")[0]} {(compItem.createdAt.split("T")[1]).substr(0,8)}</td>
                                <td>
                                    {compItem.status==="Addressed" ? <span>{compItem.status}</span>: <>
                                        <button type="button" className="btn btn-success  border-white mt-2"
                                                onClick={()=>addressed(compItem.id)}>Address Issue
                                        </button>
                                    </>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default Complaints;