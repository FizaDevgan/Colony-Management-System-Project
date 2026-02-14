import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {FaCheck, FaTrashAlt} from "react-icons/fa";


let ManageHelpers = () => {
    let [helpers, setHelpers] = useState([])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    useEffect(() => {
        fetchHelpers().then()
    }, [])
    let submitForm = async (data) => {
        console.log(data);
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let length = 8
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let pass = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            pass += chars[randomIndex];
        }
        data.password = pass;
        let url = `${server_url}/admin/signuphelper`;
        let res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("Booking Response----");
        console.log(res)
        if (res.error) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
            reset()
            await fetchHelpers();
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
    let delUser = async (id) => {
        if(confirm('Are you sure?')) {

            const token = getCookie('adminToken');
            // console.log("token:", token);

            let data = {
                status: "Blocked"
            }
            let url = `${server_url}/admin/changehelperstatus/` + id;
            let res = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log("update status----");
            console.log(res)
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
                reset()
                await fetchHelpers();
            }
        }
    }
    let appUser = async (id) => {
        if(confirm('Are you sure?')) {

            const token = getCookie('adminToken');
            // console.log("token:", token);

            let data = {
                status: "Approved"
            }
            let url = `${server_url}/admin/changehelperstatus/` + id;
            let res = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log("update status----");
            console.log(res)
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
                reset()
                await fetchHelpers();
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
                                <h2>Manage Helpers</h2>
                                <div className="space28"></div>
                                <p><a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Helpers
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
                                <option selected disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors?.gender && <span className="text-danger">{errors?.gender?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="number" className="form-label">Phone Number</label>
                            <input type="number" className="form-control" id="number"
                                   name="number" {...register("number", {required: 'This field is required'})}
                                   placeholder="Enter phone number"/>
                            {errors?.number && <span className="text-danger">{errors?.number?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email"
                                   placeholder="Enter email" {...register("email", {required: 'This field is required'})}/>
                            {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="adharcard" className="form-label">Aadhar Card Number</label>
                            <input type="text" className="form-control" id="adharcard" name="adharcard"
                                   placeholder="Enter Aadhar card number" {...register("adharcard", {required: 'This field is required'})}/>
                            {errors?.adharcard && <span className="text-danger">{errors?.adharcard?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="servicetype" className="form-label">Service Type</label>
                            <select className="form-select" id="servicetype"
                                    name="servicetype" {...register("servicetype", {required: 'This field is required'})}>
                                <option selected disabled>Select service</option>
                                <option value="Electrican">Electrican</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Housekeeping">Housekeeping</option>
                                <option value="Cook">Cook</option>
                                <option value="Driver">Driver</option>
                            </select>
                            {errors?.servicetype && <span className="text-danger">{errors?.servicetype?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="availability" className="form-label">Availability</label>
                            <select className="form-select" id="availability"
                                    name="availability" {...register("availability", {required: 'This field is required'})}>
                                <option selected disabled>Select availability</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                            </select>
                            {errors?.availability &&
                                <span className="text-danger">{errors?.availability?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="medical" className="form-label">Medical Fitness</label>
                            <select className="form-select" id="medical"
                                    name="medical" {...register("medical", {required: 'This field is required'})}>
                                <option selected disabled>Select medical</option>
                                <option value="Checked">Checked</option>
                                <option value="Unchecked">Unchecked</option>
                            </select>
                            {errors?.medical && <span className="text-danger">{errors?.medical?.message}</span>}

                        </div>

                    </div>

                    <button className="vl-btn1 mb-3">Register</button>
                </form>
                <div className="space40"></div>
                <table className={"table table-striped"}>
                    <thead className="thead">
                    <tr className={"text-center"}>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Gender</th>
                        <th>Email Id</th>
                        <th>Aadhar card No.</th>
                        <th>Service Type</th>
                        <th>Availability</th>
                        <th>Medical</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        helpers && helpers.length > 0 && helpers.map((helper, index) => (
                            <tr key={helper.id} className={"text-center"}>
                                <td>{index + 1}</td>
                                <td>{helper.name}</td>
                                <td>{helper.number}</td>
                                <td>{helper.gender}</td>
                                <td>{helper.email}</td>
                                <td>{helper.adharcard}</td>
                                <td>{helper.servicetype}</td>
                                <td>{helper.availability}</td>
                                <td>{helper.medical}</td>
                                <td>{helper.status}</td>
                                <td>{helper.status==="Approved" ? <button onClick={() => delUser(helper.id)} type={"button"} className={"btn btn-danger"}>
                                    <FaTrashAlt/></button> :
                                    <button onClick={() => appUser(helper.id)} type={"button"} className={"btn btn-success"}>
                                    <FaCheck/></button>}

                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ManageHelpers;