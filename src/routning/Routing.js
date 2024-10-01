import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Registration_form from '../components/forms/registration/Registration_form'
import Login_form from '../components/forms/login/Login_form'
import Home from '../components/home/Home'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'
import Profile from '../components/forms/profile/Profile'
import NewFormik_form from '../components/Formik/formik_registration/Registration'
import Error from '../components/forms/error/Error'
import ProtectedRoutes from '../components/forms/api/url/isAuth'
import Hook_form from '../components/Hook_Form/Hook_form'
const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='custom_regestration' element={<Registration_form />} />
        <Route path='custom_login' element={<Login_form />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='custom_profile' element={<Profile />} />

        </Route>
        <Route path='formik_registration' element={<NewFormik_form />} />
        <Route path='hook_form' element={<Hook_form />} />

        <Route path='error' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default Routing