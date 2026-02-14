// import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";


let ManageAdmins = () => {
    let [admins, setAdmins] = useState([]);
    useEffect(() => {
        fetchAdmins()
    }, []);
    let fetchAdmins = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);
        let url = `${server_url}/admin/viewadmin`;
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
            setAdmins(res.records)
        }
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    let submitForm = async (data) => {
        console.log(data);
        const token = getCookie('adminToken');
        // console.log("token:", token);

        let url = `${server_url}/admin/addadmin`;
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
                                <h2>Manage Admins</h2>
                                <div className="space28"></div>
                                <p><a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Admins
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
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <div className={"col-lg-6 mb-3"}>
                            <div className=" form-group col-md-12 ">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter full name"
                                       {...register("name", {required: 'This field is required'})}/>
                                {errors?.name && <span className="text-danger">{errors?.name?.message}</span>}

                            </div>
                        </div>
                        <div className={"col-lg-6 mb-3"}>
                            <div className="form-group col-md-12 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="Enter email"
                                       {...register("email", {required: 'This field is required'})}/>
                                {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
                            </div>
                        </div>
                        <div className={"col-lg-6 mb-3"}>
                            <div className="form-group col-md-12 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       placeholder="Enter Password"
                                       {...register('password', {required: 'This field is required'})}
                                />
                                {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
                            </div>
                        </div>
                        <div className={"col-lg-6 mb-3"}>
                            <div className="form-group">
                                <label htmlFor="type" className="form-label">Type</label>
                                <select className="form-select" id="type"
                                        name="type" {...register("type", {required: 'This field is required'})}>
                                    <option value={""}>Select Type</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors?.type && <span className="text-danger">{errors?.type?.message}</span>}
                            </div>
                        </div>
                        <div className="col-lg-6 ">
                            <button className="vl-btn1 mt-3">Submit
                            </button>
                        </div>
                    </div>

                </form>
                <div className="space20"></div>
                <h2 className={"text-center"}>View Admins</h2>
                <table className="table table-striped">
                    <thead>
                    <tr className="text-center">
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Type</th>
                        <th>Created On</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        admins && admins.length > 0 && admins.map((admin,index) => (
                            <tr className={"text-center"} key={index}>
                                <td>{index+1}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.type}</td>
                                <td>{admin.createdAt.split("T")[0]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ManageAdmins;