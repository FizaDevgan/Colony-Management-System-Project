import axios from "axios";
import {getCookie, server_url} from "../../utils/script.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useForm} from "react-hook-form";


let Book = () => {
    let [helpers, setHelpers] = useState([]);
    let [bookings, setBookings] = useState([]);
    let [helperId, setHelperId] = useState('');
    useEffect(() => {
        fetchBookedData().then();
    }, []);
    let fetchData = async (e) => {
        setHelpers([])
        let service = e.target.value;
        try {
            let res = await axios.get(`${server_url}/user/fetchhelperdata/${service}`);
            console.log("Response----");
            console.log(res.data); // This is your actual data from the server
            let response = res.data;
            console.log(response);
            if (response.records.length === 0) {
                toast.error("No records found");
            } else {
                toast.success(response.message);
                setHelpers(response.records);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    let fetchBookedData = async () => {
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/fetchhelperbooked`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("Booked Data----");
        console.log(res)
        if (res.error) {
            toast.error(res.message);
        } else {
            // toast.success(res.message);
            setBookings(res.records);
        }
    }
    const [show, setShow] = useState(false);
    const [selectedHelper, setSelectedHelper] = useState(null);
    const handleClose = () => setShow(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    const handleShow = (helper) => {
        setSelectedHelper(helper);
        setHelperId(helper.id);
        setShow(true);
    };
    let today = new Date().toISOString().split('T')[0];
    let submitForm = async (data) => {
        const token = getCookie('userToken');
        // console.log("token:", token);

        let url = `${server_url}/user/booknow`;
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
            reset()
            setShow(false);
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
                                <h2>Book a Helper</h2>
                                <div className="space28"></div>
                                <p><a href="/user/userdash">Home</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16"
                                         fill="none">
                                        <path d="M1.5 1.74997L7.75 7.99997L1.5 14.25" stroke="#1B1B1B" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Book a Helper
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
            <div className="section-title text-center mt-3">

                <h2 className="text-anime-style-2">Choose<span> your Requirement</span></h2>
            </div>
            <div className="container mt-5 mb-5">

                {/*<form id="regsform">*/}
                <div className="row">
                    <div className="form-group mb-3  offset-md-3 w-50">
                        <label htmlFor="servicetype" className="form-label">Service Type</label>
                        <select className="form-select" onChange={(e) => fetchData(e)} id="servicetype"
                                name="servicetype" required>
                            <option selected disabled>Select service</option>
                            <option value="Electrican">Electrican</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Housekeeping">Housekeeping</option>
                            <option value="Cook">Cook</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>
                    {/*<input type="hidden" id="helperId" defaultValue={x.id} />*/}


                </div>

                {/*</form>*/}
            </div>

            <div className="section-title text-center mt-3">

                <h2 className="text-capitalize">Helpers/<span> Service Provider</span></h2>
            </div>
            <div className="container">
                <div className="row">
                    {
                        helpers && helpers.map((x, i) => {
                            return (

                                <div className="col-lg-4" key={i}>
                                    <div className="card bg-body-secondary shadow-sm">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Helper Details</h5>
                                            <p><strong>Name:</strong> <span className={"text-capitalize"}
                                                                            id="name">{x.name}</span></p>
                                            <p><strong>Gender:</strong> <span className={"text-capitalize"}
                                                                              id="gender">{x.gender}</span></p>
                                            <p><strong>Phone Number:</strong> <span id="number">{x.number}</span></p>
                                            <p><strong>Service Type:</strong> <span className={"text-capitalize"}
                                                                                    id="gate">{x.servicetype}</span></p>
                                            <p><strong>Availability:</strong> <span id="shift" className={"text-capitalize"}
                                                                                    style={{
                                                                                        backgroundColor: "#f15b26",
                                                                                        borderRadius: "10px",
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        padding: "4px"
                                                                                    }}>{x.availability}</span>
                                            </p>
                                            <p><strong>Medical:</strong> <span id="shift">{x.medical}</span></p>
                                            <p><strong>Status:</strong> <span id="shift"
                                                                              className="text-success">{x.status} By Admin</span>
                                            </p>
                                            <p className={"text-center"}>
                                                <button type='button' onClick={() => handleShow(x)}
                                                        className='btn btn-success btn-sm'>Book Now
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <hr/>
                <h2 className="text-center mt-3 text-capitalize">helpers/<span> Service Provider Booked By you</span>
                </h2>
                <div className="row">
                    {
                        bookings && bookings.map((x, i) => {
                            console.log(x)
                            let {name, gender, number, adharcard, servicetype, status} = x.helper
                            return (
                                <div className="col-lg-4" key={i}>
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <div className="card-body text-center">
                                                <h5 className="card-title">Booking Details</h5>
                                                <div style={{border:"2px black solid"}}>
                                                    <p style={{fontWeight:"bold"}}>Helper's Details</p>
                                                    <p>Name: {name} ({gender})</p>
                                                    <p>Contact No.: {number}</p>
                                                    <p>Aadhar card No.: {adharcard}</p>
                                                    <p>Service Type: {servicetype}</p>
                                                    <p>Status: {status}</p>
                                                    <hr/>
                                                    <p className={"mt-0"}>Booked On: <strong>{x.date.split('T')[0]}</strong></p>
                                                    <p>Instructions: <strong className={"text-capitalize"}>{x.instructions}</strong></p>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <input type={"hidden"} id={"plumber_id"} defaultValue={helperId} {...register('helperId')} />

                        <div className="form-group mb-2">
                            <label htmlFor={"date"}>Choose Date:</label>
                            <input type="date" name="date" className="form-control mt-3 mb-2" id="date"
                                   defaultValue={today}
                                   min={today} {...register('date', {required: 'This date is required'})}
                                   placeholder="Date Of Booking"/>
                            {errors?.date && <span className="text-danger">{errors?.date?.message}</span>}

                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor={"instruction"}>Instruction(s):</label>
                            <textarea name="instruction" rows="4" className="form-control"
                                      id="instruction" {...register('instructions', {required: 'This date is required'})}
                                      placeholder="instructions for helper"></textarea>
                            {errors?.instructions &&
                                <span className="text-danger">{errors?.instructions?.message}</span>}

                        </div>

                        <button className="btn btn-success">Confirm Your Booking</button>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Book;