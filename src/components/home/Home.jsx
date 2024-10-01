import React from 'react'
import './Home.css'
import PasswordToggle from '../PasswordToggle '
import {Link,NavLink} from 'react-router-dom'
import { Button } from 'react-bootstrap'
const Home = () => {
  return (
    <div style={{margin:"247px"}}>
      <h1 className='m-5 text-danger'>Form Handling Project</h1>
      <div className="">
      <Link to='/custom_regestration'><Button variant='outline-dark m-1 shadow-sm'> Custom Form </Button></Link>
      <Link to='/formik_registration'><Button variant='outline-dark m-1 shadow-sm'> Formik Form </Button></Link>
      <Link to='/hook_form'><Button variant='outline-dark m-1 shadow-sm'> React Hook Form </Button></Link>
      </div>
       </div>
  )
}

export default Home