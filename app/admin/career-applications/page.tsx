"use client";

import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type CareerApp = {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  cvUrl: string;
  portfolio: string;
  message: string;
  availability: string;
  createdAt?: { seconds: number };
};

export default function CareerApplications() {
  const [applications, setApplications] = useState<CareerApp[]>([]);
  const [filteredApps, setFilteredApps] = useState<CareerApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<CareerApp | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    { startDate: undefined, endDate: undefined, key: "selection" },
  ]);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close date picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch career applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(
          collection(db, "careerApplications"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const apps: CareerApp[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CareerApp[];
        setApplications(apps);
        setFilteredApps(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = applications;

    // Search
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(lower) ||
          app.jobTitle.toLowerCase().includes(lower) ||
          app.phone.includes(searchTerm) ||
          app.availability.toLowerCase().includes(lower)
      );
    }

    // Date filter
    const { startDate, endDate } = dateRange[0];
    if (startDate && endDate) {
      filtered = filtered.filter((app) => {
        if (!app.createdAt) return false;
        const appDate = new Date(app.createdAt.seconds * 1000);
        return appDate >= startDate && appDate <= endDate;
      });
    }

    // Job filter
    if (selectedJob !== "") {
      filtered = filtered.filter((app) => app.jobTitle === selectedJob);
    }

    setFilteredApps(filtered);
  }, [applications, searchTerm, selectedJob, dateRange]);

  const jobTitles = [...new Set(applications.map((app) => app.jobTitle))];

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-semibold mb-6">Career Applications</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by name, position, phone or availability..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-[500px] focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <div className="flex gap-3 items-center">
          {/* 📅 Date */}
          <div className="relative" ref={dateRef}>
            <div
              className="appearance-none w-52 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {dateRange[0].startDate
                ? dateRange[0].endDate
                  ? `${dateRange[0].startDate.toDateString()} → ${dateRange[0].endDate.toDateString()}`
                  : dateRange[0].startDate.toDateString()
                : "Filter by Date"}
            </div>

            {open && (
              <div className="absolute z-50 mt-1 bg-white shadow-lg rounded-lg">
                <DateRange
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  onChange={(item) => {
                    const { startDate, endDate } = item.selection;
                    setDateRange([
                      {
                        startDate: startDate ?? undefined,
                        endDate: endDate ?? startDate ?? undefined,
                        key: "selection",
                      },
                    ]);
                  }}
                />
              </div>
            )}
          </div>

          {/* 🎯 Job Title */}
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none"
          >
            <option value="">All Job Titles</option>
            {jobTitles.map((title, idx) => (
              <option key={idx} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredApps.length === 0 ? (
        <p>No matching applications found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-left">CV</th>
                <th className="p-3 text-left">Portfolio</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.phone}</td>
                  <td className="p-3">{app.jobTitle}</td>
                  <td className="p-3 capitalize">{app.availability}</td>
                  <td className="p-3">
                    {app.cvUrl ? (
                      <a href={app.cvUrl} target="_blank" className="text-blue-500 underline">
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3">
                    {app.portfolio ? (
                      <a href={app.portfolio} target="_blank" className="text-blue-500 underline">
                        Visit
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3">
  {app.createdAt
    ? new Date(app.createdAt.seconds * 1000).toLocaleDateString()
    : "—"}
</td>

                  <td className="p-3 max-w-[200px] truncate text-ellipsis overflow-hidden line-clamp-2">
                    {app.message}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 h-[90%] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4">Application Details</h2>
            <div className="space-y-3">
              <p><strong>Position:</strong> {selectedApp.jobTitle}</p>
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Availability:</strong> {selectedApp.availability}</p>
              <p>
                <strong>CV:</strong>{" "}
                {selectedApp.cvUrl ? (
                  <a href={selectedApp.cvUrl} target="_blank" className="text-blue-500 underline">
                    View CV
                  </a>
                ) : (
                  "—"
                )}
              </p>
              <p>
                <strong>Portfolio:</strong>{" "}
                {selectedApp.portfolio ? (
                  <a
                    href={selectedApp.portfolio}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Visit
                  </a>
                ) : (
                  "—"
                )}
              </p>
             <p>
  <strong>Date:</strong>{" "}
  {selectedApp.createdAt
    ? new Date(selectedApp.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—"}
</p>


              <p className="whitespace-pre-wrap">
                <strong>Message:</strong>
                <br />
                {selectedApp.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
