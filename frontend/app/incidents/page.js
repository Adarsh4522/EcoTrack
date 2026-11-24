'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';



const statusOptions = [
  'All Status',
  'Pending Review',
  'Assigned',
  'Under Investigation',
  'Resolved',
  'Dismissed',
];

function StatusBadge({ status }) {
  const styles = {
    'Pending Review': 'bg-amber-100 text-amber-800',
    Assigned: 'bg-blue-100 text-blue-800',
    'Under Investigation': 'bg-orange-100 text-orange-800',
    Resolved: 'bg-green-100 text-green-800',
    Dismissed: 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}

function ConfidenceBadge({ confidence }) {
  const styles = {
    High: 'text-red-700 bg-red-50',
    Medium: 'text-amber-700 bg-amber-50',
    Low: 'text-green-700 bg-green-50',
  };

  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
        styles[confidence]
      }`}
    >
      {confidence}
    </span>
  );
}

export default function IncidentsPage() {
 const [incidents, setIncidents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('ecotrack_token');

      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch(
        'http://localhost:5000/api/incidents',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to fetch incidents.');
      }

      const incidentList = Array.isArray(result.data)
        ? result.data
        : result.data?.incidents || [];

      const statusLabels = {
        NEW_OBSERVATION: 'New',
        PENDING_REVIEW: 'Pending Review',
        ASSIGNED: 'Assigned',
        UNDER_INVESTIGATION: 'Under Investigation',
        RESOLVED: 'Resolved',
        DISMISSED: 'Dismissed',
      };

      const formattedIncidents = incidentList.map((incident) => {
        const reportedDate = new Date(incident.reportedAt || incident.createdAt);

        return {
          id: incident.incidentId,
          location: `${incident.district}, ${incident.state}`,
          district: incident.district,
          date: reportedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          time: reportedDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          source: 'Incident Database',
          confidence: 'Not Available',
          status: statusLabels[incident.status] || incident.status,
          officer: incident.assignedOfficerId
            ? 'Officer Assigned'
            : 'Not Assigned',
        };
      });

      setIncidents(formattedIncidents);
    } catch (err) {
      console.error('Incidents API error:', err);
      setError(err.message || 'Unable to load incidents.');
    } finally {
      setLoading(false);
    }
  };

  fetchIncidents();
}, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const searchMatch =
        incident.id.toLowerCase().includes(search.toLowerCase()) ||
        incident.location.toLowerCase().includes(search.toLowerCase()) ||
        incident.officer.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === 'All Status' || incident.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [incidents, search, statusFilter]);

  const counts = {
    total: incidents.length,
    pending: incidents.filter((item) => item.status === 'Pending Review')
      .length,
    investigating: incidents.filter(
      (item) => item.status === 'Under Investigation',
    ).length,
    resolved: incidents.filter((item) => item.status === 'Resolved').length,
  };

  function updateStatus(id, newStatus) {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === id
          ? {
              ...incident,
              status: newStatus,
            }
          : incident,
      ),
    );

    setSelectedIncident(null);
  }

  return (
    <div className='min-h-screen bg-[#f1f0e5]'>
      <Sidebar />

      <main className='min-h-screen lg:ml-64'>
        {/* Header */}
        <header className='sticky top-0 z-20 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-[#e1e2d4] bg-[#f9f7ed]/95 px-5 py-4 backdrop-blur-md sm:px-8'>
          <div>
            <h1 className='text-xl font-bold text-[#294936]'>
              Incident Management
            </h1>
            <p className='mt-1 text-xs text-[#82907b] sm:text-sm'>
              Review, assign and track fire incidents
            </p>
          </div>

          <Link
            href='/observations'
            className='rounded-xl bg-[#315c45] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#264a36]'
          >
            View Observations →
          </Link>
        </header>

        <div className='space-y-7 p-5 sm:p-8'>
          {/* Page Introduction */}
          <section>
            <p className='text-xs font-bold uppercase tracking-[2px] text-[#a16d3f]'>
              Incident Control Center
            </p>

            <h2 className='mt-2 text-2xl font-bold text-[#294936] sm:text-3xl'>
              Manage Fire Incidents
            </h2>

            <p className='mt-2 text-sm leading-6 text-[#71816c]'>
              Monitor detected incidents, review satellite observations and
              coordinate field response activities.
            </p>
          </section>

          {/* Statistics */}
          <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {[
              {
                title: 'Total Incidents',
                value: counts.total,
                icon: '▤',
                color: 'bg-[#e5ecdd]',
              },
              {
                title: 'Pending Review',
                value: counts.pending,
                icon: '◷',
                color: 'bg-amber-100',
              },
              {
                title: 'Under Investigation',
                value: counts.investigating,
                icon: '◎',
                color: 'bg-orange-100',
              },
              {
                title: 'Resolved Incidents',
                value: counts.resolved,
                icon: '✓',
                color: 'bg-green-100',
              },
            ].map((item) => (
              <div
                key={item.title}
                className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-5 shadow-sm'
              >
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold text-[#71816c]'>
                    {item.title}
                  </p>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl text-[#315c45] ${item.color}`}
                  >
                    {item.icon}
                  </div>
                </div>

                <h3 className='mt-4 text-3xl font-bold text-[#294936]'>
                  {item.value}
                </h3>
              </div>
            ))}
          </section>

          {/* Incident Table */}
          <section className='overflow-hidden rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] shadow-sm'>
            {/* Table Header */}
            <div className='flex flex-wrap items-center justify-between gap-4 border-b border-[#e7e6da] p-5 sm:p-6'>
              <div>
                <h3 className='font-bold text-[#294936]'>All Incidents</h3>
                <p className='mt-1 text-xs text-[#82907b]'>
                  View and manage reported fire incidents
                </p>
              </div>

              <span className='rounded-lg bg-[#e5ecdd] px-3 py-2 text-xs font-semibold text-[#315c45]'>
                {filteredIncidents.length} Records
              </span>
            </div>

            {/* Search and Filter */}
            <div className='flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:p-6'>
              <div className='relative flex-1'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#82907b]'>
                  ⌕
                </span>

                <input
                  type='text'
                  placeholder='Search ID, location or officer...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full rounded-xl border border-[#dce2d3] bg-[#f4f2e7] py-3 pl-10 pr-4 text-sm text-[#344e3c] outline-none transition focus:border-[#719263]'
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='rounded-xl border border-[#dce2d3] bg-[#f4f2e7] px-4 py-3 text-sm text-[#52664f] outline-none focus:border-[#719263]'
              >
                {statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Responsive Table */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[1000px] text-left'>
                <thead className='bg-[#e8eddf]'>
                  <tr className='text-xs uppercase tracking-wide text-[#71816c]'>
                    <th className='px-6 py-4 font-bold'>Incident ID</th>
                    <th className='px-6 py-4 font-bold'>Location</th>
                    <th className='px-6 py-4 font-bold'>Date & Time</th>
                    <th className='px-6 py-4 font-bold'>Confidence</th>
                    <th className='px-6 py-4 font-bold'>Assigned Officer</th>
                    <th className='px-6 py-4 font-bold'>Status</th>
                    <th className='px-6 py-4 font-bold'>Action</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-[#e7e6da]'>

                {loading && (
  <tr>
    <td colSpan='7' className='px-6 py-12 text-center text-sm text-[#82907b]'>
      Loading incidents...
    </td>
  </tr>
)}

{!loading && error && (
  <tr>
    <td colSpan='7' className='px-6 py-12 text-center text-sm text-red-600'>
      {error}
    </td>
  </tr>
)}

                  {filteredIncidents.map((incident) => (
                    <tr
                      key={incident.id}
                      className='transition hover:bg-[#f3f3e9]'
                    >
                      <td className='px-6 py-5'>
                        <span className='font-bold text-[#477b52]'>
                          {incident.id}
                        </span>
                        <p className='mt-1 text-xs text-[#929b87]'>
                          {incident.source}
                        </p>
                      </td>

                      <td className='px-6 py-5'>
                        <p className='text-sm font-semibold text-[#344e3c]'>
                          {incident.location}
                        </p>
                        <p className='mt-1 text-xs text-[#929b87]'>
                          {incident.district} District
                        </p>
                      </td>

                      <td className='px-6 py-5'>
                        <p className='text-sm text-[#52664f]'>
                          {incident.date}
                        </p>
                        <p className='mt-1 text-xs text-[#929b87]'>
                          {incident.time}
                        </p>
                      </td>

                      <td className='px-6 py-5'>
                        <ConfidenceBadge confidence={incident.confidence} />
                      </td>

                      <td className='px-6 py-5 text-sm text-[#52664f]'>
                        {incident.officer}
                      </td>

                      <td className='px-6 py-5'>
                        <StatusBadge status={incident.status} />
                      </td>

                      <td className='px-6 py-5'>
                        <button
                          onClick={() => setSelectedIncident(incident)}
                          className='rounded-lg border border-[#d5dfcd] bg-[#e8eddf] px-3 py-2 text-xs font-bold text-[#315c45] transition hover:bg-[#dce7d5]'
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!loading && !error && filteredIncidents.length === 0 && (
                    <tr>
                      <td
                        colSpan='7'
                        className='px-6 py-12 text-center text-sm text-[#82907b]'
                      >
                        No incidents found. Try changing your search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className='border-t border-[#e7e6da] px-6 py-4 text-xs text-[#929b87]'>
              Showing {filteredIncidents.length} of {incidents.length} incidents
            </div>
          </section>

          {/* Incident Workflow */}
          <section className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6'>
            <h3 className='font-bold text-[#294936]'>
              Incident Management Workflow
            </h3>

            <p className='mt-1 text-sm text-[#82907b]'>
              Track the progress of an incident through its lifecycle.
            </p>

            <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
              {[
                ['01', 'Pending Review', 'Newly detected incidents'],
                ['02', 'Assigned', 'Officer assigned'],
                ['03', 'Under Investigation', 'Field verification'],
                ['04', 'Resolved', 'Incident addressed'],
                ['05', 'Dismissed', 'False or invalid detection'],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className='rounded-xl border border-[#e4e6d8] bg-[#f4f2e7] p-4'
                >
                  <span className='text-xs font-bold text-[#a16d3f]'>
                    STEP {number}
                  </span>
                  <h4 className='mt-3 text-sm font-bold text-[#315c45]'>
                    {title}
                  </h4>
                  <p className='mt-1 text-xs leading-5 text-[#82907b]'>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className='border-t border-[#dedfce] pt-6 text-center text-xs text-[#929b87]'>
            EcoTrack © 2026 · Monitor. Detect. Respond. Protect.
          </footer>
        </div>
      </main>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
          onClick={() => setSelectedIncident(null)}
        >
          <div
            className='w-full max-w-lg rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='text-xs font-bold uppercase tracking-wider text-[#a16d3f]'>
                  Incident Details
                </p>
                <h3 className='mt-2 text-xl font-bold text-[#294936]'>
                  {selectedIncident.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedIncident(null)}
                className='rounded-lg px-3 py-1 text-xl text-[#71816c] hover:bg-[#e8eddf]'
                aria-label='Close details'
              >
                ×
              </button>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-5'>
              {[
                ['Location', selectedIncident.location],
                ['District', selectedIncident.district],
                ['Date', selectedIncident.date],
                ['Time', selectedIncident.time],
                ['Data Source', selectedIncident.source],
                ['Confidence', selectedIncident.confidence],
                ['Assigned Officer', selectedIncident.officer],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className='text-xs text-[#929b87]'>{label}</p>
                  <p className='mt-1 text-sm font-semibold text-[#344e3c]'>
                    {value}
                  </p>
                </div>
              ))}

              <div>
                <p className='text-xs text-[#929b87]'>Current Status</p>
                <div className='mt-2'>
                  <StatusBadge status={selectedIncident.status} />
                </div>
              </div>
            </div>

            <div className='mt-7 border-t border-[#e1e2d4] pt-5'>
              <label
                htmlFor='incident-status'
                className='mb-2 block text-sm font-bold text-[#344e3c]'
              >
                Update Incident Status
              </label>

              <select
                id='incident-status'
                value={selectedIncident.status}
                onChange={(e) =>
                  updateStatus(selectedIncident.id, e.target.value)
                }
                className='w-full rounded-xl border border-[#dce2d3] bg-[#f4f2e7] px-4 py-3 text-sm text-[#52664f] outline-none focus:border-[#719263]'
              >
                {statusOptions
                  .filter((status) => status !== 'All Status')
                  .map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
              </select>

              <p className='mt-2 text-xs text-[#929b87]'>
                This currently updates the page's local sample data only.
              </p>
            </div>

            <button
              onClick={() => setSelectedIncident(null)}
              className='mt-5 w-full rounded-xl bg-[#315c45] py-3 text-sm font-bold text-white hover:bg-[#264a36]'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
