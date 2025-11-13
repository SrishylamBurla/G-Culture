import { useState } from "react";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Welcome back! 🎉", { id: toastId });
      setTimeout(() => navigate("/"), 800);
    } catch {
      toast.error("Invalid email or password", { id: toastId });
    } finally {
      setBtnLoading(false);
    }
  };

  /** Google Login Micro-animation */
  const googleAnimation = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
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
      {/* DARK OVERLAY WHEN LOADING */}
      {btnLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="fixed inset-0 bg-black z-[999] backdrop-blur-sm"
        />
      )}

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          w-full max-w-sm p-8 rounded-xs
          bg-white/10 backdrop-blur-xl shadow-xl 
          border border-white/10 relative z-[1000]
        "
      >
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6 tracking-wide">
          Welcome Back
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL FIELD */}
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
                background: "rgba(255,255,255,0.08)",
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

          {/* PASSWORD FIELD WITH TOGGLE */}
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
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <VisibilityOff sx={{ color: "#ccc" }} />
                    ) : (
                      <Visibility sx={{ color: "#ccc" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                color: "white",
                background: "rgba(255,255,255,0.08)",
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

          {/* LOGIN BUTTON */}
          <motion.div whileHover={{ scale: !btnLoading ? 1.03 : 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={btnLoading}
              sx={{
                py: 1.5,
                fontWeight: "600",
                background:
                  "linear-gradient(to right, #facc15, #f59e0b)",
                color: "black",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #fbbf24, #d97706)",
                },
              }}
            >
              {btnLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress size={20} sx={{ color: "black" }} />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </motion.div>

          {/* GOOGLE LOGIN BUTTON */}
          <motion.div
            variants={googleAnimation}
            whileTap="tap"
            whileHover="hover"
          >
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
              Continue with Google
            </Button>
          </motion.div>
        </form>

        {/* FOOTER NAV */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
