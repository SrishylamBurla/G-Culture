import { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const toastId = toast.loading("Creating your account...");

    try {
      await API.post("/auth/register", { name, email, password });

      toast.success("Account created successfully!", { id: toastId });

      // Auto login after registration
      await dispatch(loginUser({ email, password })).unwrap();

      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        id: toastId,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  /** Google Login Micro-animation */
  const googleAnimation = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-[#001424] 
        bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')]
        px-4 pt-[5rem]
      "
    >
      {/* PAGE LOADING OVERLAY */}
      {btnLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="fixed inset-0 bg-black z-[999] backdrop-blur-sm"
        />
      )}

      {/* CARD WRAPPER */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          w-full max-w-sm p-8 rounded-xs
          bg-white/10 backdrop-blur-xl shadow-xl 
          border border-white/10 relative z-[1000]
        "
      >
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6 tracking-wide">
          Create Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* FULL NAME */}
          <TextField
            label="Full Name"
            type="text"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "white",
                background: "rgba(0,0,0,0.25)",
                borderRadius: "1px",
                marginBottom: "18px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                "&:hover fieldset": { borderColor: "yellow" },
                "&.Mui-focused fieldset": { borderColor: "yellow" },
              },
            }}
          />

          {/* EMAIL */}
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "white",
                background: "rgba(0,0,0,0.25)",
                borderRadius: "1px",
                marginBottom: "18px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                "&:hover fieldset": { borderColor: "yellow" },
                "&.Mui-focused fieldset": { borderColor: "yellow" },
              },
            }}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            type={showPass ? "text" : "password"}
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((prev) => !prev)}>
                    {showPass ? <VisibilityOff sx={{ color: "#ccc" }} /> : <Visibility sx={{ color: "#ccc" }} />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                color: "white",
                background: "rgba(0,0,0,0.25)",
                borderRadius: "1px",
                marginBottom: "18px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                "&:hover fieldset": { borderColor: "yellow" },
                "&.Mui-focused fieldset": { borderColor: "yellow" },
              },
            }}
          />

          {/* REGISTER BUTTON */}
          <motion.div whileHover={{ scale: !btnLoading ? 1.03 : 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={btnLoading}
              sx={{
                py: 1.5,
                fontWeight: "600",
                background: "linear-gradient(to right, #facc15, #f59e0b)",
                color: "black",
                "&:hover": {
                  background: "linear-gradient(to right, #fbbf24, #d97706)",
                },
              }}
            >
              {btnLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress size={20} sx={{ color: "black" }} />
                  Creating...
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </motion.div>

          {/* GOOGLE LOGIN */}
          <motion.div
            variants={googleAnimation}
            whileTap="tap"
            whileHover="hover"
            className="mt-3"
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.2,
                borderColor: "yellow",
                color: "yellow",
                gap: 1.5,
                "&:hover": { borderColor: "#facc15", bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              <Google sx={{ color: "#facc15" }} />
              Continue with Google
            </Button>
          </motion.div>
          <motion.div
            variants={googleAnimation}
            whileTap="tap"
            whileHover="hover"
          >
          <Link to={'/phone-login'}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.2,
                borderColor: "yellow",
                color: "yellow",
                gap: 1.5,
                "&:hover": {
                  borderColor: "#facc15",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <Google sx={{ color: "#facc15" }} />
              Continue with Phone
            </Button></Link>
          </motion.div>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
