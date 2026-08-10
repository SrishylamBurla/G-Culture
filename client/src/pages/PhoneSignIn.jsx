import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/setup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";

export const PhoneSignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const sendOtp = async () => {
    if (!phone || phone.length < 5) return;
    try {
      setSendingOtp(true);
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!confirmationResult) return alert("Please send OTP first");
      setVerifyingOtp(true);
      const result = await confirmationResult.confirm(otp);
      console.log("Logged In User:", result.user);
      alert("OTP Verified Successfully!");
    } catch (err) {
      console.log(err);
      alert("Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050507] px-4 pt-28 md:pt-32 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to Login */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 hover:text-[#d4af37] transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          Back to Login
        </Link>

        {/* Card */}
        <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-5">
              <Phone size={22} className="text-[#d4af37]" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
              Account
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Phone Sign In
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              We'll send a verification code to your number
            </p>
          </div>

          <div className="space-y-5">
            {/* Phone Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                Phone Number
              </label>
              <div className="phone-input-gold">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(val) => setPhone("+" + val)}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    fontSize: "14px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    paddingLeft: "52px",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "12px 0 0 12px",
                    borderRight: "none",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#0a0a0c",
                    border: "1px solid rgba(212,175,55,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  searchStyle={{
                    backgroundColor: "#0a0a0c",
                    color: "#fff",
                    border: "1px solid rgba(212,175,55,0.1)",
                  }}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={sendOtp}
              disabled={sendingOtp || !phone}
              className={`w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                sendingOtp || !phone
                  ? "bg-[#d4af37]/20 text-[#d4af37]/40 cursor-not-allowed"
                  : "bg-[#d4af37] text-black hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20"
              }`}
            >
              {sendingOtp ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>

            <div id="recaptcha-container" />

            {/* OTP Section — shows after OTP is sent */}
            {confirmationResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 pt-2"
              >
                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-[10px] uppercase tracking-wider text-gray-600">
                    Enter verification code
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                    OTP Code
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                      <ShieldCheck size={16} />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200 tracking-[0.3em] text-center"
                    />
                  </div>
                </div>

                {/* Verify Button */}
                <button
                  onClick={verifyOtp}
                  disabled={verifyingOtp || otp.length < 4}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    verifyingOtp || otp.length < 4
                      ? "bg-green-500/20 text-green-400/40 cursor-not-allowed"
                      : "bg-green-500 text-black hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20"
                  }`}
                >
                  {verifyingOtp ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Want to use email instead?{" "}
            <Link
              to="/login"
              className="text-[#d4af37] hover:text-[#c09b33] font-medium transition-colors duration-200"
            >
              Email Login
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Custom styles for react-phone-input-2 */}
      <style>{`
        .phone-input-gold .react-tel-input .flag-dropdown:hover,
        .phone-input-gold .react-tel-input .flag-dropdown.open {
          background: rgba(212,175,55,0.05) !important;
        }
        .phone-input-gold .react-tel-input .selected-flag:hover,
        .phone-input-gold .react-tel-input .selected-flag:focus {
          background: rgba(212,175,55,0.05) !important;
        }
        .phone-input-gold .react-tel-input .country-list .country:hover {
          background: rgba(212,175,55,0.1) !important;
        }
        .phone-input-gold .react-tel-input .country-list .country.highlight {
          background: rgba(212,175,55,0.15) !important;
        }
        .phone-input-gold .react-tel-input input:focus {
          border-color: rgba(212,175,55,0.3) !important;
          box-shadow: none !important;
        }
      `}</style>
    </section>
  );
};
