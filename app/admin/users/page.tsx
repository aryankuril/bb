"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string | { seconds: number; nanoseconds: number }; // Firestore timestamp support
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: UserType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        }) as UserType[];
        setUsers(usersList);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle role change (admin ↔ user)
  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      toast.success(`Role updated to "${newRole}"`);
    } catch (error) {
      console.error(error);
      toast.error("Error updating role.");
    }
  };

  // Delete user
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Date Joined</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              // Convert Firestore timestamp to readable date
              let joinedDate = "—";
              if (user.createdAt) {
                if (typeof user.createdAt === "string") {
                  joinedDate = new Date(user.createdAt).toLocaleDateString();
                } else if ("seconds" in user.createdAt) {
                  joinedDate = new Date(
                    user.createdAt.seconds * 1000
                  ).toLocaleDateString();
                }
              }

              return (
                <tr key={user.id}>
                  <td className="px-6 py-3">{user.name || "—"}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{joinedDate}</td>
                  <td className="px-6 py-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
