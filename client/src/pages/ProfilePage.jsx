// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import { TextField } from "@mui/material";

// // RTK QUERY MUTATIONS
// import {
//   useUpdateAvatarMutation,
//   useUpdateNameMutation,
//   useUpdatePasswordMutation,
// } from "../features/user/userApi";

// // FIXED IMPORT
// import { logout, setCredentials } from "../features/user/userSlice";

// export default function ProfilePage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.user);

//   const [updateAvatar] = useUpdateAvatarMutation();
//   const [updateName] = useUpdateNameMutation();
//   const [updatePassword] = useUpdatePasswordMutation();

//   const [preview, setPreview] = useState(userInfo?.avatar || "/images/avatar2.png");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [openNameModal, setOpenNameModal] = useState(false);
//   const [openPasswordModal, setOpenPasswordModal] = useState(false);

//   const [newName, setNewName] = useState(userInfo?.name || "");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPass, setNewPass] = useState("");

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   // AVATAR UPLOAD
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("avatar", selectedFile);

//     const toastId = toast.loading("Uploading avatar...");

//     try {
//       setLoading(true);

//       const updatedUser = await updateAvatar(formData).unwrap();

//       // FIXED: update global state
//       dispatch(setCredentials(updatedUser));

//       toast.success("Avatar updated 🎉", { id: toastId });

//       // animation
//       const img = document.getElementById("avatar-img");
//       img.classList.add("animate-ping-once");
//       setTimeout(() => img.classList.remove("animate-ping-once"), 600);

//       setSelectedFile(null);
//     } catch (err) {
//       toast.error(err?.data?.message || "Avatar update failed", { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UPDATE NAME
//   const saveName = async () => {
//     if (!newName.trim()) return toast.error("Name cannot be empty.");

//     const toastId = toast.loading("Updating name...");
//     try {
//       const updatedUser = await updateName({ name: newName }).unwrap();

//       dispatch(setCredentials(updatedUser)); // FIXED

//       toast.success("Name updated 🎉", { id: toastId });
//       setOpenNameModal(false);
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update name", { id: toastId });
//     }
//   };

//   // UPDATE PASSWORD
//   const savePassword = async () => {
//     if (!currentPassword || !newPass)
//       return toast.error("All fields are required.");

//     const toastId = toast.loading("Updating password...");
//     try {
//       await updatePassword({
//         currentPassword,
//         newPassword: newPass,
//       }).unwrap();

//       toast.success("Password updated successfully 🔐", { id: toastId });

//       setOpenPasswordModal(false);
//       setCurrentPassword("");
//       setNewPass("");
//     } catch (err) {
//       toast.error(err?.data?.message || "Password update failed", { id: toastId });
//     }
//   };

//   if (!userInfo) {
//     return (
//       <div className="text-center mt-20">
//         <h2 className="text-xl font-semibold text-gray-400 mb-4">
//           Please log in to access your account 👤
//         </h2>
//         <Link
//           to="/login"
//           className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-10 pt-[9rem] -mt-[5rem]">
//       <h2 className="text-3xl font-bold text-center text-gray-800 pt-16 uppercase mb-8">
//         My Account
//       </h2>

//       <div className="max-w-3xl mx-auto shadow-md rounded-lg bg-amber-100 p-6">
//         <div className="flex flex-col md:flex-row items-center gap-6">

//           {/* AVATAR */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="relative"
//           >
//             <motion.img
//               id="avatar-img"
//               src={preview}
//               alt="User avatar"
//               className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-lg"
//               whileHover={{ scale: 1.05 }}
//             />

//             <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-800">
//               Edit
//               <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </label>
//           </motion.div>

//           {/* USER DETAILS */}
//           <div className="flex-1 text-center md:text-left">
//             <h3 className="text-xl text-gray-800 font-semibold">{userInfo.name}</h3>
//             <p className="text-gray-600">{userInfo.email}</p>

//             <button
//               onClick={handleLogout}
//               className="mt-4 px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
//             >
//               Logout
//             </button>

//             {selectedFile && (
//               <button
//                 onClick={handleUpload}
//                 disabled={loading}
//                 className={`mt-4 ml-3 px-4 py-2 rounded text-white ${
//                   loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//                 }`}
//               >
//                 {loading ? "Uploading..." : "Upload Avatar"}
//               </button>
//             )}

//             {/* EDIT BUTTONS */}
//             <div className="flex gap-3 mt-6 justify-center md:justify-start">
//               <button
//                 onClick={() => setOpenNameModal(true)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Edit Username
//               </button>

//               <button
//                 onClick={() => setOpenPasswordModal(true)}
//                 className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
//               >
//                 Change Password
//               </button>
//             </div>
//           </div>
//         </div>

//         <hr className="my-6 border-gray-700" />

//         {/* LINKS */}
//         <div className="grid sm:grid-cols-2 gap-4">
//           <Link to="/orders" className="p-4 border border-gray-700 rounded-lg hover:shadow">
//             <h4 className="font-medium text-gray-800">My Orders</h4>
//             <p className="text-sm text-gray-600">Track your orders.</p>
//           </Link>

