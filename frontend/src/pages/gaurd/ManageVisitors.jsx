import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {FaCheck, FaCheckCircle} from "react-icons/fa";


let ManageVisitors = () => {
    let [visitors, setVisitors] = useState([])

    useEffect(() => {
        fetchVisitors().then()
    }, [])
    let fetchVisitors = async () => {
        const token = getCookie('gaurdToken');
        // console.log("token:", token);

        let url = `${server_url}/visitordata`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("fetched Data----");
        console.log(res)
        if (res.error) {
            toast.error(res.message)
        } else {
            setVisitors(res.records)
        }
    }
    let markVisited = async (id) => {
        if (confirm('Are you sure ?')) {
            const token = getCookie('gaurdToken');
            // console.log("token:", token);
            var status = 'Visited';
            let data = {
                status:status
            }
            let url = `${server_url}/changestatus/` + id;
            let res = await axios.put(url, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log("fetched Data----");
            console.log(res)
            if(res.message === 'record updated') {
                fetchVisitors().then()
            }

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
                                <div className="space28"></div>
                                <h2>Manage Visitors</h2>

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
            <div className="container table-responsive-lg">
                <table className="table table-striped table-hover  border table-bordered border-2">
                    <thead>
                    <tr>

                        <th>Resident Name</th>
                        <th>Visitor Name</th>
                        <th>Visitor Email</th>
                        <th> Visitor Phone</th>
                        <th>Floor Number</th>
                        <th>Flat Number</th>
                        <th>Date Of Visiting</th>
                        <th>Parking</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        visitors.length > 0 ? (
                            visitors.map((visitor, index) => {
                                return (
                                    <tr key={index} className="text-center">
                                        <td>{visitor.user.name}</td>
                                        <td>{visitor.name}</td>
                                        <td>{visitor.email}</td>
                                        <td>{visitor.mobile}</td>
                                        <td>{visitor.floor}</td>
                                        <td>{visitor.flat}</td>
                                        <td>{visitor.date.split("T")[0]}</td>
                                        <td>{visitor.parking}</td>
                                        <td>{visitor.status}</td>
                                        <td>{visitor.status ==="notvisited" &&
                                            <button type="button" className="btn btn-success border-white "
                                                    onClick={()=>markVisited(visitor.id)}>Visited
                                            </button>
                                         }</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <th colSpan="10">No data found</th>
                            </tr>
                        )
                    }

                    </tbody>
                </table>

            </div>
        </>
    )
}
export default ManageVisitors;