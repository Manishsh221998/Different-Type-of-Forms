import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
 import {Container,Nav,Navbar,NavLink,Dropdown,DropdownButton}from 'react-bootstrap'

function Header() {
  return (
    <section className='header'>
    <Navbar expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to='/' className='fs-3 fw-medium'>Form Handling </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto fs-5 m-1 ms-5 gap-4">
            <Nav.Link as={Link} to='/' className='menu'>Home</Nav.Link>
            <DropdownButton id="dropdown-basic-button" title="Custom Forms" variant='bg-light' className='menu mt-1'>
      <Dropdown.Item as={Link} to='/custom_regestration' className='menu'>Registeration</Dropdown.Item>
      <Dropdown.Item as={Link} to='/custom_login' className='menu'>Login</Dropdown.Item>
      <Dropdown.Item as={Link} to='/custom_profile' className='menu'>Profile</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Formik Forms" variant='bg-light' className='menu mt-1'>
      <Dropdown.Item as={Link} to='/formik_registration' className='menu'>Formik-Registration</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Hook Forms" variant='bg-light' className='menu mt-1'>
      <Dropdown.Item as={Link} to='/hook_form' className='menu'>Hook-Form-Registration</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </section>
  )
}

export default Header