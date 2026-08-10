import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Camera,
  Pencil,
  LogOut,
  Package,
  Heart,
  Lock,
  X,
  ChevronRight,
} from "lucide-react";

import {
  useUpdateAvatarMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
} from "../features/user/userApi";

import { logout, setCredentials } from "../features/user/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateName] = useUpdateNameMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const [preview, setPreview] = useState(
    userInfo?.avatar || "/images/avatar2.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [newName, setNewName] = useState(userInfo?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!selectedFile) return toast.error("Select an image first");
    const fd = new FormData();
    fd.append("avatar", selectedFile);
    const t = toast.loading("Updating avatar...");
    try {
      const updated = await updateAvatar(fd).unwrap();
      dispatch(setCredentials(updated));
      toast.success("Avatar updated", { id: t });
      setSelectedFile(null);
    } catch (err) {
      toast.error("Avatar update failed", { id: t });
    }
  };

  const saveProfile = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty");
    const t = toast.loading("Updating profile...");
    try {
      const updatedName = await updateName({ name: newName }).unwrap();
      dispatch(setCredentials(updatedName));
      if (currentPassword && newPassword) {
        await updatePassword({ currentPassword, newPassword }).unwrap();
      }
      toast.success("Profile updated", { id: t });
      setOpenProfileModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed", { id: t });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* ---------- NOT LOGGED IN ---------- */
  if (!userInfo) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-6">
          <User size={24} className="text-[#d4af37]" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          Please Login
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Sign in to access your profile.
        </p>
        <Link
          to="/login"
          className="bg-[#d4af37] text-black px-8 py-3 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-[#c09b33] transition-colors duration-200"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  /* ---------- PROFILE ---------- */
  return (
    <div className="min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Account
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white/[0.02] border border-[#d4af37]/10 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar */}
            <motion.div
              className="relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={preview}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-2 border-[#d4af37]/30 shadow-lg"
              />
              <label className="absolute bottom-1 right-1 p-2 bg-[#d4af37] text-black rounded-full cursor-pointer shadow-lg hover:bg-[#c09b33] transition-colors">
                <Camera size={14} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight">
                {userInfo.name}
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1.5">
                <Mail size={14} className="text-gray-500" />
                <p className="text-sm text-gray-400">{userInfo.email}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                {selectedFile && (
                  <button
                    onClick={uploadAvatar}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#d4af37] text-black rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#c09b33] transition-colors duration-200"
                  >
                    <Camera size={13} />
                    Save Avatar
                  </button>
                )}

                <button
                  onClick={() => setOpenProfileModal(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#d4af37]/30 text-[#d4af37] rounded-full text-xs font-medium uppercase tracking-wider hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 transition-all duration-200"
                >
                  <Pencil size={13} />
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-white/10 text-gray-400 rounded-full text-xs font-medium uppercase tracking-wider hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/orders"
            className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-[#d4af37]/10 rounded-lg hover:border-[#d4af37]/30 transition-all duration-200"
          >
            <div className="p-3 rounded-full bg-[#d4af37]/10">
              <Package size={20} className="text-[#d4af37]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-200 group-hover:text-[#d4af37] transition-colors">
                My Orders
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Track your purchases
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-600 group-hover:text-[#d4af37] transition-colors"
            />
          </Link>

          <Link
            to="/wishlist"
            className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-[#d4af37]/10 rounded-lg hover:border-[#d4af37]/30 transition-all duration-200"
          >
            <div className="p-3 rounded-full bg-[#d4af37]/10">
              <Heart size={20} className="text-[#d4af37]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-200 group-hover:text-[#d4af37] transition-colors">
                Wishlist
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">Your saved items</p>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-600 group-hover:text-[#d4af37] transition-colors"
            />
          </Link>
        </div>
      </div>

      {/* ========== UPDATE PROFILE MODAL ========== */}
      <AnimatePresence>
        {openProfileModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[99999] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a0a0c] border border-[#d4af37]/15 rounded-lg w-full max-w-md p-6 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
                  Update Profile
                </h3>
                <button
                  onClick={() => setOpenProfileModal(false)}
                  className="p-1.5 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 bg-white/[0.03] border border-[#d4af37]/10 rounded-lg px-4 py-3 focus-within:border-[#d4af37]/30 transition-colors">
                    <User size={15} className="text-gray-500" />
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-600"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Current Password */}
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Current Password
                  </label>
                  <div className="flex items-center gap-3 bg-white/[0.03] border border-[#d4af37]/10 rounded-lg px-4 py-3 focus-within:border-[#d4af37]/30 transition-colors">
                    <Lock size={15} className="text-gray-500" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-600"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    New Password
                  </label>
                  <div className="flex items-center gap-3 bg-white/[0.03] border border-[#d4af37]/10 rounded-lg px-4 py-3 focus-within:border-[#d4af37]/30 transition-colors">
                    <Lock size={15} className="text-gray-500" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-600"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setOpenProfileModal(false)}
                  className="flex-1 py-3 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="flex-1 py-3 bg-[#d4af37] text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#c09b33] transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
