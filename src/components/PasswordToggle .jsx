import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordToggle.css"; // Optional for custom styles

     const PasswordToggle = () => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      
        const togglePasswordVisibility = () => {
          setIsPasswordVisible(!isPasswordVisible);
        };
      

  return (
    <div className="password-toggle-container">
      {/* <input
        type={isPasswordVisible?'text':'password'}
        placeholder="Enter your password"
        className="password-input"
      />
      <span className="toggle-icon" onClick={togglePasswordVisibility}>
        {isPasswordVisible ?<FaEyeSlash/>:<FaEye/>}
      </span> */}
    </div>
  );
};

export default PasswordToggle;
