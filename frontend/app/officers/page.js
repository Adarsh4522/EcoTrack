
"use client";

import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

const officersData = [
  {
    id: "OFF001",
    name: "Rahul Sharma",
    email: "rahul.sharma@ecotrack.com",
    state: "Punjab",
    district: "Ludhiana",
    phone: "+91 98765 43210",
    assigned: 24,
    resolved: 18,
    status: "Active",
  },
  {
    id: "OFF002",
    name: "Priya Verma",
    email: "priya.verma@ecotrack.com",
    state: "Haryana",
    district: "Karnal",
    phone: "+91 98765 12340",
    assigned: 18,
    resolved: 15,
    status: "Active",
  },
  {
    id: "OFF003",
    name: "Amit Kumar",
    email: "amit.kumar@ecotrack.com",
    state: "Uttar Pradesh",
    district: "Meerut",
    phone: "+91 98765 67890",
    assigned: 21,
    resolved: 12,
    status: "Active",
  },
  {
    id: "OFF004",
    name: "Neha Singh",
    email: "neha.singh@ecotrack.com",
    state: "Rajasthan",
    district: "Jaipur",
    phone: "+91 98765 24680",
    assigned: 15,
    resolved: 10,
    status: "Inactive",
  },
  {
    id: "OFF005",
    name: "Vikram Patel",
    email: "vikram.patel@ecotrack.com",
    state: "Madhya Pradesh",
    district: "Bhopal",
    phone: "+91 98765 13579",
    assigned: 19,
    resolved: 16,
    status: "Active",
  },
  {
    id: "OFF006",
    name: "Anjali Gupta",
    email: "anjali.gupta@ecotrack.com",
    state: "Uttarakhand",
    district: "Dehradun",
    phone: "+91 98765 11223",
    assigned: 12,
    resolved: 8,
    status: "Pending",
  },
];

