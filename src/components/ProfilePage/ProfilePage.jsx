import React, { useState, useEffect  } from "react";
import InputForm from "../InputForm/InputForm";
import "./ProfilePage.scss";
import usersData from "../../usersdata.json";
import { useParams } from "react-router-dom";


const ProfilePage = () => {
   const [fullName, setFullName] = useState("");
   const [dob, setDob] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [isEmailValid, setIsEmailValid] = useState(true);
   const [isPhoneValid, setIsPhoneValid] = useState(true);

   const { userId } = useParams(); // get the userId from the URL
   const user = usersData.find(user => user.id == userId); // find the user in usersData based on the userId

   useEffect(() => {
     const user = usersData.find((u) => u.id.toString() === userId);
     if (user) {
       setFullName(user.fullName);
       setDob(user.dob);
       setEmail(user.email);
       setPhone(user.phone);
     }
   }, [userId]);

   const handleFullNameChange = (event) => {
      setFullName(event.target.value);
   };

   const handleDobChange = (event) => {
      setDob(event.target.value);
   };

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   const handleEmailBlur = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(email));
   };

   const handlePhoneChange = (event) => {
      setPhone(event.target.value);
   };

   const handlePhoneBlur = () => {
      const phoneRegex = /^\d{10}$/;
      setIsPhoneValid(phoneRegex.test(phone));
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const updatedUsersData = usersData.map((user) => {
         if (user.id == userId) {
            return {
               ...user,
               fullName: fullName,
               dob: dob,
               email: email,
               phone: phone,
            };
         } else {
            return user;
         }
      });
      // It supposed to be updated back to the json file but I don't have a server to set-up a API
      // It takes time to do that and I don't think it needed, so I just console.log the change here
      console.log(
         `Full Name: ${fullName}, DOB: ${dob}, Email: ${email}, Phone: ${phone}`
      );
   };

   const handleCancel = () => {
      setFullName("");
      setDob("");
      setEmail("");
      setPhone("");
   };

   return (
      <div class="profile-page">
         <div class="profile-box">
            <div class="profile">Profile</div>
            <form onSubmit={handleSubmit}>
               <div class="input-field">
                  <InputForm
                     label="Full Name"
                     type="text"
                     id="full-name"
                     onChange={handleFullNameChange}
                     value={fullName}
                  />
                  <InputForm
                     label="Day of Birth"
                     type="date"
                     id="dob"
                     value={dob}
                     onChange={handleDobChange}
                  />
                  <InputForm
                     label="Email"
                     id="email"
                     value={email}
                     onChange={handleEmailChange}
                     onBlur={handleEmailBlur}
                     errorMessage={!isEmailValid && "Invalid email address"}
                  />
                  <InputForm
                     label="Phone"
                     id="phone"
                     value={phone}
                     onChange={handlePhoneChange}
                     onBlur={handlePhoneBlur}
                     errorMessage={
                        !isPhoneValid && "Invalid phone number (10 digits)"
                     }
                  />
               </div>
               <div class="button-group">
                  <button className="update-button" type="submit">
                     Update
                  </button>
                  <button
                     className="cancel-button"
                     type="button"
                     onClick={handleCancel}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfilePage;
