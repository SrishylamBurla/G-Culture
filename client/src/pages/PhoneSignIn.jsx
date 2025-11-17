// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Button, TextField } from "@mui/material";
// import { RecaptchaVerifier } from "firebase/auth";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { useState } from "react";
// import {auth} from "../firebase/setup"

// export const PhoneSignIn = () => {
//     const [phone, setPhone] = useState('')
//     const [otp, setOtp] = useState('')
//     const [user, setUser] = useState(null)

//     const sendOtp = async () =>{
//         try {
//             const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
//             const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
//             setUser(confirmation);
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     const verifyOtp = async () =>{
//         try {
//             const data = await user.confirm(otp)
//         } catch (err) {
//             console.log(err);

//         }
//     }

//   return (
//     <div className="flex justify-center items-center px-6 pt-24 bg-amber-100 min-h-screen text-black">
//       <div className="w-full max-w-xs text-center">
//         <PhoneInput
//           country={"in"}
//           value={phone}
//           onChange={(phone)=>{setPhone("+" + phone)}}
//           inputStyle={{
//             width: "100%",
//             height: "45px",
//             fontSize: "12px"
//           }}
//           buttonStyle={{
//             border: "none"
//           }}
//         />
//         <Button onClick={sendOtp} sx={{marginTop: '10px'}} variant='contained'>Send OTP</Button>
//         <div className="mt-3 flex justify-center" id="recaptcha"></div>
//         <TextField onChange={(e)=>setOtp(e.target.value)} size="small" variant="outlined" sx={{marginTop: '10px', width: '300px'}} label="Enter OTP" />
//         <Button onClick={verifyOtp} variant="contained" color="success" sx={{marginTop:'10px'}}>Verify OTP</Button>
//       </div>
//     </div>
//   );
// };

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, TextField } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/setup";

export const PhoneSignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // 🟩 Create Recaptcha only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  const sendOtp = async () => {
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmationResult(confirmation);

      alert("OTP Sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!confirmationResult) return alert("Please send OTP first");

      const result = await confirmationResult.confirm(otp);
      console.log("Logged In User:", result.user);
      alert("OTP Verified Successfully!");
    } catch (err) {
      console.log(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center px-6 pt-24 bg-[#fff] min-h-screen text-black">
      <div className="w-full bg-[#f2f3f5] bg-[rgba(0,0,0,.3)] max-w-xs text-center p-8">
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(val) => setPhone("+" + val)}
          className="max-w-full"
          inputStyle={{
            width: "100%",
            height: "35px",
            fontSize: "12px",
          }}
          buttonStyle={{
            border: "1px solid gray",
          }}
        />

        <Button
          onClick={sendOtp}
          sx={{ marginTop: "10px" }}
          variant="contained"
        >
          Send OTP
        </Button>

        <div id="recaptcha-container" className="mt-3"></div>

        <TextField
          onChange={(e) => setOtp(e.target.value)}
          size="small"
          id="outlined basic"
          variant="outlined"
          sx={{
            marginTop: "10px",
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          }}
          label="Enter OTP"
        />

        <Button
          onClick={verifyOtp}
          variant="contained"
          color="success"
          sx={{ marginTop: "10px" }}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};
