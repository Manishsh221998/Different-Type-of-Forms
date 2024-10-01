    import React from "react";
    import {Navigate,Outlet} from 'react-router-dom'

    const ProtectedRoutes=()=>{
        const isAuthToken=window.sessionStorage.getItem("tokenv")  //if token is not found then error page will be open to redirect the user to login page
        // const isAuthToken=window.sessionStorage.getItem("token")

    console.log("Value of Auth Token",isAuthToken);
return isAuthToken?<Outlet/>:<Navigate to='/error'/>   
    }
    export default ProtectedRoutes 