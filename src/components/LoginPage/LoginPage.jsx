import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../InputForm/InputForm";
import "./LoginPage.scss";
import users from "../../usersdata.json";


const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");


   const navigate = useNavigate();

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   const handleShowPasswordChange = (event) => {
      setShowPassword(event.target.checked);
   };

   const handleBlurEmail = () => {
      const isValid = /\S+@\S+\.\S+/.test(email);
      if (!isValid) {
         setEmailError("Invalid email format");
      } else {
         setEmailError("");
      }
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const user = users.find(
         (u) => u.email === email && u.password === password
      );
      if (user) {
         navigate(`/profile/${user.id}`);
      } else {
         setPasswordError("Incorrect email or password");
      }
   };

   return (
      <div className="login-page">
         <div className="login-box">
            <div className="login">Login</div>
            <form onSubmit={handleSubmit}>
               <div className="input-field">
                  <InputForm
                     label="Email"
                     placeholder="example@gmail.com"
                     value={email}
                     onChange={handleEmailChange}
                     onBlur={handleBlurEmail}
                     errorMessage={emailError}
                  />
                  <div className="password-input">
                     <InputForm
                        label="Password"
                        placeholder="******"
                        value={password}
                        onChange={handlePasswordChange}
                        type={showPassword ? "text" : "password"}
                        errorMessage={passwordError}
                     />
                  </div>
                  <div className="show-password-container">
                     <label className="show-password-label">
                        <input
                           type="checkbox"
                           checked={showPassword}
                           onChange={handleShowPasswordChange}
                        />
                        Show password
                     </label>
                     <button type="submit">Sign in</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
