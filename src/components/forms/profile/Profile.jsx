import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance, profileURL } from "../api/axiosInstance/axiosInstance";
import { base_url,end_points } from "../api/url/api_url";
import Swal from "sweetalert2";
import { Image,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Profile.css'
const Profile = () => {
  let negigate=useNavigate()
  let api=end_points.profile;
  console.log("Api", api);
  let [state, setStste] = useState([]);
  let[propic,setPic]=useState('')

  const getData = () => {
    axiosInstance
      .get(api)
      .then((res) => {
        console.log("Profile", res);
        if(res.data.status===200){
          setTimeout(() => {
             Swal.fire({
              position:"center",
              icon:"success",
              title:res.data.message,
              showConfirmButton:false,
              timer: 1400,
             })
          }, 1500);     
          setStste(res.data.data);
          let image_url=profileURL(res.data.data.profile_pic);
          setPic(image_url)
        }  
      })
      .catch((err) => {
        console.log("Axios error", err);
      });
  };
  useEffect(() => {
    getData();
  }, [setStste, api]);

  const logOut=()=>{
    window.sessionStorage.clear()
    negigate('/login')
  }

  return (
    <div className="profile m-4 fs-4 d-flex justify-content-center">
      <ul className="profile-container p-2 text-start ps-4 text-decoration-none list-unstyled shadow border border-secondary border-opacity-50 rounded-3 text-bg-dark">
       <li className="d-flex justify-content-center p-3">
       <Image src={propic} rounded height={250} width={200} className="shadow border border-success rounded-4"/>
        </li>
        <li> 
          First Name : <span className="text-warning">{state.first_name}</span>
        </li>
        <li>
           Last Name : <span className="text-warning">{state.last_name}</span>
        </li>
        <li>
          Email : <span className="text-warning">{state.email}</span>
        </li>
        <li className="mb-3">       
Register type : <span className="text-warning">{state.
register_type}</span>
        </li>
<li className="d-flex justify-content-center mb-3">
        <Button type="submit" variant="outline-warning"  size="lg" onClick={logOut}>Log out</Button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
