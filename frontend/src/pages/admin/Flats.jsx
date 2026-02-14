import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";


let Flats = () => {
    let [flats, setFlats] = useState({});
    useEffect(() => {
        fetchFlats().then()
    }, [])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    let submitForm = async (data) => {
        console.log(data);
        console.log(data);
        const token = getCookie('adminToken');
        // console.log("token:", token);

        let url = `${server_url}/admin/addflat`;
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

            await fetchFlats()
        }
    }
    let fetchFlats = async () => {
        const token = getCookie('adminToken');
        // console.log("token:", token);

        let url = `${server_url}/admin/viewflat`;
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
            setFlats(res.records)
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
                                <h2>Manage Flats</h2>
                                <div className="space28"></div>
                                <p><a href="/admin/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Flats
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
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row ">
                        <div className=" form-group col-md-6 ">
                            <label htmlFor="bname" className="form-label">Building Name</label>
                            <input type="text" className="form-control" id="bname" placeholder="Enter Building name"
                                   {...register("bname", {required: 'This field is required.'})}/>
                            {errors?.bname && <span className="text-danger">{errors?.bname?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="ftype" className="form-label">Flat Type</label>
                            <select className="form-select" id="ftype"
                                    name="ftype" {...register("ftype", {required: 'This field is required.'})}>
                                <option value={""}>Select type</option>
                                <option value="1 bhk">1 bhk</option>
                                <option value="2 bhk">2 bhk</option>
                                <option value="3 bhk">3 bhk</option>
                            </select>
                            {errors?.ftype && <span className="text-danger">{errors?.ftype?.message}</span>}
                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="floor" className="form-label">Floor Number</label>
                            <input type="text" className="form-control" id="floor" name="floor"
                                   placeholder="Enter floor number"  {...register("floor", {
                                required: 'This field is required.', pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numeric values are allowed',
                                }
                            })}/>
                            {errors?.floor && <span className="text-danger">{errors?.floor?.message}</span>}

                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="flat" className="form-label">Flat Number</label>
                            <input type="text" className="form-control" id="flat" name="flat"  {...register("flat", {
                                required: 'This field is required.', pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numeric values are allowed',
                                }
                            })}
                                   placeholder="Enter flat number"/>
                            {errors?.flat && <span className="text-danger">{errors?.flat?.message}</span>}
                        </div>

                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="sdeposite" className="form-label">Security Deposit</label>
                            <input type="text" className="form-control" id="sdeposite"
                                   name="sdeposite" {...register("sdeposite", {
                                required: 'This field is required.', pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numeric values are allowed',
                                }
                            })}
                                   placeholder="Enter Security Deposite"/>
                            {errors?.sdeposite && <span className="text-danger">{errors?.sdeposite?.message}</span>}
                        </div>


                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="rent" className="form-label">Monthly Rent</label>
                            <input type="text" className="form-control" id="rent" name="rent"
                                   {...register("rent", {
                                       required: 'This field is required.', pattern: {
                                           value: /^[0-9]+$/,
                                           message: 'Only numeric values are allowed',
                                       },
                                   })}
                                   placeholder="Enter monthly rent"/>
                            {errors?.rent && <span className="text-danger">{errors?.rent?.message}</span>}
                        </div>


                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="furnished" className="form-label">Furnished Status</label>
                            <select className="form-select" id="furnished"
                                    name="furnished" {...register("furnished", {required: 'This field is required.'})}>
                                <option value={""}>Select type</option>
                                <option value="Fully Furnished">Fully Furnished</option>
                                <option value="Semi Furnished">Semi Furnished</option>
                            </select>
                            {errors?.furnished && <span className="text-danger">{errors?.furnished?.message}</span>}

                        </div>
                        <div className="col-md-6">
                            <button className="vl-btn1 mt-3">Add</button>
                        </div>

                    </div>

                </form>
                <div className="space30"></div>
                <table className={"table table-striped"}>
                    <thead>
                    <tr className={"text-center"}>
                        <th>Sr. No.</th>
                        <th>Building Name</th>
                        <th>Flat Type</th>
                        <th>Floor No.</th>
                        <th>Flat No.</th>
                        <th>Security Deposit</th>
                        <th>Monthly Rent</th>
                        <th>Furnished Type</th>
                    </tr>
                    </thead>
                    {
                        flats && flats.length > 0 && flats.map((flats, index) => (
                            <tr className={"text-center"} key={index}>
                                <td>{index + 1}</td>
                                <td>{flats.bname}</td>
                                <td>{flats.ftype}</td>
                                <td>{flats.floor}</td>
                                <td>{flats.flat}</td>
                                <td>&#x20b9; {flats.sdeposite}</td>
                                <td>&#x20b9; {flats.rent}</td>
                                <td>{flats.furnished}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    )
}
export default Flats