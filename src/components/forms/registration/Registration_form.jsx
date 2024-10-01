import React,{inputState, useState} from 'react'
import './Registration_form.css'
import { Link } from 'react-router-dom'
import { Form,Button,Row,Col,Container,NavLink} from 'react-bootstrap'
import {base_url,end_points } from '../api/url/api_url' 
import {useNavigate } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance/axiosInstance'
import Swal from 'sweetalert2'
import {FaRegEyeSlash ,FaRegEye} from 'react-icons/fa'
import axios from 'axios'
  // import axios from {axios}
  const emailReg=RegExp('^([a-z0-9.-]+)@([a-z]{4,12}).([a-z.]{2,20})$')
  const passwordReg=RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$')
const Registration_form = () => {
// let api="https://jsonplaceholder.typicode.com/users";
let api=end_points.register

let nevigate=useNavigate()
let[inputState,setState]=useState({fname:'',lname:'',email:'',pwd:'',c_pwd:'',errors:{fname:'',lname:'',email:'',pwd:'',c_pwd:''}})  
const changeHandler=(event)=>{
  let{name,value}=event.target;
// console.log("Event-",name,":",value);
let err={...inputState.errors}
 switch (name) {
  case'fname':err.fname=value.length<1?'required filled':(value.length<2?'minimum 2 characters required':'');
    break;
  case 'lname':if(value.length<1){
    err.lname='required filled';
  }
  else if(value.length<3){
    err.lname='minimum 3 characters required';
  }
  else{
    err.lname='';
  }
  case'email':
  // err.email=value.length<1?'required filled':(value.length<10?'minimum 10 characters required':"");
  if(value.length<1) err.email='required filled';
  else if(value.length<10) err.email='minimum 10 characters required';
  else if(!emailReg.test(value)) err.email='Wrong Pattern';
  else err.email=''
  break;

   case'pwd':err.pwd=value.length<1?'required filled':(value.length<8?'password must be 8 characters':((!passwordReg.test(value))?"Wrong Pattern":''));
 break;
 case'c_pwd':err.c_pwd=value.length<1?'required filled':(value!==inputState.pwd?'password & confirm password must be same':'');
 break;
  default:console.log('invalid input');
  
    break;
 }




setState({...inputState,[name]:value,errors:err})

}


const submitHandler=(event)=>{
event.preventDefault()
let{fname,lname,email,pwd,c_pwd}=inputState.errors;
 

 if(inputState.fname!==''&&inputState.lname!==''&&inputState.email!==''&&inputState.pwd!==''&&inputState.c_pwd!==''){
if(!fname&&!lname&&!email&&!pwd&&!c_pwd){
console.log("Submitted",inputState,inputImage);
// let data={
//   firstname:inputState.fname,
//   lastname:inputState.lname,
//   email:inputState.email,
//   password:inputState.pwd,
//   confirm_password:inputState.c_pwd
// }
let formData=new FormData()
formData.append("first_name",inputState.fname)
formData.append("last_name",inputState.lname)
formData.append("email",inputState.email)
formData.append("password",inputState.c_pwd)
formData.append("profile_pic",inputImage)


axiosInstance.post(api,formData)
.then(res=>{
  console.log("Axios res",res);
  // alert("Your Form submitted &"+res.data.message)  
  Swal.fire({
    position: "center",
    icon: "success",
    title: res.data.message,
    showConfirmButton:true,
    timer: 1400,
  });
  
  nevigate('/login')
})
.catch(err=>{
  console.log("Axios err",err);
  
})
}
else{
  alert("You can't submit the form,check the errors")
  // Swal.fire({
  //   position: "center",
  //   icon: "warning",
  //   title:"Oops...",
  //   text:"You can't submit the form, Check the errors",
  //   showConfirmButton:true,
  //   timer: 1500
  // });
}
 }
 else{
  alert('You can not submit, Please fill-up all the required fields')
  // Swal.fire({
  //   position: "center",
  //   icon: "warning",
  //   title:"Oops...",
  //   text:"You can not submit, Please fill-up all the required fields",
  //   showConfirmButton:true,
  //   timer:2000
  // });
 }
console.log("Inputdata via dom :",inputState);

}

let[inputImage,setImage]=useState()
const imageHandler=(event)=>{
  // console.log("Event Image-",event);
setImage(event.target.files[0])
// console.log(inputImage);
}
let[isPasswordVisible,setPasswordVisible]=useState(false)
const passwordTogle=()=>{
setPasswordVisible(!isPasswordVisible)
}

 
  return (
    <section className='d-flex justify-content-center '>
    <Form onSubmit={submitHandler}className='formRege text-start m-5 p-4 border-top border-bottom  border border-primary rounded-4 shadow'>
    <div className='d-flex justify-content-center text-primary mb-3'><h3>Custom Registration Form</h3></div>
    
    <Form.Group className="mb-3" controlId="fname">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text"  placeholder="Enter first name"name='fname' onChange={changeHandler}/>
    {inputState.errors.fname.length>0?<p className="text-danger text-end">{inputState?.errors?.fname}</p>:null}

    </Form.Group>

    <Form.Group className="mb-3" controlId="lname">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Enter last name" name='lname' onChange={changeHandler}/>
    {inputState.errors.lname.length>0?<p className="text-danger text-end">{inputState?.errors?.lname}</p>:null}
    </Form.Group>

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' onChange={changeHandler}/>
      {inputState.errors.email.length>0?<p className="text-danger text-end">{inputState?.errors?.email}</p>:null}
 
     </Form.Group>

    <Form.Group className="mb-3" controlId="pwd">
      <Form.Label>Enter Password</Form.Label>
      <Form.Control type="text" autoComplete='off' placeholder="password" name='pwd' onChange={changeHandler}/>
    {inputState.errors.pwd?<p className="text-danger text-end">{inputState?.errors?.pwd}</p>:null}
    </Form.Group>

    <Form.Group className="password-toggle-container mb-3" controlId="c_pwd" >
      <Form.Label>Confirm password</Form.Label>
      <Form.Control className='password-input' type={isPasswordVisible?"text":"password"} placeholder="********" name='c_pwd' onChange={changeHandler}>
      </Form.Control>
      <span className='toggle-icon' onClick={passwordTogle}>{isPasswordVisible?<FaRegEye/>:<FaRegEyeSlash/>}</span>
      </Form.Group>
      <> {inputState.errors.c_pwd?<p className="text-danger text-end">{inputState?.errors?.c_pwd}</p>:null}</>

    <Form.Group className="mb-3" controlId="img">
      <Form.Label>Choose a profile image</Form.Label>
      <Form.Control type="file" placeholder="Password" name='img' onChange={imageHandler}/>
    </Form.Group>
<div className='d-flex justify-content-center'>
     <Form.Group className="pt-3" controlId="">
      <Button type='submit' variant='outline-primary' className='fs-5 border-end-0 rounded-pill rounded-end-0' >Submit</Button>
      </Form.Group>
      <Form.Group className="pt-3 pb-2" controlId="">
     <Button type='reset' variant='outline-danger' className='fs-5 border-1 rounded-pill rounded-start-0 mb-2'>Reset</Button>      
      </Form.Group>
       </div>
       <span className='text-secondary m-2'>Are you already registered?<br /><span className='ps-2 text-secondary'>click here for <NavLink as={Link} to='/login' className='text-primary d-inline'>log in</NavLink></span></span>
   </Form>
   
  </section>
  )
}

export default Registration_form