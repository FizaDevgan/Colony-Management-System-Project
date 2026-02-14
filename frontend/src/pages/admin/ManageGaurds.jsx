import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {FaCheck, FaTrashAlt} from "react-icons/fa";


let ManageGaurds = () => {
    let [gaurds, setGaurds] = useState([])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
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
    useEffect(() => {
        fetchGaurds().then()
    }, [])
    let submitForm = async (data) => {
        console.log(data);
        let length = 8
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let pass = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            pass += chars[randomIndex];
        }
        data.password = pass
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let url = `${server_url}/admin/signupgaurd`;
        let res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        if (res.error) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
            reset()
            await fetchGaurds()
        }
    }
    let delGaurd = async (id) => {
        console.log("In del Gaurd==")
        if (confirm("Are you sure?")) {
            const token = getCookie('adminToken');
            console.log("token:", token);
            let status='Blocked';
            let data={
                status:status
            }
            let url = `${server_url}/admin/changestatus/${id}`;
            let res = await axios.put(url,data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log(res)
            if(res.error) {
                toast.error(res.message);
            }
            else{
               await fetchGaurds()
            }
        }
    }
    let appGaurd = async (id) => {
        console.log("In del Gaurd==")
        if (confirm("Are you sure?")) {
            const token = getCookie('adminToken');
            console.log("token:", token);
            let status='Approved';
            let data={
                status:status
            }
            let url = `${server_url}/admin/changestatus2/${id}`;
            let res = await axios.put(url,data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log(res)
            if(res.error) {
                toast.error(res.message);
            }
            else{
               await fetchGaurds()
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
                                <h2>Manage Gaurds</h2>
                                <div className="space28"></div>
                                <p><a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Gaurds
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
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <div className=" form-group col-md-6 ">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter full name"
                                   {...register("name", {required: 'This field is required'})}/>
                            {errors?.name && <span className="text-danger">{errors?.name?.message}</span>}
                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-select" id="gender"
                                    name="gender" {...register("gender", {required: 'This field is required'})}>
                                <option value={""}>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors?.gender && <span className="text-danger">{errors?.gender?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="number" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="number" name="number"
                                   placeholder="Enter phone number" {...register("number", {
                                required: 'This field is required', pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numeric values are allowed',
                                }
                            })}/>
                            {errors?.number && <span className="text-danger">{errors?.number?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email"
                                   name="email" {...register("email", {required: 'This field is required'})}
                                   placeholder="Enter email"/>
                            {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="adharcard" className="form-label">Aadhar Card Number</label>
                            <input type="text" className="form-control" id="adharcard" name="adharcard"
                                   placeholder="Enter Aadhar card number" {...register("adharcard", {required: 'This field is required'})}/>
                            {errors?.adharcard && <span className="text-danger">{errors?.adharcard?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="gate" className="form-label">Gate Assigned</label>
                            <select className="form-select" id="gate"
                                    name="gate" {...register("gate", {required: 'This field is required'})}>
                                <option value={""}>Select Gate</option>
                                <option value="Gate 1">Gate 1</option>
                                <option value="Gate 2">Gate 2</option>
                                <option value="Gate 3">Gate 3</option>
                            </select>
                            {errors?.gate && <span className="text-danger">{errors?.gate?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="shift" className="form-label">Shift Timing</label>
                            <select className="form-select" id="shift"
                                    name="shift" {...register("shift", {required: 'This field is required'})}>
                                <option value={""}>Select Shift Timing</option>
                                <option value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</option>
                                <option value="Evening (2 PM - 10 PM)">Evening (2 PM - 10 PM)</option>
                                <option value="Night  (2 PM - 10 PM)">Night (2 PM - 10 PM)</option>
                            </select>
                            {errors?.shift && <span className="text-danger">{errors?.shift?.message}</span>}

                        </div>
                    </div>

                    <button className="vl-btn1 mb-3">Register</button>
                </form>
                <div className="space30"></div>
                <table className={"table table-striped"}>
                    <thead>
                    <tr className={"text-center"}>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Aadhar Card No.</th>
                        <th>Gate No.</th>
                        <th>Shift</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {
                        gaurds && gaurds.length > 0 && gaurds.map((gad, index) => {
                            return (
                                <tr key={index} className="text-center">
                                    <td>{index+1}</td>
                                    <td>{gad.name}</td>
                                    <td>{gad.gender}</td>
                                    <td>{gad.number}</td>
                                    <td>{gad.email}</td>
                                    <td>{gad.adharcard}</td>
                                    <td>{gad.gate}</td>
                                    <td>{gad.shift}</td>
                                    <td>{gad.status}</td>
                                    <td>{gad.createdAt.split("T")[0]}</td>
                                    <td>{gad.status ==="Approved" ?<button onClick={()=>delGaurd(gad.id)} type={"button"} className={"btn btn-danger"}>
                                        <FaTrashAlt/>
                                    </button> :
                                        <button onClick={()=>appGaurd(gad.id)} type={"button"} className={"btn btn-success"}>
                                            <FaCheck/>
                                        </button>
                                    }

                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}
export default ManageGaurds