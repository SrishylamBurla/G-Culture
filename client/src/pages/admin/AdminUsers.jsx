import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleAdminMutation,
  useUpdateUserMutation,
} from "../../features/user/userApi";

import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  Users,
  ShieldCheck,
  ShieldOff,
  Pencil,
  Trash2,
  Search,
  X,
  Mail,
  User,
  Crown,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [toggleAdmin] = useToggleAdminMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================================================
     FILTER USERS
  ========================================================= */

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
    );
  });

  /* =========================================================
     COUNTS
  ========================================================= */

  const adminCount = users.filter(
    (user) => user.isAdmin
  ).length;

  const customerCount = users.filter(
    (user) => !user.isAdmin
  ).length;

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      await deleteUser(deletingUser._id).unwrap();

      toast.success("User deleted successfully");

      setDeletingUser(null);
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to delete user"
      );

      console.error(err);
    }
  };

  /* =========================================================
     TOGGLE ADMIN
  ========================================================= */

  const handleToggleAdmin = async (user) => {
    try {
      await toggleAdmin(user._id).unwrap();

      toast.success(
        user.isAdmin
          ? "Admin access removed"
          : "Admin access granted"
      );
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Failed to update user role"
      );

      console.error(err);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px] space-y-6">

          <div className="space-y-2">
            <div className="h-7 w-32 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-60 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="h-[500px] animate-pulse rounded-2xl bg-white shadow-sm" />

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111114]">

      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              G-Culture Admin
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage customers, administrators and account access.
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={16}
              strokeWidth={1.7}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search users..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-900/[0.04]"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-700"
              >
                <X size={15} />
              </button>
            )}

          </div>
        </div>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={Users}
            label="Total Users"
            value={users.length}
            description="Registered accounts"
          />

          <SummaryCard
            icon={User}
            label="Customers"
            value={customerCount}
            description="Standard accounts"
          />

          <SummaryCard
            icon={ShieldCheck}
            label="Administrators"
            value={adminCount}
            description="Privileged accounts"
          />

        </div>

        {/* =====================================================
            USER TABLE
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                All Users
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {filteredUsers.length}{" "}
                {filteredUsers.length === 1
                  ? "account"
                  : "accounts"}{" "}
                displayed
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Live
              </span>
            </div>

          </div>

          {/* ===================================================
              DESKTOP TABLE
          ==================================================== */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full min-w-[760px] text-left">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    User
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Email
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Role
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Account
                  </th>

                  <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredUsers.map((user) => (
                  <DesktopUserRow
                    key={user._id}
                    user={user}
                    onToggleAdmin={handleToggleAdmin}
                    onEdit={() =>
                      setEditingUser(user)
                    }
                    onDelete={() =>
                      setDeletingUser(user)
                    }
                  />
                ))}

              </tbody>

            </table>

          </div>

          {/* ===================================================
              MOBILE USERS
          ==================================================== */}

          <div className="divide-y divide-gray-100 md:hidden">

            {filteredUsers.map((user) => (
              <MobileUserCard
                key={user._id}
                user={user}
                onToggleAdmin={handleToggleAdmin}
                onEdit={() =>
                  setEditingUser(user)
                }
                onDelete={() =>
                  setDeletingUser(user)
                }
              />
            ))}

          </div>

          {/* ===================================================
              EMPTY STATE
          ==================================================== */}

          {filteredUsers.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                <Users
                  size={22}
                  className="text-gray-300"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-700">
                No users found
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                Try changing your search or check again later.
              </p>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-xs font-semibold text-gray-900 underline underline-offset-4"
                >
                  Clear search
                </button>
              )}

            </div>
          )}

        </section>

      </div>

      {/* =======================================================
          EDIT USER MODAL
      ======================================================== */}

      {editingUser && (
        <EditUserPopup
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={updateUser}
        />
      )}

      {/* =======================================================
          DELETE CONFIRMATION MODAL
      ======================================================== */}

      {deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}

/* =============================================================
   SUMMARY CARD
============================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
          <Icon
            size={18}
            strokeWidth={1.6}
            className="text-gray-700"
          />
        </div>

        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-300">
          G-Culture
        </span>

      </div>

      <div className="mt-5">

        <p className="text-xs font-medium text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
          {value}
        </p>

        <p className="mt-1 text-[11px] text-gray-400">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   DESKTOP USER ROW
============================================================= */

