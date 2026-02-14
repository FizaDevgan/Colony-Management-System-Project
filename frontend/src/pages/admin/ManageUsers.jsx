import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";

import {BsFillTrash3Fill} from "react-icons/bs";

let ManageUsers = () => {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers().then()
    }, [])
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
    let delUser = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            const token = getCookie('adminToken');
            // console.log("token:", token);
            let url = `${server_url}/admin/remove/` + id;
            let res = await axios(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log("deleted")
            console.log(res)
            if(res.error) {
                toast.error(res.message)
            }
            else{
                toast.success(res.message)
                await fetchUsers()
            }
        }
    }
    return (
        <>
            <div className="space20"></div>
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Manage Users</h2>
                                <div className="space28"></div>
                                <p><a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Users
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
            <div className="container mt-3 mb-3">
                <table className={"table"}>
                    <thead>
                    <tr className="text-center">
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Photo</th>
                        <th>Floor</th>
                        <th>Flat</th>
                        <th>Total Members</th>
                        <th>Date of Joining</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {
                        users && users.length > 0 && users.map((user, index) => (
                            <tr className={"text-center"} key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td><img src={server_url + user.photo} style={{height: "80px", width: "80px"}} alt={""}/>
                                </td>
                                <td>{user.floor}</td>
                                <td>{user.flat}</td>
                                <td>{user.members}</td>
                                <td>{user.createdAt.split('T')[0]}</td>
                                <td>
                                    <button type={"button"} className={"btn btn-danger"} onClick={() => delUser(user.id)}>
                                        <BsFillTrash3Fill/>
                                    </button>
                                </td>

                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    )
}
export default ManageUsers;