"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [appCount, setAppCount] = useState<number>(0);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  // Fetch total application count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, "careerApplications"));
        setAppCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching application count:", error);
      }
    };

    fetchCount();
  }, []);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Blogs", icon: FileText, href: "/admin/blogs" },
    {
      label: "Careers",
      icon: Briefcase,
      href: "/admin/careers",
      children: [
        { label: "Add Careers", href: "/admin/careers" },
        { label: "Manage Applications", href: "/admin/career-applications" },
      ],
    },
    { label: "Users", icon: Users, href: "/admin/users" },
  ];

  return (
    <aside className="w-64 bg-black text-white h-screen fixed left-0 top-0 flex flex-col">
      <h3 className="p-4  font-bold border-b border-gray-800">
        Admin Panel
      </h3>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          // Careers dropdown
          if (item.children) {
            const isParentActive =
              pathname.startsWith("/admin/careers") || careerOpen;

            return (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => setCareerOpen(!careerOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isParentActive
                      ? "bg-[var(--color-highlight)] text-black"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {careerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {careerOpen && (
                  <div className="ml-8 space-y-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      const isApplications = child.label === "Applications";

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                            childActive
                              ? "bg-[var(--color-highlight)] text-black"
                              : "hover:bg-gray-800"
                          }`}
                        >
                          <span>{child.label}</span>

                          {/* 🔵 Application Count Badge */}
                          {isApplications && (
                            <span
                              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                                childActive
                                  ? "bg-black text-[var(--color-highlight)]"
                                  : "bg-[var(--color-highlight)] text-black"
                              }`}
                            >
                              {appCount}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Normal link
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active ? "bg-[var(--color-highlight)] text-black" : "hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => setConfirm(true)}
        className="m-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
      >
        <LogOut size={16} /> Logout
      </button>

      {/* Logout Confirmation Modal */}
      {confirm && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 text-center space-y-4">
            <p className="font-semibold">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
