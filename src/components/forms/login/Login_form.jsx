import React,{useState} from 'react'
import "./Login_form.css"
import {Form,Button,FloatingLabel,NavLink} from 'react-bootstrap'
 import { axiosInstance } from '../api/axiosInstance/axiosInstance';
import { Link } from 'react-router-dom';
import {base_url,end_points } from '../api/url/api_url' 
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login_form = () => {
  // let api="https://jsonplaceholder.typicode.com/users";
  let api=end_points.login
  let nevigate=useNavigate()

  let[inputState,setState]=useState({email:'',log_Pwd:'',errors:{email:'',log_Pwd:''}})
const changeHandler=(e)=>{
  let{name,value}=e.target;
// console.log("Event :",name,":",value);
  let err={...inputState.errors}
switch (name) {
  case "email":err.email=value.length<1?"required field":(value.length<10?"min 10 chars required":'');
    break;
  case "log_Pwd":err.log_Pwd=value.length<1?"required field":(value.length<8?"min 8 chars required":'');
    break;
  default:console.log("Invalid input");
    break;
}

setState({...inputState,[name]:value,errors:err})
}

const submitHandler=(e)=>{
e.preventDefault()
console.log("InputData via DOM :",inputState);
let{email,log_Pwd}=inputState.errors
if(inputState.email!==''&&inputState.log_Pwd!==''){
if(!email&&!log_Pwd){
  console.log("Submitted",inputState);

  // let log_Data={
  //   email:inputState.email,
  //   logIn_Password:inputState.log_Pwd
  // }
  let formData=new FormData()
  formData.append("email",inputState.email)
  formData.append("password",inputState.log_Pwd)

  axiosInstance.post(api,formData)
  .then(res=>{
    console.log("Axios res",res)
    // alert(res.data.message)
    // Swal.fire({
    //       position:"center",
    //       icon:"success",
    //       title:res.data.message,
    //       showConfirmButton:false,
    //       timer: 1400
    //     })
    if(res.data.status===200){
      window.sessionStorage.setItem("token",res.data.token)
    Swal.fire({
      position:"center",
      icon:"success",
      title:res.data.message,
      showConfirmButton:false,
      timer: 1000
    })
    nevigate('/profile')
  }
  else{
    Swal.fire({
      position:"center",
      icon:"error",
      title:res.data.message,
      showConfirmButton:false,
      timer: 1500
    })
  }
  })
  .catch(err=>{
    console.log("Axios error",err);
    
  })
 
}
else{
  alert("You can not submit,please check the errors")

  // Swal.fire({
  //   position: "center",
  //   icon: "warning",
  //   title:"Oops...",
  //   text:"Please check the errors.",
  //   showConfirmButton:true,
  //   timer: 1800
  // });
}
}
else{
  alert("You can not submit, please fill-up all the required fields")
  // Swal.fire({
  //   position: "center",
  //   icon: "warning",
  //   title:"Oops...",
  //   text:"Please fill-up all the required fields.",
  //   showConfirmButton:true,
  //   timer: 1800
  // });
}
}

  return (
<section className='d-flex justify-content-center'>
    <Form onSubmit={submitHandler} className='text-start m-5 border-5 border-top border-bottom border-info border-opacity-100 rounded-5 p-5 shadow'>
    <div className='d-flex justify-content-center mb-3'>
      <h3 className='text-info'>Log in</h3>
      </div>
      
      <FloatingLabel
        controlId="email"
        label="email"
        className="mb-3 text-dark text-opacity-75" >
        <Form.Control type="text" placeholder="email" name='email' onChange={changeHandler}/>
      {inputState.errors.email?<p className='text-end text-danger'>{inputState?.errors?.email}</p>:null}
      </FloatingLabel>

      <FloatingLabel controlId="log_Pwd" label="Password" className="mb-4 text-dark text-opacity-75">
        <Form.Control type="password" placeholder="Password" name='log_Pwd' onChange={changeHandler}/>
        {inputState.errors.log_Pwd?<p className='text-end text-danger'>{inputState?.errors?.log_Pwd}</p>:null}
      </FloatingLabel>

       <div className='d-flex justify-content-center mb-3'>
      <Button variant='outline-info' type='submit' className='shadow-sm w-50 mt-3'>Log in</Button>
      </div>
      <span className='text-secondary m-2'>If you are not registered? click here for<br /><NavLink as={Link} to='/' className='ps-2 text-primary d-inline'>registraion</NavLink></span>
      </Form>
  </section>
  )
}

export default Login_form