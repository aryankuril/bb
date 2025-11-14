"use client";

import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ChevronDown } from "lucide-react"; // 🔹 for dropdown arrows

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
  role?: string; // Added optional role field
};

export default function CareerApplications() {
  const [applications, setApplications] = useState<CareerApp[]>([]);
  const [filteredApps, setFilteredApps] = useState<CareerApp[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
const appsPerPage = 10;

const indexOfLast = currentPage * appsPerPage;
const indexOfFirst = indexOfLast - appsPerPage;
const currentApps = filteredApps.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(filteredApps.length / appsPerPage);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) setCurrentPage(page);
};


  const [dateRange, setDateRange] = useState<Range[]>([
    { startDate: undefined, endDate: undefined, key: "selection" },
  ]);
 const today = new Date();
    const [exportRange, setExportRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: "export",
    },
  ]);

  const [showExportRange, setShowExportRange] = useState(false);
  const [viewApp, setViewApp] = useState<CareerApp | null>(null); // 🔹 for View popup
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

  // Fetch applications
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
    const { startDate, endDate } = dateRange[0];

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

    if (startDate && endDate) {
      filtered = filtered.filter((app) => {
        if (!app.createdAt) return false;
        const appDate = new Date(app.createdAt.seconds * 1000);
        return appDate >= startDate && appDate <= endDate;
      });
    }

    if (selectedJob !== "") {
      filtered = filtered.filter((app) => app.jobTitle === selectedJob);
    }

    setFilteredApps(filtered);
  }, [applications, searchTerm, selectedJob, dateRange]);

  const jobTitles = [...new Set(applications.map((app) => app.jobTitle))];

  // 🔹 Export CSV by inline date range
  const handleExportCSV = () => {
    const { startDate, endDate } = exportRange[0];
    if (!startDate || !endDate) {
      alert("Please select a date range to export CSV.");
      return;
    }

    const filtered = applications.filter((app) => {
      if (!app.createdAt) return false;
      const appDate = new Date(app.createdAt.seconds * 1000);
      return appDate >= startDate && appDate <= endDate;
    });

    if (filtered.length === 0) {
      alert("No applications found for the selected date range.");
      return;
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        [
          "Name",
          "Email",
          "Phone",
          "Job Title",
          "Availability",
          "CV URL",
          "Portfolio",
          "Message",
          "Date",
        ].join(","),
        ...filtered.map((app) =>
          [
            `"${app.name}"`,
            `"${app.email}"`,
            `"${app.phone}"`,
            `"${app.jobTitle}"`,
            `"${app.availability}"`,
            `"${app.cvUrl}"`,
            `"${app.portfolio}"`,
            `"${app.message?.replace(/\n/g, " ")}"`,
            `"${app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : "—"}"`,
          ].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `career_applications_${startDate.toLocaleDateString()}_to_${endDate.toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" relative">
      <h3 className="text-2xl font-semibold mb-6">Career Applications</h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by name, position, phone or availability..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-[500px] focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          {/* 📅 Date Filter */}
          <div className="relative" ref={dateRef}>
            <div
              className="appearance-none w-52 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none cursor-pointer flex justify-between items-center"
              onClick={() => setOpen(!open)}
            >
              <span>
                {dateRange[0].startDate
                  ? dateRange[0].endDate
                    ? `${dateRange[0].startDate.toDateString()} → ${dateRange[0].endDate.toDateString()}`
                    : dateRange[0].startDate.toDateString()
                  : "Filter by Date"}
              </span>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>

            {open && (
              <div className="absolute z-50 mt-1 bg-white shadow-lg rounded-lg">
                <DateRange
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  onChange={(item) => {
                    if (item.selection) {
                      const { startDate, endDate } = item.selection;
                      setDateRange([
                        {
                          startDate: startDate ?? undefined,
                          endDate: endDate ?? startDate ?? undefined,
                          key: "selection",
                        },
                        
                      ]);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* 🎯 Job Filter */}
          <div className="relative">
  <select
    value={selectedJob}
    onChange={(e) => setSelectedJob(e.target.value)}
    className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 w-60 focus:outline-none cursor-pointer"
  >
    <option value="">All Job Titles</option>
    {jobTitles.map((title, idx) => (
      <option key={idx} value={title}>
        {title}
      </option>
    ))}
  </select>
  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-600 pointer-events-none" />
</div>


          {/* 📤 Export CSV Inline */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowExportRange(!showExportRange)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Export CSV
            </button>

            {showExportRange && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50"
    onClick={() => setShowExportRange(false)}
  >
    <div
      className="bg-white shadow-lg border rounded-lg p-4 w-auto relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="font-semibold mb-3 text-center">
        Select Date Range to Export CSV
      </h4>

      {/* Centered Date Range Picker */}
      <div className="flex justify-center items-center w-full">
         <DateRange
        editableDateInputs
        moveRangeOnFirstSelection={false}
        ranges={exportRange}
        onChange={(ranges) => {
          const selection = ranges.export || ranges.selection;
          if (selection) {
            setExportRange([
              {
                startDate: selection.startDate ?? today,
                endDate: selection.endDate ?? selection.startDate ?? today,
                key: "export",
              },
            ]);
          }
        }}
      />
      </div>

      <div className="flex gap-3 mt-4 w-full">
        <button
          onClick={handleExportCSV}
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Export
        </button>
        <button
          onClick={() => setShowExportRange(false)}
          className="flex-1 text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredApps.length === 0 ? (
        <p>No matching applications found.</p>
      ) : (
<div className="overflow-x-auto overflow-y-auto max-h-[75vh] border rounded-lg shadow">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-left">CV</th>
                <th className="p-3 text-left">Portfolio</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody >
              {currentApps.map((app) => (
                <tr key={app.id} className="border-t ">
                  <td className="p-3 capitalize">{app.name}</td>
                  <td className="p-3 capitalize">
  <div className="flex flex-col">
    <a
      href={`mailto:${app.email}`}
      className="underline text-blue-500 hover:text-blue-700"
    >
      {app.email}
    </a>

    <a
      href={`tel:${app.phone}`}
      className="underline text-blue-500 hover:text-blue-700 mt-1"
    >
      {app.phone}
    </a>
  </div>
</td>

                  <td className="p-3 capitalize">{app.jobTitle}</td>
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
                  <td className="p-3 capitalize" >
                    {app.portfolio ? (
                      <a href={app.portfolio} target="_blank" className="text-blue-500 underline">
                        Visit
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 capitalize">
                    {app.createdAt
                      ? new Date(app.createdAt.seconds * 1000).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 max-w-[200px] truncate capitalize">{app.message}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setViewApp(app)}
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 capitalize"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center items-center mt-4 gap-2 py-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1 ? "bg-gray-800 text-white" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

        </div>       
      )}

      {/* 🔹 Popup Modal for View */}
      {viewApp && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setViewApp(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-[50%] h-auto max-h-[90%]  p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Application Details</h2>

            <div className="space-y-2 text-sm ">
              <p className="capitalize"><strong>Name:</strong> {viewApp.name}</p>
              <p >
  <strong>Email:</strong>{" "}
  <a
    href={`mailto:${viewApp.email}`}
    className="text-blue-600 hover:underline"
  >
    {viewApp.email}
  </a>
</p>

<p>
  <strong>Phone:</strong>{" "}
  <a
    href={`tel:${viewApp.phone}`}
    className="text-blue-600 hover:underline"
  >
    {viewApp.phone}
  </a>
</p>

              <p className="capitalize"><strong>Job Title:</strong> {viewApp.jobTitle}</p>
              <p className="capitalize"><strong>Availability:</strong> {viewApp.availability}</p>
              <p className="capitalize"><strong>Date:</strong> {viewApp.createdAt ? new Date(viewApp.createdAt.seconds * 1000).toLocaleDateString() : "—"}</p>
              <p>
                <strong>CV:</strong>{" "}
                {viewApp.cvUrl ? (
                  <a href={viewApp.cvUrl} target="_blank" className="text-blue-600 underline">
                    Open CV
                  </a>
                ) : (
                  "—"
                )}
              </p>
              <p>
                <strong>Portfolio:</strong>{" "}
                {viewApp.portfolio ? (
                  <a href={viewApp.portfolio} target="_blank" className="text-blue-600 underline">
                    View Portfolio
                  </a>
                ) : (
                  "—"
                )}
              </p>
              <p className="capitalize"><strong>Message:</strong> {viewApp.message || "—"}</p>
            </div>

            <button
              onClick={() => setViewApp(null)}
              className="mt-5 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
