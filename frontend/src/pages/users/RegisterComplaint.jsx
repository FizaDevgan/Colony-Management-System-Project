import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";

let RegisterComplaint = () => {
    let [cat,setCat]=useState([]);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    useEffect( () => {
        fetchCategory();
    },[]);
    let fetchCategory = async   () => {
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/fetchcategory`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
        res = res.data;
        console.log(res)
        setCat(res.records);
    }
    let submitForm = async (data) => {
        console.log(data)

        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/regscomplaint`;
        let res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log(res)
        if (res.error) {
            toast.error(res.message)
        } else {
            toast.success(res.message);
            reset()
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
                                <h2>Register a Complaint</h2>

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
            <div className="container">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">User Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="User Email"
                               {...register('email', {required: 'This field is required'})}/>
                        {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="type" className="form-label">Complaint Type</label>
                        <select id="type" className="form-control" name="type" {...register('type', {required: 'This field is required'})}>
                            <option value="">Select</option>
                            {
                                cat.map((item,index)=>{
                                    console.log(item)
                                    return(
                                        <option key={index} value={item.id}>{item.type}</option>
                                    )

                                })
                            }
                        </select>
                        {errors?.type && <span className="text-danger">{errors?.type?.message}</span>}

                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label><br/>
                        <textarea className="form-control" id="description" name="description" rows="5" {...register('description', {required: 'This field is required'})}
                                  placeholder="description about complaint" ></textarea>
                        {errors?.description && <span className="text-danger">{errors?.description?.message}</span>}

                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="date" className="form-label">Date of Complaint Registration</label>
                        <input type="date" className="form-control" id="date" name="date" {...register('date', {required: 'This field is required'})}/>
                        {errors?.date && <span className="text-danger">{errors?.date?.message}</span>}
                    </div>


                    <div className="form-group mb-3">
                        <label htmlFor="suggestion" className="form-label">Suggestions</label><br/>
                        <textarea className="form-control" id="suggestion" name="suggestion" rows="5"
                                  placeholder="suggestion about complaint " {...register('suggestion', {required: 'This field is required'})}></textarea>
                        {errors?.suggestion && <span className="text-danger">{errors?.suggestion?.message}</span>}

                    </div>


                    <button className="vl-btn1">Register</button>
                </form>
            </div>
        </>
    )
}
export default RegisterComplaint;