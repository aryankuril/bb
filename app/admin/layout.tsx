import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 min-h-screen bg-gray-50">
          <Topbar />
          <main className="p-6">{children}
              <Toaster position="top-right" />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
