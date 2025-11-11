import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, updateAvatar } from "../features/user/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  // Safe default avatar
  const [preview, setPreview] = useState(userInfo?.avatar || "/images/avatar2.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setLoading(true);
      await dispatch(updateAvatar(formData)).unwrap();
      alert("Avatar updated successfully!");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="text-center mt-20 bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/green-gobbler.png')]">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Please log in to access your account 👤
        </h2>
        <Link
          to="/login"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/dark-exa.png')] pt-[5rem] -mt-[5rem]">
      <h2 className="text-3xl font-bold text-center text-gray-100 pt-16 uppercase mb-8">
        My Account
      </h2>

      <div className="max-w-3xl mx-auto shadow-md rounded-lg p-6 bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/football-no-lines.png')]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={preview || "/images/user-avatar.svg"}
              alt="User avatar"
              className="w-28 h-28 rounded-full object-cover border border-gray-300"
            />
            <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-800">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl text-gray-400 font-semibold">{userInfo.name}</h3>
            <p className="text-gray-400">{userInfo.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-2 py-1 bg-black border border-1px-solid text-white rounded hover:bg-gray-800"
            >
              Logout
            </button>

            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={loading}
                className={`mt-4 ml-3 px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Uploading..." : "Upload Avatar"}
              </button>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="grid sm:grid-cols-2 gap-4 text-center md:text-left">
          <Link
            to="/orders"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow"
          >
            <h4 className="font-medium mb-1 text-gray-200">My Orders</h4>
            <p className="text-sm text-gray-400">Track and view your orders.</p>
          </Link>
          <Link
            to="/wishlist"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow"
          >
            <h4 className="font-medium mb-1 text-gray-200">My Wishlist</h4>
            <p className="text-sm text-gray-400">See saved products you love.</p>
          </Link>
          <Link
            to="/settings"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow"
          >
            <h4 className="font-medium mb-1 text-gray-200">Account Settings</h4>
            <p className="text-sm text-gray-400">Update name, email, password.</p>
          </Link>
          <Link
            to="/addresses"
            className="block p-4 border border-gray-200 rounded-lg hover:shadow"
          >
            <h4 className="font-medium mb-1 text-gray-200">Saved Addresses</h4>
            <p className="text-sm text-gray-400">Manage delivery addresses.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
