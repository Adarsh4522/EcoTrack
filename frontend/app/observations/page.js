
"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

const observations = [
  {
    id: "OBS001",
    location: "Ludhiana, Punjab",
    category: "Crop Burning",
    satellite: "VIIRS",
    date: "18 Nov 2026",
    confidence: "High",
    status: "Pending Review",
  },
  {
    id: "OBS002",
    location: "Karnal, Haryana",
    category: "Crop Burning",
    satellite: "MODIS",
    date: "18 Nov 2026",
    confidence: "Medium",
    status: "Assigned",
  },
  {
    id: "OBS003",
    location: "Jaipur, Rajasthan",
    category: "Unclassified",
    satellite: "VIIRS",
    date: "17 Nov 2026",
    confidence: "Low",
    status: "Pending Review",
  },
  {
    id: "OBS004",
    location: "Bhopal, Madhya Pradesh",
    category: "Forest Fire",
    satellite: "MODIS",
    date: "17 Nov 2026",
    confidence: "High",
    status: "Under Investigation",
  },
  {
    id: "OBS005",
    location: "Meerut, Uttar Pradesh",
    category: "Crop Burning",
    satellite: "VIIRS",
    date: "16 Nov 2026",
    confidence: "Medium",
    status: "Pending Review",
  },
  {
    id: "OBS006",
    location: "Dehradun, Uttarakhand",
    category: "Forest Fire",
    satellite: "VIIRS",
    date: "16 Nov 2026",
    confidence: "High",
    status: "Assigned",
  },
];

function StatusBadge({ status }) {
  const styles = {
    "Pending Review": "bg-amber-100 text-amber-800",
    Assigned: "bg-blue-100 text-blue-800",
    "Under Investigation": "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function ConfidenceBadge({ confidence }) {
  const styles = {
    High: "bg-green-100 text-green-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[confidence] || "bg-gray-100 text-gray-600"
      }`}
    >
      {confidence}
    </span>
  );
}

export default function ObservationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredObservations = observations.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f1f0e5] text-[#294936]">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 md:ml-64 md:p-8">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#294936]">
              Satellite Observations
            </h2>

            <p className="mt-1 text-sm text-[#718071]">
              Explore and review satellite-based thermal anomaly detections.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e3e4d7] bg-[#f9f7ed] p-5 shadow-sm">
              <p className="text-sm text-[#718071]">
                Total Observations
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#294936]">
                2,486
              </h3>
            </div>

            <div className="rounded-xl border border-[#e3e4d7] bg-[#f9f7ed] p-5 shadow-sm">
              <p className="text-sm text-[#718071]">
                Pending Review
              </p>
              <h3 className="mt-2 text-2xl font-bold text-amber-700">
                186
              </h3>
            </div>

            <div className="rounded-xl border border-[#e3e4d7] bg-[#f9f7ed] p-5 shadow-sm">
              <p className="text-sm text-[#718071]">
                High Confidence
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#315c45]">
                742
              </h3>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-xl border border-[#e3e4d7] bg-[#f9f7ed] p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-[#294936]">
              Search and Filter Observations
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-[#718071]">
                  Search Location or ID
                </label>

                <input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#d9dfd2] bg-white p-3 text-sm outline-none transition focus:border-[#315c45] focus:ring-2 focus:ring-[#315c45]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#718071]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[#d9dfd2] bg-white p-3 text-sm outline-none transition focus:border-[#315c45]"
                >
                  <option value="All">All Categories</option>
                  <option value="Crop Burning">Crop Burning</option>
                  <option value="Forest Fire">Forest Fire</option>
                  <option value="Unclassified">Unclassified</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#718071]">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-[#d9dfd2] bg-white p-3 text-sm outline-none transition focus:border-[#315c45]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Under Investigation">
                    Under Investigation
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Observations Table */}
          <div className="overflow-hidden rounded-xl border border-[#e3e4d7] bg-[#f9f7ed] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e4d7] p-5">
              <div>
                <h3 className="font-semibold text-[#294936]">
                  Observation Records
                </h3>

                <p className="mt-1 text-xs text-[#718071]">
                  {filteredObservations.length} records displayed
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-[#e5ecdd] text-[#526b55]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Observation ID
                    </th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Satellite</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Confidence</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#e9e8dc]">
                  {filteredObservations.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#f0f2e8]"
                    >
                      <td className="px-5 py-4 font-semibold text-[#315c45]">
                        {item.id}
                      </td>

                      <td className="px-5 py-4 text-[#4f6252]">
                        {item.location}
                      </td>

                      <td className="px-5 py-4 text-[#4f6252]">
                        {item.category}
                      </td>

                      <td className="px-5 py-4 text-[#4f6252]">
                        {item.satellite}
                      </td>

                      <td className="px-5 py-4 text-[#4f6252]">
                        {item.date}
                      </td>

                      <td className="px-5 py-4">
                        <ConfidenceBadge confidence={item.confidence} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}

                  {filteredObservations.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-5 py-10 text-center text-[#718071]"
                      >
                        No observations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Information Note */}
          <div className="mt-5 rounded-xl border border-amber-200 bg-[#fff8e7] p-4">
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>Important:</strong> Satellite observations represent
              possible thermal anomalies. They should not be treated as
              confirmed crop burning or forest fires without verification.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
 