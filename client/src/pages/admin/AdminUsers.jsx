import { useGetAllUsersQuery } from "../../features/user/userApi";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  console.log(users)

  const handleMakeAdmin = (user) => {
    toast.success(`${user.name} is now an Admin (mock only).`);
  };

  const handleDeleteUser = (user) => {
    if (!confirm("Delete this user?")) return;
    toast.error("Delete User API not implemented yet.");
  };

  return (
    <div className="bg-[#0e506f] h-screen">
      <h1 className="text-2xl font-bold p-2">Users</h1>

      {isLoading ? (
        <p>Loading Users...</p>
      ) : (
        <div className="shadow bg-[#0b3a52] p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-800">
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">#{u._id.slice(-6)}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    {u.isAdmin ? (
                      <span className="text-green-600 font-semibold">Admin</span>
                    ) : (
                      <span className="text-gray-600">User</span>
                    )}
                  </td>

                  <td className="p-3 space-x-4">
                    {!u.isAdmin && (
                      <button
                        onClick={() => handleMakeAdmin(u)}
                        className="text-blue-600 underline"
                      >
                        Make Admin
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteUser(u)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
