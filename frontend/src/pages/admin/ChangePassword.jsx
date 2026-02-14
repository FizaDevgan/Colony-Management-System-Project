import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";


let ChangePassword = ()=>{
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    let submitForm = async (data) => {
        console.log(data)

        const token = getCookie('adminToken');
        // console.log("token:", token);

        let url = `${server_url}/admin/update`;
        let res = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log(res)
        if(res.error){
            toast.error(res.message)
        }
        else{
            toast.success(res.message);
            reset()
        }
    }
    return(
        <>
            <div className="space20"></div>
            <div className="inner-header-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Change Password</h2>
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
                                    Change Password
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

                        <div className="form-group mb-3">
                            <label htmlFor="current">Current Password</label>
                            <input type="password" name="current" className="form-control" id="current"
                                   placeholder="enter current password" {...register("password",{required:'this field is required'})} />
                            {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="new">Current Password</label>
                            <input type="password" name="new" className="form-control" id="new"
                                   placeholder="enter current password" {...register("npassword",{required:'this field is required'})} />
                            {errors?.npassword && <span className="text-danger">{errors?.npassword?.message}</span>}
                        </div>
                        <div className="form-group">
                            <button className="vl-btn1">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ChangePassword;