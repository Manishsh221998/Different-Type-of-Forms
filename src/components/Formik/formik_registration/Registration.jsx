import React from 'react'
import { Form,Button } from 'react-bootstrap'
import {useFormik} from 'formik'
import { axiosInstance } from '../../forms/api/axiosInstance/axiosInstance'
import "./NewFormik_form.css"
import { end_points } from '../../forms/api/url/api_url'
import Swal from 'sweetalert2' 

const emailReg=RegExp('^([a-z0-9.-]+)@([a-z]{4,12}).([a-z.]{2,20})$')
const passwordReg=RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$')

 const Registration = () => {
  let api=end_points.register;
  // console.log("Api",api);
    
  const formatValidator=(data)=>{
    let err={}
    //firstName
    if(data.fName.length<1) err.fName='Required field';
    else if(data.fName.length<2) err.fName='Minimum 2 characters';

     //lastName
     if(data.lName.length<1) err.lName='Required field';
     else if(data.lName.length<3) err.lName='Minimum 3 characters';

      //email
    if(data.email.length<1) err.email='Required field';
    else if(data.email.length<10) err.email='Minimum 10 characters';
    else if(!emailReg.test(data.email)) err.email="Wrong Pattern";

     //password
     if(data.pwd.length<1) err.pwd='Required field';
     else if(data.pwd.length<6) err.pwd='Minimum 6 characters';
     else if(!passwordReg.test(data.pwd)) err.pwd="Wrong Pattern";

    return err;
  }

let formik=useFormik({
initialValues:{
    fName:'',
    lName:'',
    email:'',
    pwd:'',
    image:{}
},
validate:formatValidator,

onSubmit:(formData)=>{
    console.log('Recived data from the form',formData);
    let apiformData=new FormData()
    apiformData.append("first_name",formData.fName)
    apiformData.append("last_name",formData.lName)
    apiformData.append("email",formData.email)
    apiformData.append("password",formData.pwd)
    apiformData.append("profile_pic",formData.image)

axiosInstance.post(api,apiformData)
 .then(res=>{
  console.log('Api res :',res);
if(res.data.status===200){
  //  alert(res.data.message)
   Swal.fire({
    position: "center",
    icon: "success",
    title: res.data.message,
    showConfirmButton: false,
    timer: 1200
  });
  }
  else{
    Swal.fire({
      position: "center",
      icon: "error",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1200
    });
  }
})

.catch(err=>{
  console.log("Axios err :",err);
})
}

})

  return (
    <section className='text-start d-flex justify-content-center m-4'>
    <Form className='p-4 border rounded-3 shadow' onSubmit={formik.handleSubmit}>
      <div className='text-center fs-4 pb-3 fw-bold mx-5'><Form.Text className='text-info'>Formik Registration Form</Form.Text></div>
    <Form.Group className="mb-3" controlId="fName">
      <Form.Label>First name</Form.Label>
      <Form.Control type="txet" placeholder="Enter First Name" name='fName' value={formik.values.fName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.touched.fName && formik.errors?.fName?<p className='err_msg'>{formik.errors?.fName}</p>:''}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="textarea">
        <Form.Label>Last name</Form.Label>
        <Form.Control placeholder='Last name' type='text' name='lName' value={formik.values.lName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
        {formik.touched.lName && formik.errors?.lName?<p className='err_msg'>{formik.errors?.lName}</p>:''}
      </Form.Group>

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.touched.email && formik.errors?.email?<p className='err_msg'>{formik.errors?.email}</p>:''}
    </Form.Group>

    <Form.Group className="mb-3" controlId="pwd">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='pwd'  value={formik.values.pwd}  onBlur={formik.handleBlur} onChange={formik.handleChange}/>
      {formik.touched.pwd && formik.errors?.pwd?<p className='err_msg'>{formik.errors?.pwd}</p>:''}
    </Form.Group>
     
    <Form.Group className="mb-3" controlId="file">
      <Form.Label>Choose a profile pic</Form.Label>
      <Form.Control type="file" name='image' onChange={(event)=>{formik.setFieldValue(event.target.files[0])}}/>
     </Form.Group>

<div className="d-flex justify-content-center">
<Button variant="outline-dark" type="submit" value='App Data' disabled={!(formik.isValid&&formik.dirty)}>
      Submit
    </Button>
</div>
    
  </Form>
  </section>
  )
}

export default Registration

// isValid dirty result disabled
// F       F     F      T
// T       F     F      T
// F       T     F      T
// T       T     T      F
 