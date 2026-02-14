import {useEffect, useState} from "react";
import {getCookie, server_url} from "../../utils/script.jsx";
import axios from "axios";
import {toast} from "react-toastify";

let ManageVehicles = () => {
    let [vehicles,setVehicles] = useState([])
    useEffect(()=>{
        fetchVehicles().then()
    },[])
    let fetchVehicles = async () => {
        const token = getCookie('gaurdToken');
        // console.log("token:", token);

        let url = `${server_url}/vehicaldata`;
        let res = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res = res.data;
        console.log("fetched Data----");
        console.log(res)
        if(res.error){
            toast.error(res.message)
        }
        else{
            setVehicles(res.records)
        }
    }
    let approveVehicle = async (id) => {
        if(confirm("Are you sure?")){
            const token = getCookie('gaurdToken');
            // console.log("token:", token);
            let status='Approved'
            let data = {
                status:status
            }
            let url = `${server_url}/changestatus2/${id}`;
            let res = await axios.put(url, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res = res.data;
            console.log(res)
            if(res){
                toast.success(res.message)
                fetchVehicles().then()
            }
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
                                <h2>Manage Vehicles</h2>

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
                <div className="table-responsive-lg">
                    <table className="table table-striped table-hover  ">
                        <thead>
                        <tr className={"text-center"}>
                            <th>Resident Name</th>
                            <th> Email</th>
                            <th>Owner Name</th>
                            <th>Type Of Vehicle</th>
                            <th>Vehicle Number</th>
                            <th>Rc Photo</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            vehicles.length > 0 ?
                                vehicles.map((vehicle,index) => (
                                    <tr className={"text-center"} key={vehicle.id}>
                                        <td>{vehicle.user.name}</td>
                                        <td>{vehicle.email}</td>
                                        <td>{vehicle.oname}</td>
                                        <td>{vehicle.type}</td>
                                        <td>{vehicle.vnumber}</td>
                                        <td><img src={server_url+"/"+vehicle.rc} style={{height:"80px",width:"80px"}} alt={""}/> </td>
                                        <td>{vehicle.status}</td>
                                        <td>{vehicle.status === "pending" &&
                                            <button type="button" className="btn btn-success border-white "
                                                    onClick={()=>approveVehicle(vehicle.id)}>Approve
                                            </button>
                                        }

                                        </td>
                                    </tr>
                                )) :
                                <tr>
                                    <th className={"text-center"} colSpan={"8"}>No data found</th>
                                </tr>
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ManageVehicles;