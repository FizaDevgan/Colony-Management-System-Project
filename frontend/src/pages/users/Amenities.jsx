import {useForm} from "react-hook-form";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";

let Amenities = () => {

   let submitForm = async (data) => {
       try {
           const userToken = getCookie('userToken');
           const url = `${server_url}/user/regsvehical`;

           // Create FormData object
           const formData = new FormData();

           // Append all fields to FormData
           console.log("key====")
           for (let key in data) {
               console.log(key)
               if (key === 'rc') {
                   formData.append('rc', data.rc[0]); // only the first selected file
               } else {
                   formData.append(key, data[key]);
               }
           }

           let response = await axios.post(url, formData, {
               headers: {
                   'Content-Type': 'multipart/form-data',
                   Authorization: `Bearer ${userToken}`
               },
           });
           console.log(response)
           const {error, message} = response.data;

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
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    return (
        <>
            <div className="space30"></div>
            <div className="inner-header-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="inner-header heading1">
                                <h2>Amenities</h2>
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
                                    Amenities
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
                <div className="row">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">User Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="User Email"
                                {...register('email',{required:'This field is required'})}/>
                            {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="oname" className="form-label">Vehicle Owner Name</label>
                            <input type="text" className="form-control" id="oname" name="oname" {...register('oname',{required:'This field is required'})}
                                   placeholder="Vehicle Owner Name" />
                            {errors?.oname && <span className="text-danger">{errors?.oname?.message}</span>}

                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="type" className="form-label">Vehicle Type</label>
                            <select className="form-control" id="type" name="type" {...register('type',{required:'This field is required'})}>
                                <option value="">Select Vehicle Type</option>
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Scooter">Scooter</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors?.type && <span className="text-danger">{errors?.type?.message}</span>}

                        </div>


                        <div className="form-group mb-3">
                            <label htmlFor="vnumber" className="form-label">Vehicle Number</label>
                            <input type="text" className="form-control" id="vnumber" name="vnumber" {...register('vnumber',{required:'This field is required'})}
                                   placeholder="Vehicle Number" />
                            {errors?.vnumber && <span className="text-danger">{errors?.vnumber?.message}</span>}

                        </div>


                        <div className="form-group mb-3">
                            <label htmlFor="rc">RC Photo</label>
                            <input className="form-control" type="file" id="rc" name="rc" {...register('rc',{required:'This field is required'})}/>
                            {errors?.rc && <span className="text-danger">{errors?.rc?.message}</span>}

                        </div>


                        <button  className="vl-btn1">Register</button>
                    </form>
                </div>

            </div>
        </>
    )
}
export default Amenities