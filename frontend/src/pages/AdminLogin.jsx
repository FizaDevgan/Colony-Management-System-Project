import {useForm} from "react-hook-form";
import axios from "axios";
import {server_url} from "../utils/script.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function AdminLogin() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const url = `${server_url}/admin-login`;
            let response = await axios.post(url, data);
            console.log(response.data)

            const {error, message, token} = response.data;

            if (error) {
                toast.error(message);
            } else {
                reset();
                toast.success(message);

                let duration = 86400; // 86400 seconds = 1 day
                document.cookie = `adminToken=${token}; path=/; max-age=${duration}`;

                setTimeout(() => {
                    navigate('/admin/home')
                }, 2000);
            }
        } catch (error) {
            console.log(error.message)
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
                                <h2>Admin Sign-In</h2>
                                <div className="space28"></div>
                                <p><a href="/">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Admin Login
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
                {/*<h2>Admin Sign-in</h2>*/}
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="email" className={"form-label"}>Email</label>
                                <input type="email" id={"email"} {...register('email', {required: 'This field is required.'})}
                                       className="form-control"/>
                                {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor={"password"} className={"form-label"}>Password</label>
                                <input type="password" id={"password"} {...register('password', {required: 'This field is required.'})}
                                       className="form-control"/>
                                {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className={"form-label"}>Select Role</label>
                                <select className="form-select" id="role" {...register('type', {required: 'This field is required.'})}>
                                    <option value="">Select</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <button className="vl-btn1">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin;