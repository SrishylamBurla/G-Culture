import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from "../features/user/userApi";
import { setCredentials } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating your account...");
    try {
      await register({ name, email, password }).unwrap();
      toast.success("Account created successfully!", { id: toastId });

      const loginData = await login({ email, password }).unwrap();
      dispatch(setCredentials(loginData));

      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Registration failed";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050507] px-4 pt-28 md:pt-32 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-[1000]"
      >
        {/* Card */}
        <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
              Account
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Join the G-Culture family
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <Lock size={16} />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#d4af37]/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 mt-2 ${
                isLoading
                  ? "bg-[#d4af37]/30 text-[#d4af37]/50 cursor-not-allowed"
                  : "bg-[#d4af37] text-black hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] uppercase tracking-wider text-gray-600">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 border border-[#d4af37]/10 rounded-xl text-sm font-medium text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>

              {/* Phone */}
              <Link to="/phone-login" className="block">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-[#d4af37]/10 rounded-xl text-sm font-medium text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all duration-200"
                >
                  <Phone size={15} />
                  Phone
                </button>
              </Link>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#d4af37] hover:text-[#c09b33] font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
