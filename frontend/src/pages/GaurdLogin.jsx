import {useForm} from "react-hook-form";
import axios from "axios";
import {server_url} from "../utils/script.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function GaurdLogin() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const url = `${server_url}/logingaurd`;
            let response = await axios.post(url, data);
            // console.log(response.data)

            const {error, message, token} = response.data;

            if (error) {
                toast.error(message);
            } else {
                reset();
                toast.success(message);

                let duration = 86400; // 86400 seconds = 1 day
                document.cookie = `gaurdToken=${token}; path=/; max-age=${duration}`;

                setTimeout(() => {
                    navigate('/gaurd/home')
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
                                <h2>Gaurd SignIn</h2>
                                <div className="space28"></div>

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="inner-images">
                                <img src="assets/img/all-images/hero/hero-img9.png" alt="housa"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space30"></div>
            <div className="container">
                {/*<h2>User Sign-in</h2>*/}
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="">Email</label>
                                <input type="email" {...register('email', {required: 'This field is required.'})}
                                       className="form-control"/>
                                {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="">Password</label>
                                <input type="password" {...register('password', {required: 'This field is required.'})}
                                       className="form-control"/>
                                {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
                            </div>
                            <div className={"text-center"}>
                                <button className="vl-btn1 w-50">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default GaurdLogin;