export default function OfficersPage() {
  const [officers, setOfficers] = useState(officersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  const activeCount = officers.filter(
    (officer) => officer.status === "Active"
  ).length;

  const pendingCount = officers.filter(
    (officer) => officer.status === "Pending"
  ).length;

  const totalAssigned = officers.reduce(
    (total, officer) => total + officer.assigned,
    0
  );

  const filteredOfficers = useMemo(() => {
    return officers.filter((officer) => {
      const matchesSearch =
        officer.name.toLowerCase().includes(search.toLowerCase()) ||
        officer.id.toLowerCase().includes(search.toLowerCase()) ||
        officer.district.toLowerCase().includes(search.toLowerCase()) ||
        officer.state.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || officer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [officers, search, statusFilter]);

  const updateStatus = (id, newStatus) => {
    setOfficers((previous) =>
      previous.map((officer) =>
        officer.id === id
          ? { ...officer, status: newStatus }
          : officer
      )
    );

    setSelectedOfficer(null);
  };

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-green-100 text-green-800";
    }

    if (status === "Inactive") {
      return "bg-red-100 text-red-700";
    }

    return "bg-amber-100 text-amber-800";
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f1f0e5] text-[#294936]">
      <Sidebar />

      <main className="min-h-screen p-5 md:ml-64 md:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-[#718575]">
              EcoTrack / Management
            </p>

            <h1 className="text-3xl font-bold text-[#294936]">
              Officers
            </h1>

            <p className="mt-2 text-sm text-[#718575]">
              Manage district officers and monitor their performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e5ecdd] px-4 py-3 text-sm font-semibold text-[#315c45]">
              <span className="mr-2">●</span>
              Officer Management
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Officers"
            value={officers.length}
            icon="👥"
            description="Registered district officers"
          />

          <SummaryCard
            title="Active Officers"
            value={activeCount}
            icon="✓"
            description="Currently active"
          />

          <SummaryCard
            title="Pending Approval"
            value={pendingCount}
            icon="⏳"
            description="Awaiting verification"
          />

          <SummaryCard
            title="Assigned Incidents"
            value={totalAssigned}
            icon="📋"
            description="Across all officers"
          />
        </div>

        {/* Officer Table */}
        <section className="rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-5 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#294936]">
                District Officers
              </h2>
              <p className="mt-1 text-sm text-[#718575]">
                View and manage registered officers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search name, ID or district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#d9dfd3] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#315c45] sm:w-64"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#d9dfd3] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#315c45]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-[#e4e3d7] text-xs uppercase tracking-wider text-[#718575]">
                  <th className="px-4 py-4">Officer</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-4 py-4">Incidents</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOfficers.map((officer) => (
                  <tr
                    key={officer.id}
                    className="border-b border-[#eeece2] transition hover:bg-[#f2f3e9]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5ecdd] font-bold text-[#315c45]">
                          {getInitials(officer.name)}
                        </div>

                        <div>
                          <p className="font-semibold text-[#294936]">
                            {officer.name}
                          </p>
                          <p className="text-xs text-[#829083]">
                            {officer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-medium">
                        {officer.district}
                      </p>
                      <p className="text-xs text-[#829083]">
                        {officer.state}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm">{officer.email}</p>
                      <p className="mt-1 text-xs text-[#829083]">
                        {officer.phone}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold">
                        {officer.assigned} assigned
                      </p>
                      <p className="mt-1 text-xs text-[#718575]">
                        {officer.resolved} resolved
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          officer.status
                        )}`}
                      >
                        {officer.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedOfficer(officer)}
                        className="rounded-lg bg-[#e5ecdd] px-4 py-2 text-sm font-semibold text-[#315c45] transition hover:bg-[#d5e1d0]"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOfficers.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-semibold text-[#294936]">
                  No officers found
                </p>
                <p className="mt-1 text-sm text-[#829083]">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 border-t border-[#e4e3d7] pt-4 text-sm text-[#718575]">
            Showing {filteredOfficers.length} of {officers.length} officers
          </div>
        </section>

        {/* Officer Details Modal */}
        {selectedOfficer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedOfficer(null)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-[#f9f7ed] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#294936]">
                  Officer Details
                </h2>

                <button
                  onClick={() => setSelectedOfficer(null)}
                  className="text-2xl text-[#718575] hover:text-[#294936]"
                >
                  ×
                </button>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5ecdd] text-xl font-bold text-[#315c45]">
                  {getInitials(selectedOfficer.name)}
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    {selectedOfficer.name}
                  </h3>
                  <p className="text-sm text-[#718575]">
                    {selectedOfficer.id}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      selectedOfficer.status
                    )}`}
                  >
                    {selectedOfficer.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4 rounded-xl bg-[#f1f0e5] p-4">
                <Detail label="Email" value={selectedOfficer.email} />
                <Detail label="Phone" value={selectedOfficer.phone} />
                <Detail
                  label="District"
                  value={`${selectedOfficer.district}, ${selectedOfficer.state}`}
                />
                <Detail
                  label="Assigned Incidents"
                  value={selectedOfficer.assigned}
                />
                <Detail
                  label="Resolved Incidents"
                  value={selectedOfficer.resolved}
                />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-[#294936]">
                  Manage Officer Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Active", "Inactive", "Pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateStatus(selectedOfficer.id, status)
                      }
                      disabled={selectedOfficer.status === status}
                      className="rounded-lg border border-[#d9dfd3] px-4 py-2 text-sm font-semibold text-[#315c45] transition hover:bg-[#e5ecdd] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[#829083]">
          © 2026 EcoTrack. Satellite-Based Environmental Monitoring System.
        </p>
      </main>
    </div>
  );
}

function SummaryCard({ title, value, icon, description }) {
  return (
    <div className="rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-[#718575]">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5ecdd] text-lg text-[#315c45]">
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-bold text-[#294936]">{value}</h3>

      <p className="mt-2 text-xs text-[#829083]">{description}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row">
      <span className="text-sm text-[#718575]">{label}</span>
      <span className="break-all text-sm font-semibold text-[#294936] sm:text-right">
        {value}
      </span>
    </div>
  );
}