function DesktopUserRow({
  user,
  onToggleAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="group border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/70">

      {/* USER */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <UserAvatar user={user} />

          <div className="min-w-0">

            <p className="truncate text-sm font-medium text-gray-800">
              {user.name || "Unnamed User"}
            </p>

            <p className="mt-0.5 font-mono text-[10px] text-gray-400">
              ID #{user._id?.slice(-7)}
            </p>

          </div>

        </div>

      </td>

      {/* EMAIL */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-2">

          <Mail
            size={14}
            className="shrink-0 text-gray-300"
          />

          <span className="text-sm text-gray-600">
            {user.email}
          </span>

        </div>

      </td>

      {/* ROLE */}

      <td className="px-5 py-4">

        <RoleBadge isAdmin={user.isAdmin} />

      </td>

      {/* ACCOUNT */}

      <td className="px-5 py-4">

        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          Active

        </span>

      </td>

      {/* ACTIONS */}

      <td className="px-5 py-4">

        <div className="flex justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">

          <ActionButton
            icon={user.isAdmin ? ShieldOff : ShieldCheck}
            label={
              user.isAdmin
                ? "Remove admin"
                : "Make admin"
            }
            onClick={() =>
              onToggleAdmin(user)
            }
          />

          <ActionButton
            icon={Pencil}
            label="Edit user"
            onClick={onEdit}
          />

          <ActionButton
            icon={Trash2}
            label="Delete user"
            danger
            onClick={onDelete}
          />

        </div>

      </td>

    </tr>
  );
}

/* =============================================================
   MOBILE USER CARD
============================================================= */

function MobileUserCard({
  user,
  onToggleAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <div className="p-4">

      <div className="flex items-start gap-3">

        <UserAvatar user={user} />

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <p className="truncate text-sm font-medium text-gray-800">
                {user.name || "Unnamed User"}
              </p>

              <p className="mt-1 truncate text-xs text-gray-400">
                {user.email}
              </p>

            </div>

            <RoleBadge isAdmin={user.isAdmin} />

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>

            <div className="flex items-center gap-1">

              <MobileActionButton
                icon={
                  user.isAdmin
                    ? ShieldOff
                    : ShieldCheck
                }
                onClick={() =>
                  onToggleAdmin(user)
                }
              />

              <MobileActionButton
                icon={Pencil}
                onClick={onEdit}
              />

              <MobileActionButton
                icon={Trash2}
                danger
                onClick={onDelete}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =============================================================
   USER AVATAR
============================================================= */

function UserAvatar({ user }) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xs font-semibold text-gray-500">
          {initials}
        </span>
      )}

    </div>
  );
}

/* =============================================================
   ROLE BADGE
============================================================= */

function RoleBadge({ isAdmin }) {
  if (isAdmin) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600">

        <Crown size={10} />

        Admin

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-gray-500">

      <User size={10} />

      Customer

    </span>
  );
}

/* =============================================================
   ACTION BUTTON
============================================================= */

function ActionButton({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        border
        transition-all
        ${
          danger
            ? "border-red-100 bg-red-50 text-red-500 hover:border-red-200 hover:bg-red-100"
            : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        }
      `}
    >
      <Icon size={14} strokeWidth={1.7} />
    </button>
  );
}

/* =============================================================
   MOBILE ACTION BUTTON
============================================================= */

function MobileActionButton({
  icon: Icon,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        border
        ${
          danger
            ? "border-red-100 bg-red-50 text-red-500"
            : "border-gray-200 bg-white text-gray-400"
        }
      `}
    >
      <Icon size={14} strokeWidth={1.7} />
    </button>
  );
}

/* =============================================================
   EDIT USER MODAL
============================================================= */

function EditUserPopup({
  user,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    isAdmin: Boolean(user.isAdmin),
  });

  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        id: user._id,
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      }).unwrap();

      toast.success("User updated successfully");

      onClose();
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Failed to update user"
      );

      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
      onMouseDown={onClose}
    >

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* ACCENT */}

        <div className="absolute left-0 right-0 top-0 h-1 bg-[#111114]" />

        <div className="p-6 sm:p-7">

          {/* HEADER */}

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                User Management
              </p>

              <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900">
                Edit User
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Update account information and permissions.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-800"
            >
              <X size={16} />
            </button>

          </div>

          {/* FORM */}

          <div className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Name
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 transition-all focus-within:border-gray-400 focus-within:bg-white">

                <User
                  size={15}
                  className="text-gray-300"
                />

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                  placeholder="User name"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Email
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 transition-all focus-within:border-gray-400 focus-within:bg-white">

                <Mail
                  size={15}
                  className="text-gray-300"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                  placeholder="Email address"
                />

              </div>

            </div>

            {/* ADMIN ACCESS */}

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  isAdmin: !form.isAdmin,
                })
              }
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                form.isAdmin
                  ? "border-violet-200 bg-violet-50"
                  : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    form.isAdmin
                      ? "bg-violet-100 text-violet-600"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <ShieldCheck size={16} />
                </div>

                <div>

                  <p className="text-sm font-medium text-gray-800">
                    Administrator access
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    Allow access to the admin panel
                  </p>

                </div>

              </div>

              <div
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  form.isAdmin
                    ? "bg-violet-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    form.isAdmin
                      ? "translate-x-4"
                      : "translate-x-0.5"
                  }`}
                />
              </div>

            </button>

          </div>

          {/* ACTIONS */}

          <div className="mt-7 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="flex-[1.4] rounded-xl bg-[#111114] py-3 text-xs font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* =============================================================
   DELETE CONFIRMATION MODAL
============================================================= */

function DeleteUserModal({
  user,
  onClose,
  onConfirm,
}) {
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
      onMouseDown={onClose}
    >

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <div className="absolute left-0 right-0 top-0 h-1 bg-red-500" />

        <div className="p-6 sm:p-7">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle
                size={20}
                className="text-red-500"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              <X size={16} />
            </button>

          </div>

          <div className="mt-6">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500/70">
              Destructive Action
            </p>

            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900">
              Delete this user?
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-gray-500">
              This action cannot be undone. The user's
              account and associated access will be permanently
              removed.
            </p>

          </div>

          {/* USER */}

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">

            <UserAvatar user={user} />

            <div className="min-w-0">

              <p className="truncate text-sm font-medium text-gray-800">
                {user.name || "Unnamed User"}
              </p>

              <p className="truncate text-[11px] text-gray-400">
                {user.email}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleting}
              className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-semibold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete User"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}