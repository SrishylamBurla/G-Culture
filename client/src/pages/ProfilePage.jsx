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
  ShieldCheck,
  Settings,
  Sparkles,
  ArrowUpRight,
  Eye,
  EyeOff,
  Upload,
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateName] = useUpdateNameMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const [preview, setPreview] = useState(
    userInfo?.avatar || "/images/avatar2.png",
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [newName, setNewName] = useState(userInfo?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  /* =========================================================
     AVATAR
  ========================================================= */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!selectedFile) {
      return toast.error("Select an image first");
    }

    const fd = new FormData();
    fd.append("avatar", selectedFile);

    const loadingToast = toast.loading("Updating profile image...");

    try {
      const updated = await updateAvatar(fd).unwrap();

      dispatch(setCredentials(updated));

      toast.success("Profile image updated", {
        id: loadingToast,
      });

      setSelectedFile(null);
    } catch (err) {
      toast.error(err?.data?.message || "Unable to update profile image", {
        id: loadingToast,
      });
    }
  };

  /* =========================================================
     PROFILE UPDATE
  ========================================================= */

  const saveProfile = async () => {
    if (!newName.trim()) {
      return toast.error("Name cannot be empty");
    }

    if (newPassword && !currentPassword) {
      return toast.error("Enter your current password first");
    }

    const loadingToast = toast.loading("Saving changes...");

    try {
      const updatedName = await updateName({
        name: newName.trim(),
      }).unwrap();

      dispatch(setCredentials(updatedName));

      if (currentPassword && newPassword) {
        await updatePassword({
          currentPassword,
          newPassword,
        }).unwrap();
      }

      toast.success("Profile updated successfully", {
        id: loadingToast,
      });

      setOpenProfileModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Unable to update profile", {
        id: loadingToast,
      });
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* =========================================================
     NOT LOGGED IN
  ========================================================= */

  if (!userInfo) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-6 text-center text-white">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.04] blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-sm"
        >
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.06]">
            <User size={28} strokeWidth={1.3} className="text-[#d4af37]" />
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/70">
            G-Culture Account
          </p>

          <h2 className="text-[30px] font-semibold tracking-tight">
            Welcome back.
          </h2>

          <p className="mt-3 text-[15px] leading-6 text-white/45">
            Sign in to access your profile, orders, wishlist and personal
            preferences.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition-all hover:bg-[#e2bd4c] active:scale-[0.97]"
          >
            Sign In
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] pb-24 pt-28 text-white md:pt-32">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.035] blur-[150px]" />

        <div className="absolute -left-40 top-[35%] h-[400px] w-[400px] rounded-full bg-white/[0.015] blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#d4af37]/[0.025] blur-[130px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={13} className="text-[#d4af37]/75" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/70">
              Personal Space
            </p>
          </div>

          <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] sm:text-[38px] md:text-[46px]">
            My Profile
          </h1>

          <p className="mt-3 max-w-xl text-[15px] leading-6 text-white/45">
            Manage your personal information, preferences and G-Culture account.
          </p>
        </motion.div>

        {/* ===================================================
            PROFILE HERO
        =================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.05,
          }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-[#d4af37]/[0.025] shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#d4af37]/[0.05] blur-[100px]" />

          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              {/* =================================================
                  AVATAR
              ================================================= */}

              <div className="flex shrink-0 justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-[5px] rounded-full bg-gradient-to-br from-[#d4af37]/80 via-[#d4af37]/10 to-transparent opacity-80" />

                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#09090b] bg-[#0b0b0d] shadow-[0_15px_50px_rgba(0,0,0,0.5)] sm:h-32 sm:w-32">
                    <img
                      src={preview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/40 bg-[#d4af37] text-black shadow-xl transition-all hover:scale-105 hover:bg-[#e3bf4f] active:scale-95">
                    <Camera size={16} strokeWidth={2} />

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* =================================================
                  USER INFO
              ================================================= */}

              <div className="min-w-0 flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-400/85">
                        Account Active
                      </span>
                    </div>

                    <h2 className="mt-2 break-words text-[28px] font-semibold tracking-tight sm:text-[32px]">
                      {userInfo.name}
                    </h2>

                    <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                      <Mail size={15} className="shrink-0 text-white/30" />

                      <span className="truncate text-[15px] text-white/50">
                        {userInfo.email}
                      </span>
                    </div>
                  </div>

                  {/* MEMBER BADGE */}

                  <div className="mt-5 md:mt-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/15 bg-[#d4af37]/[0.05] px-3.5 py-2">
                      <ShieldCheck size={14} className="text-[#d4af37]" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d4af37]/85">
                        G-Culture Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                  {selectedFile && (
                    <button
                      onClick={uploadAvatar}
                      className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#e2bd4c] active:scale-[0.97]"
                    >
                      <Upload size={14} />
                      Save Image
                    </button>
                  )}

                  <button
                    onClick={() => setOpenProfileModal(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70 transition-all hover:border-[#d4af37]/30 hover:bg-[#d4af37]/[0.05] hover:text-[#d4af37]"
                  >
                    <Pencil size={14} />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 transition-all hover:border-red-400/20 hover:bg-red-400/[0.03] hover:text-red-400"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-9 grid grid-cols-3 border-t border-white/[0.06] pt-7">
              <ProfileStat label="Orders" value="View" icon={Package} />

              <ProfileStat label="Wishlist" value="Saved" icon={Heart} border />

              <ProfileStat
                label="Security"
                value="Protected"
                icon={ShieldCheck}
                border
              />
            </div>
          </div>
        </motion.section>

        {/* ===================================================
            QUICK ACCESS
        =================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="mt-8"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Account
              </p>

              <h3 className="mt-1 text-[19px] font-medium text-white/90">
                Quick access
              </h3>
            </div>

            <Settings size={18} className="text-white/25" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PremiumLink
              to="/orders"
              icon={Package}
              eyebrow="Purchases"
              title="My Orders"
              description="Track, manage and review your purchases."
            />

            <PremiumLink
              to="/wishlist"
              icon={Heart}
              eyebrow="Collection"
              title="Wishlist"
              description="Your personally curated saved items."
            />
          </div>
        </motion.section>

        {/* ===================================================
            SECURITY
        =================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.22,
          }}
          className="mt-7"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#d4af37]/[0.025] blur-[70px]" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/10 bg-[#d4af37]/[0.05]">
                  <Lock size={18} className="text-[#d4af37]/80" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Security
                  </p>

                  <h3 className="mt-1 text-[17px] font-medium text-white/90">
                    Protect your account
                  </h3>

                  <p className="mt-1 text-[13px] leading-5 text-white/40">
                    Keep your password and personal information up to date.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenProfileModal(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/[0.1] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-all hover:border-[#d4af37]/30 hover:text-[#d4af37]"
              >
                Manage Security
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ===================================================
            FOOTER BRAND
        =================================================== */}

        <div className="mt-14 flex flex-col items-center">
          <div className="mb-4 h-px w-16 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

          <div className="flex items-center gap-2">
            <Sparkles size={11} className="text-[#d4af37]/35" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/25">
              G-Culture
            </span>

            <Sparkles size={11} className="text-[#d4af37]/35" />
          </div>

          <p className="mt-2 text-[11px] text-white/20">Wear your culture.</p>
        </div>
      </main>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {/* =====================================================
    LOGOUT CONFIRMATION MODAL
===================================================== */}

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#0a0a0c] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            >
              {/* Top accent */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent" />

              {/* Background glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-red-500/[0.035] blur-[70px]" />

              <div className="relative p-7 sm:p-8">
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.05]">
                    <LogOut
                      size={20}
                      strokeWidth={1.5}
                      className="text-red-400/80"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] text-white/25 transition-all hover:border-white/15 hover:text-white/70"
                    aria-label="Close logout confirmation"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-400/65">
                    Account Session
                  </p>

                  <h3 className="mt-2 text-[25px] font-semibold tracking-tight text-white">
                    Sign out of G-Culture?
                  </h3>

                  <p className="mt-3 text-[13px] leading-6 text-white/40">
                    Are you sure you want to logout from your G-Culture account?
                    You can sign back in anytime.
                  </p>
                </div>

                {/* User preview */}
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03]">
                    <img
                      src={preview}
                      alt={userInfo.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white/80">
                      {userInfo.name}
                    </p>

                    <p className="truncate text-[11px] text-white/30">
                      {userInfo.email}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 rounded-full border border-white/[0.08] py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45 transition-all hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                  >
                    Stay Logged In
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowLogoutModal(false);
                      handleLogout();
                    }}
                    className="flex-1 rounded-full border border-red-400/20 bg-red-400/[0.08] py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/[0.14] hover:text-red-300 active:scale-[0.98]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openProfileModal && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpenProfileModal(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              transition={{ duration: 0.25 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#0a0a0c] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4af37]/65">
                      Account Settings
                    </p>

                    <h3 className="mt-2 text-[25px] font-semibold tracking-tight">
                      Edit Profile
                    </h3>

                    <p className="mt-1.5 text-[13px] text-white/35">
                      Update your personal information.
                    </p>
                  </div>

                  <button
                    onClick={() => setOpenProfileModal(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/30 transition-all hover:border-white/20 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-8 space-y-5">
                  <PremiumInput label="Full Name" icon={User}>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/20"
                    />
                  </PremiumInput>

                  <PremiumInput label="Current Password" icon={Lock}>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Required to change password"
                      className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((value) => !value)}
                      className="text-white/25 transition-colors hover:text-white/60"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </PremiumInput>

                  <PremiumInput label="New Password" icon={ShieldCheck}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave empty to keep current password"
                      className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword((value) => !value)}
                      className="text-white/25 transition-colors hover:text-white/60"
                    >
                      {showNewPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </PremiumInput>
                </div>

                <div className="mt-5 flex gap-3 rounded-2xl border border-[#d4af37]/10 bg-[#d4af37]/[0.035] p-4">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[#d4af37]/60"
                  />

                  <p className="text-[12px] leading-5 text-white/35">
                    Your account information is kept private and is only used to
                    manage your G-Culture account.
                  </p>
                </div>

                <div className="mt-7 flex gap-3">
                  <button
                    onClick={() => setOpenProfileModal(false)}
                    className="flex-1 rounded-full border border-white/[0.08] py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 transition-all hover:border-white/20 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveProfile}
                    className="flex-[1.4] rounded-full bg-[#d4af37] py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-all hover:bg-[#e2bd4c] active:scale-[0.98]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   PROFILE STAT
========================================================= */

function ProfileStat({ label, value, icon: Icon, border = false }) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-1.5
        text-center
        ${border ? "border-l border-white/[0.06]" : ""}
      `}
    >
      <Icon size={15} strokeWidth={1.5} className="mb-0.5 text-[#d4af37]/65" />

      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
        {label}
      </p>

      <p className="text-[12px] text-white/35">{value}</p>
    </div>
  );
}

/* =========================================================
   PREMIUM LINK CARD
========================================================= */

function PremiumLink({ to, icon: Icon, eyebrow, title, description }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/20 hover:bg-[#d4af37]/[0.025] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#d4af37]/[0.04] blur-[50px] transition-all duration-500 group-hover:bg-[#d4af37]/[0.08]" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/10 bg-[#d4af37]/[0.05] transition-all duration-300 group-hover:border-[#d4af37]/25 group-hover:bg-[#d4af37]/[0.08]">
            <Icon size={18} strokeWidth={1.5} className="text-[#d4af37]/70" />
          </div>

          <ArrowUpRight
            size={17}
            className="text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d4af37]"
          />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
          {eyebrow}
        </p>

        <h4 className="mt-1.5 text-[19px] font-medium text-white/90 transition-colors group-hover:text-[#d4af37]">
          {title}
        </h4>

        <p className="mt-2 max-w-xs text-[13px] leading-5 text-white/40">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   PREMIUM INPUT
========================================================= */

function PremiumInput({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <div className="flex min-h-[54px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 transition-all duration-200 focus-within:border-[#d4af37]/30 focus-within:bg-[#d4af37]/[0.025]">
        <Icon size={17} strokeWidth={1.5} className="shrink-0 text-white/25" />

        <div className="flex min-w-0 flex-1 items-center">{children}</div>
      </div>
    </div>
  );
}
