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
  useUpdateUserMutation
} from "../../features/user/userApi";
import { useState } from "react";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleAdmin] = useToggleAdminMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUser, setEditingUser] = useState(null);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-[#0e506f] h-screen shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <table className="w-full text-left bg-[#0b3a52] text-gray-50">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                {u.isAdmin ? (
                  <span className="text-green-600">Admin</span>
                ) : (
                  <span className="text-gray-500">User</span>
                )}
              </td>

              <td className="p-2 space-x-2">
                {/* Make Admin / Remove Admin Button */}
                <button
                  onClick={() => toggleAdmin(u._id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  {u.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => setEditingUser(u)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteUser(u._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Popup */}
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
    await onSave({ id: user._id, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40">
      <div className="bg-white p-6 rounded-xl w-80 space-y-3 text-gray-800">
        <h3 className="text-lg font-bold">Edit User</h3>

        <input
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={(e) =>
              setForm({ ...form, isAdmin: e.target.checked })
            }
          />
          Make Admin
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1">Cancel</button>
          <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
