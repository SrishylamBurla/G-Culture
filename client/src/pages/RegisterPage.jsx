import { useState } from "react";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from "../features/user/userApi";
import { setCredentials } from "../features/user/userSlice"; // <- use the action your slice actually exports
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // small animation object used for Google / Phone buttons
  const googleAnimation = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating your account...");
    try {
      // 1) Register
      await register({ name, email, password }).unwrap();

      toast.success("Account created successfully!", { id: toastId });

      // 2) Auto-login
      const loginData = await login({ email, password }).unwrap();

      // 3) Save to redux + localStorage through your slice action
      dispatch(setCredentials(loginData));

      // 4) Redirect
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      // RTK Query errors can be in err.data or err.error — handle both
      const message =
        err?.data?.message || err?.error || "Registration failed";
      toast.error(message, { id: toastId });
    }
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
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="fixed inset-0 bg-black z-[999] backdrop-blur-sm"
        />
      )}

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
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
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
                  <IconButton onClick={() => setShowPass((p) => !p)}>
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

          <motion.div whileHover={{ scale: !isLoading ? 1.03 : 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
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
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress size={20} sx={{ color: "black" }} />
                  Creating...
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </motion.div>

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

          <motion.div variants={googleAnimation} whileTap="tap" whileHover="hover">
            <Link to={"/phone-login"}>
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
              </Button>
            </Link>
          </motion.div>
        </form>

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
