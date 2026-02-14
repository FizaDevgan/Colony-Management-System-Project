import {useForm} from "react-hook-form";
import axios from "axios";
import {getCookie, server_url} from "../../utils/script.jsx";
import {toast} from "react-toastify";

let Visitors = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    let submitForm = async (data) => {
        console.log(data)
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/regsvisitor`;
        let res = await axios.post(url, data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
        if(res.data.error){
            toast.error(res.data.message)
        }
        else{
            toast.success(res.data.message)
            reset()

        }
    }
    let today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="space30"></div>
            <div className="inner-header-area">
                <div className="containe-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Visitors</h2>
                                <div className="space28"></div>
                                <p><a href="/user/userdash">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B"/>
                                    </svg>
                                    Register a visitor
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

                {/*<form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="name">Visitor's Full Name</label>
                            <input type="text" id="name" name="name" className="form-control" placeholder="name"
                                   {...register('name',{required:'This field is required.'})}/>
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="mobile">Visitor's Mobile</label>
                            <input type="text" id="mobile" name="mobile" className="form-control"
                                   placeholder="phone number"
                                   {...register('mobile',{required:'This field is required.'})}/>
                            {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
                        </div>

                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="email">Visitor's Email</label>
                            <input type="text" id="email" name="email" className="form-control"
                                   placeholder="email"
                            {...register('email',{required:'This field is required.'})}/>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="floor">Resident Floor No.</label>
                            <input type="text" id="floor" name="floor" className="form-control"
                                   placeholder="floor" />
                        </div>

                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="flat">Resident Flat No.</label>
                            <input type="text" id="flat" name="flat" className="form-control" placeholder="flat"
                                   />
                        </div>


                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="date">Visiting date</label>
                            <input type="date" id="date" name="date" className="form-control" />
                        </div>


                        <div className={"col-lg-6 mb-3"}>
                            <label htmlFor="parking">Parking Needed</label>
                            <select id="parking" name="parking" className="form-select" >
                                <option>Choose...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="col-lg-12 mt-3">
                            <button className="vl-btn1 w-25 mt-2">Register</button>

                        </div>
                    </div>

                </form>*/}
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"name"}>Visitor's Full Name:</label>
                                <input type="text" name="name" className="form-control mt-3 mb-2" id="name"
                                       {...register('name', {required: 'This date is required'})}
                                       placeholder="Name"/>
                                {errors?.name && <span className="text-danger">{errors?.name?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"mobile"}>Visitor's Mobile No.:</label>
                                <input type={"text"} name="mobile" className="form-control"
                                       id="mobile" {...register('mobile', {required: 'This field is required', pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Only numeric values are allowed',
                                    }})}
                                       placeholder="Mobile No."/>
                                {errors?.mobile &&
                                    <span className="text-danger">{errors?.mobile?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"email"}>Visitor's Email Id:</label>
                                <input type="email" name="email" className="form-control mt-3 mb-2" id="email"
                                       {...register('email', {required: 'This field is required'})}
                                       placeholder="abc@gmail.in"/>
                                {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"floor"}>Resident's Floor No.:</label>
                                <input type="text" name="floor" className="form-control mt-3 mb-2" id="floor"
                                       {...register('floor', {required: 'This field is required',pattern: {
                                               value: /^[0-9]+$/,
                                               message: 'Only numeric values are allowed',
                                           }})}
                                       />
                                {errors?.floor && <span className="text-danger">{errors?.floor?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"flat"}>Resident's Flat No.:</label>
                                <input type="text" name="flat" className="form-control mt-3 mb-2" id="flat"
                                       {...register('flat', {required: 'This field is required',pattern: {
                                               value: /^[0-9]+$/,
                                               message: 'Only numeric values are allowed',
                                           }})}
                                       />
                                {errors?.flat && <span className="text-danger">{errors?.flat?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"flat"}>Visiting Date:</label>
                                <input type="date" name="date" className="form-control mt-3 mb-2" id="date" min={today} defaultValue={today}
                                       {...register('date', {required: 'This field is required'})}
                                       />
                                {errors?.date && <span className="text-danger">{errors?.date?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"parking"}>Parking Needed:</label>
                                <select name="parking" className="form-control mt-3 mb-2" id="date"
                                       {...register('parking', {required: 'This field is required'})}>
                                    <option value={""}>Choose...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {errors?.parking && <span className="text-danger">{errors?.parking?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <button className="vl-btn1 mt-4">Confirm Your Booking</button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}
export default Visitors;