//           <Link to="/wishlist" className="p-4 border border-gray-700 rounded-lg hover:shadow">
//             <h4 className="font-medium text-gray-800">Wishlist</h4>
//             <p className="text-sm text-gray-600">Saved items.</p>
//           </Link>
//         </div>
//       </div>

//       {/* NAME MODAL */}
//       <AnimatePresence>
//         {openNameModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[99999]"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
//               className="bg-[#0a1523] p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-white/10"
//             >
//               <h3 className="text-xl text-gray-100 mb-4">Update Username</h3>

//               <TextField
//                 fullWidth
//                 label="New Username"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 InputLabelProps={{ style: { color: "#ccc" } }}
//                 InputProps={{ style: { color: "white" } }}
//               />

//               <div className="flex gap-3 justify-end mt-6">
//                 <button onClick={() => setOpenNameModal(false)} className="px-3 py-1 bg-gray-600 text-white rounded">
//                   Cancel
//                 </button>
//                 <button onClick={saveName} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
//                   Save
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* PASSWORD MODAL */}
//       <AnimatePresence>
//         {openPasswordModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[99999]"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
//               className="bg-[#0a1523] p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-white/10"
//             >
//               <h3 className="text-xl text-gray-100 mb-4">Change Password</h3>

//               <TextField
//                 fullWidth
//                 type="password"
//                 label="Current Password"
//                 className="mb-4"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 InputLabelProps={{ style: { color: "#ccc" } }}
//                 InputProps={{ style: { color: "white" } }}
//               />

//               <TextField
//                 fullWidth
//                 type="password"
//                 label="New Password"
//                 value={newPass}
//                 onChange={(e) => setNewPass(e.target.value)}
//                 InputLabelProps={{ style: { color: "#ccc" } }}
//                 InputProps={{ style: { color: "white" } }}
//               />

//               <div className="flex gap-3 justify-end mt-6">
//                 <button onClick={() => setOpenPasswordModal(false)} className="px-3 py-1 bg-gray-600 text-white rounded">
//                   Cancel
//                 </button>
//                 <button onClick={savePassword} className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
//                   Update
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         .animate-ping-once {
//           animation: pingOnce 0.6s ease-out forwards;
//         }
//         @keyframes pingOnce {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//           100% { transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";

// RTK Query
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
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState(userInfo?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Avatar preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!selectedFile) return toast.error("Select an image first!");

    const fd = new FormData();
    fd.append("avatar", selectedFile);

    const t = toast.loading("Updating avatar...");
    try {
      const updated = await updateAvatar(fd).unwrap();
      dispatch(setCredentials(updated));

      toast.success("Avatar updated!", { id: t });
    } catch (err) {
      toast.error("Avatar update failed", { id: t });
    }
  };

  // Save Profile
  const saveProfile = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty.");
    const t = toast.loading("Updating profile...");

    try {
      // Update name
      const updatedName = await updateName({ name: newName }).unwrap();
      dispatch(setCredentials(updatedName));

      // Update password (if provided)
      if (currentPassword && newPassword) {
        await updatePassword({
          currentPassword,
          newPassword,
        }).unwrap();
      }

      toast.success("Profile updated successfully!", { id: t });
      setOpenProfileModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed", { id: t });
    }
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!userInfo) {
    return (
      <div className="text-center mt-32">
        <h2 className="text-2xl font-semibold text-gray-700">Please Login</h2>
        <Link
          className="bg-black text-white px-4 py-2 mt-4 inline-block rounded"
          to="/login"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 pt-[8rem] bg-gray-200 min-h-screen">
      {/* TITLE */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 tracking-wide mb-10">
        My Profile
      </h2>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-gray-600 shadow-xl rounded-sm p-8">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* AVATAR */}
          <motion.div
            className="relative w-32 h-32 group"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img
              src={preview}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-xl group-hover:scale-105 transition"
            />

            <label className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer shadow">
              Edit
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </motion.div>

          {/* DETAILS */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-200">
              {userInfo.name}
            </h3>
            <p className="text-gray-400 mt-1 text-xl">{userInfo.email}</p>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              {selectedFile && (
                <button
                  onClick={uploadAvatar}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Upload Avatar
                </button>
              )}

              <button
                onClick={() => setOpenProfileModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* QUICK LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            className="p-4 bg-gray-200 border rounded-sm hover:shadow-md transition"
            to="/orders"
          >
            <h4 className="text-lg font-semibold text-gray-800">My Orders</h4>
            <p className="text-sm text-gray-600">Track your purchases</p>
          </Link>

          <Link
            className="p-4 bg-gray-200 border rounded-sm hover:shadow-md transition"
            to="/wishlist"
          >
            <h4 className="text-lg font-semibold text-gray-800">Wishlist</h4>
            <p className="text-sm text-gray-600">Your saved items</p>
          </Link>
        </div>
      </div>

      {/* UPDATE PROFILE MODAL */}
      <AnimatePresence>
        {openProfileModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-6">Update Profile</h3>
              <div className="flex flex-col gap-4">
                {/* NAME */}
                <TextField
                  fullWidth
                  label="Full Name"
                  className="mb-4"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                {/* CURRENT PASSWORD */}
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  className="mb-4"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                {/* NEW PASSWORD */}
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpenProfileModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
