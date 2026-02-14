import axios from "axios";
import {useForm} from "react-hook-form";
import {server_url, getCookie} from "../../utils/script.jsx";
import {toast} from "react-toastify";

function ChangePassword() {

    const {
        register,
        handleSubmit,
        reset, formState: {errors}
    } = useForm();

    async function onSubmit(data) {
        const token = getCookie('userToken');

        const url = `${server_url}/user/update`;
        let response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const {error, message,} = response.data;
        if (error) {
            toast.error(message);
        } else {
            reset();
            toast.success(message);
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
                                <h2>Change Password</h2>
                                <div className="space28"></div>
                                <p><a href="/user/home">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B"/>
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
            <div className="space30"></div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {/*<h1>Change Password</h1>*/}
                        <hr/>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label>Current Password</label>
                                <input type="password" {...register('password', {required: 'This field is required'})}
                                       className="form-control"/>
                            </div>
                            {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}


                            <div className="mb-3">
                                <label>New Password</label>
                                <input type="password" {...register('npassword', {required: 'This field is required'})}
                                       className="form-control"/>
                                {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}

                            </div>


                            <button className="vl-btn1">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;