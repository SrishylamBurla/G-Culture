// import { useGetUsersQuery } from "../../features/user/userApi";
// import { toast } from "react-hot-toast";
// import { useState } from "react";

// export default function AdminUsers() {
//   const { data: users = [], isLoading } = useGetUsersQuery();
//   console.log(users)

//   const handleMakeAdmin = (user) => {
//     toast.success(`${user.name} is now an Admin (mock only).`);
//   };

//   const handleDeleteUser = (user) => {
//     if (!confirm("Delete this user?")) return;
//     toast.error("Delete User API not implemented yet.");
//   };

//   return (
//     <div className="bg-[#0e506f] h-screen">
//       <h1 className="text-2xl font-bold p-2">Users</h1>

//       {isLoading ? (
//         <p>Loading Users...</p>
//       ) : (
//         <div className="shadow bg-[#0b3a52] p-4 overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b bg-gray-800">
//                 <th className="p-3">User ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((u) => (
//                 <tr key={u._id} className="border-b hover:bg-gray-600">
//                   <td className="p-3">#{u._id.slice(-6)}</td>
//                   <td className="p-3">{u.name}</td>
//                   <td className="p-3">{u.email}</td>
//                   <td className="p-3">
//                     {u.isAdmin ? (
//                       <span className="text-green-600 font-semibold">Admin</span>
//                     ) : (
//                       <span className="text-gray-600">User</span>
//                     )}
//                   </td>

//                   <td className="p-3 space-x-4">
//                     {!u.isAdmin && (
//                       <button
//                         onClick={() => handleMakeAdmin(u)}
//                         className="text-blue-600 underline"
//                       >
//                         Make Admin
//                       </button>
//                     )}

//                     <button
//                       onClick={() => handleDeleteUser(u)}
//                       className="text-red-500 underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleAdminMutation,
  useUpdateUserMutation,
} from "../../features/user/userApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleAdmin] = useToggleAdminMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  const handleToggleAdmin = async (id) => {
    try {
      await toggleAdmin(id).unwrap();
      toast.success("Role updated");
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-black">Users</h2>
      </div>

      <div className="bg-white rounded-sm shadow-md overflow-hidden">
        {isLoading ? (
          <p className="p-2 text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-600 text-gray-200 sticky top-0 shadow">
                <tr>
                  <th className="p-2 text-left font-medium">Name</th>
                  <th className="p-2 text-left font-medium">Email</th>
                  <th className="p-2 text-left font-medium">Role</th>
                  <th className="p-2 text-center font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-800">{u.name}</td>
                    <td className="p-3 text-gray-700">{u.email}</td>

                    <td className="p-3">
                      {u.isAdmin ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                          User
                        </span>
                      )}
                    </td>

                    <td className="p-3 gap-3 text-center">
                      <button
                        onClick={() => handleToggleAdmin(u._id)}
                        className="px-3 py-1 mr-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                      >
                        {u.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>

                      <button
                        onClick={() => setEditingUser(u)}
                        className="px-3 py-1 mr-2 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(u._id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
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

      {editingUser && (
        <EditUserPopup
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={updateUser}
        />
      )}
    </div>
  );
}

function EditUserPopup({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const submit = async () => {
    try {
      await onSave({ id: user._id, ...form }).unwrap();
      toast.success("User updated");
      onClose();
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Edit User</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Name</label>
          <input
            className="w-full border p-2 rounded text-gray-800"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            className="w-full border p-2 rounded text-gray-800"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
          />
          Make Admin
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
