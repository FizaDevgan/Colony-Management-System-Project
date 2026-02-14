import {useForm} from "react-hook-form";
import axios from "axios";
import {getCookie, server_url} from "../../utils/script.jsx";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

let Vehicle = () => {
    let [vehicle, setVehicle] = useState([]);
    useEffect(() => {
        fetchRegisteredVehicles().then()
    }, [])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
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

    let fetchRegisteredVehicles = async () => {
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/fetchvehical`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.error);
        if (res.data.error) {
            // console.log(res.data.message)
            toast.error(res.data.message)
        } else {
            // toast.success(res.data.message)
            setVehicle(res.data.records)
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
                                <h2>Vehicle</h2>
                                <div className="space28"></div>
                                <p><a href="/user/userdash">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B"/>
                                    </svg>
                                    Register a Vehicle
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
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"email"}>User's Email Id:</label>
                                <input type="email" name="email" className="form-control mt-3 mb-2" id="email"
                                       {...register('email', {required: 'This field is required'})}
                                       placeholder="test@gmail.com"/>
                                {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"oname"}>Vehicle's Owner Name:</label>
                                <input type={"text"} name="oname" className="form-control"
                                       id="oname" {...register('oname', {required: 'This field is required'})}
                                       placeholder="Name"/>
                                {errors?.oname &&
                                    <span className="text-danger">{errors?.oname?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"type"}>Vehicle Type:</label>
                                <select name="type" className="form-control mt-3 mb-2" id="type"
                                        {...register('type', {required: 'This field is required'})}>
                                    <option value="">Select Vehicle Type</option>
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Scooter">Scooter</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors?.type && <span className="text-danger">{errors?.type?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"vnumber"}>Vehicle No.:</label>
                                <input type="text" name="vnumber" className="form-control mt-3 mb-2" id="vnumber"
                                       {...register('vnumber', {required: 'This field is required'})}
                                />
                                {errors?.vnumber && <span className="text-danger">{errors?.vnumber?.message}</span>}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <label htmlFor={"rc"}>RC Photo:</label>
                                <input type="file" name="rc" className="form-control mt-3 mb-2" id="rc"
                                       {...register('rc', {required: 'This field is required'})}
                                />
                                {errors?.rc && <span className="text-danger">{errors?.rc?.message}</span>}

                            </div>
                        </div>


                        <div className="col-lg-6">
                            <button className="vl-btn1 mt-4">Register</button>
                        </div>
                    </div>
                </form>
                <hr/>
                <div className="row mb-3">
                    <h2 className={"text-center"}>My Registered Vehicle(s)</h2>
                    {
                        vehicle && vehicle.length > 0 && vehicle.map((vehicle, index) => (
                            <div key={vehicle.id} className={"col-lg-4 text-center"} style={{border:"2px solid black",borderCollapse:"collapse"}}>
                                <p>Email : <strong>{vehicle.email}</strong></p>
                                <p>Owner Name : <strong>{vehicle.oname}</strong></p>
                                <p>Vehicle Type : <strong>{vehicle.type}</strong></p>
                                <p>Vehicle Vehicle No. : <strong>{vehicle.vnumber}</strong></p>
                                <p>RC Photo : <img src={server_url+vehicle.rc} style={{height:"80px",width:"80px"}}/> </p>
                                <p>Status : <strong>{vehicle.status}</strong></p>
                                <p>Registered On : <strong>{vehicle.createdAt.split('T')[0]} {(vehicle.createdAt.split('T')[1]).substr(0,8)}</strong></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Vehicle;