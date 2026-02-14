import {useForm} from "react-hook-form";
import axios from "axios";
import {server_url} from "../utils/script.jsx";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

function UserSignup() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    async function onSubmit(data) {
        try {
            const url = `${server_url}/user-signup`;

            // Create FormData object
            const formData = new FormData();

            // Append all fields to FormData
            for (let key in data) {
                if (key === 'photo') {
                    formData.append('photo', data.photo[0]); // only the first selected file
                } else {
                    formData.append(key, data[key]);
                }
            }

            let response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { error, message, token } = response.data;

            if (error) {
                toast.error(message);
            } else {
                reset();
                toast.success(message);


            }
        } catch (error) {
            console.log(error.message);
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
                                <h2>User SignUp</h2>
                                <div className="space28"></div>
                                <h4>Create an account</h4>
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
            <div className="profile-section-area">
                <div className="container-fluid">
                    <div className="box-agent-avt">
                        <div className="col-lg-12">

                            <div className="contact-form ">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        <div className="form-group col-md-6 mb-4">
                                            <label htmlFor="name">Full Name</label>
                                            <input type="text" name="name" className="form-control" id="name"
                                                   placeholder=" Full Name" {...register('name', {required: 'This field is required.'})}
                                                   />
                                            {errors?.name && <span className="text-danger">{errors?.name?.message}</span>}

                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" className="form-control" id="email" {...register('email', {required: 'This field is required.'})}
                                                   placeholder="Email"
                                                   />
                                            {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <label htmlFor="phone">Contact Number</label>
                                            <input type="number" name="phone" className="form-control" id="mobile" {...register('mobile', {required: 'This field is required.'})}
                                                   placeholder="Phone"  />
                                            {errors?.mobile && <span className="text-danger">{errors?.mobile?.message}</span>}
                                        </div>

                                        <div className="form-group col-md-6 mb-4">
                                            <label htmlFor="phone">Your Photo</label>
                                            <input type="file" name="photo" className="form-control" id="photo" {...register('photo', {required: 'This field is required.'})}
                                                   placeholder="Your Photo"                />
                                            {errors?.photo && <span className="text-danger">{errors?.photo?.message}</span>}
                                        </div>
                                        <div className="form-group col-md-6 mb-4">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="pasword" className="form-control" id="password" {...register('password', {required: 'This field is required.'})}
                                                   placeholder="enterpassword" />
                                            {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
                                        </div>

                                        <div className="form-group col-md-6 mb-5">
                                            <label htmlFor="floor">Floor No./ Block Name</label>
                                            <input type="text" name="floor" className="form-control" id="floor" {...register('floor', {required: 'This field is required.'})}
                                                   placeholder="Floor No./ Block Name" />
                                            {errors?.floor && <span className="text-danger">{errors?.floor?.message}</span>}
                                        </div>

                                        <div className="form-group col-md-6 mb-5">
                                            <label htmlFor="flat">Flat Number</label>
                                            <input type="text" name="flat" className="form-control" id="flat" {...register('flat', {required: 'This field is required.'})}
                                                   placeholder="Flat No."
                                                   />
                                            {errors?.flat && <span className="text-danger">{errors?.flat?.message}</span>}
                                        </div>
                                        <div className="form-group col-md-6 mb-5">
                                            <label htmlFor="members">Number of Family Members</label>
                                            <input type="text" name="members" className="form-control" id="members" {...register('members', {required: 'This field is required.'})}
                                                   placeholder="number of family members" />
                                            {errors?.members && <span className="text-danger">{errors?.members?.message}</span>}
                                        </div>

                                        <div className="form-group col-md-6 mb-5">
                                            <label htmlFor="date">Date of Move-in</label>
                                            <input type="date" className="form-control" id="date" {...register('date')} min={today} />
                                        </div>


                                    </div>
                                    <div className="row mt-3">
                                        <div className="form-group col-md-6 mb-5">
                                            <button  className="vl-btn1"
                                                    style={{marginLeft:'170px'}}>Create Account
                                            </button>


                                        </div>
                                        <div className="col-lg-6 mb-5">
                                            <Link to="/" style={{color: "black" , marginLeft: "210px"}}
                                               className="vl-hero-btn">Back</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSignup;