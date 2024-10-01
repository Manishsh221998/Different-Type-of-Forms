 import React from 'react'
 import { Link } from 'react-router-dom'
 import {Container,Nav,Navbar,NavLink,Dropdown,DropdownButton}from 'react-bootstrap'

 const Error = () => {
   return (
    <div >
        <h1 className='border border-3 border-danger inline-block m-5 p-5 shadow '>Error
            <h4><Nav.Link as={Link} to='/login' className='menu text-info pt-2'>Login</Nav.Link>  </h4>
        </h1>
                   
</div>
  )
}

export default Error