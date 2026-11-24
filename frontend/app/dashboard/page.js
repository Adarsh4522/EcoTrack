'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';




function StatCard({ item }) {
  return (
    <div className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold text-[#71816c]'>{item.title}</p>

        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5ecdd] text-xl text-[#315c45]'>
          {item.icon}
        </div>
      </div>

      <h2 className='mt-5 text-3xl font-bold text-[#294936]'>{item.value}</h2>

      <div className='mt-3 flex flex-wrap items-center gap-2'>
        <span className='rounded-full bg-[#e5ecdd] px-2.5 py-1 text-xs font-bold text-[#315c45]'>
          {item.change}
        </span>

        <span className='text-xs text-[#929b87]'>{item.note}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {

  const [observations, setObservations] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('ecotrack_token');

        if (!token) {
          setError('Authentication token not found.');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [observationResponse, incidentResponse] =
          await Promise.all([
            fetch('http://localhost:5000/api/observations', {
              method: 'GET',
              headers,
            }),
            fetch('http://localhost:5000/api/incidents', {
              method: 'GET',
              headers,
            }),
          ]);

        const observationResult = await observationResponse.json();
        const incidentResult = await incidentResponse.json();

        if (!observationResponse.ok || !observationResult.success) {
          throw new Error(
            observationResult.message || 'Unable to fetch observations.'
          );
        }

        if (!incidentResponse.ok || !incidentResult.success) {
          throw new Error(
            incidentResult.message || 'Unable to fetch incidents.'
          );
        }

        const observationList = Array.isArray(observationResult.data)
          ? observationResult.data
          : observationResult.data?.observations || [];

        const incidentList = Array.isArray(incidentResult.data)
          ? incidentResult.data
          : incidentResult.data?.incidents || [];

        setObservations(observationList);
        setIncidents(incidentList);
      } catch (err) {
        console.error('Dashboard API error:', err);
        setError(err.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pendingCount = incidents.filter(
    (incident) => incident.status === 'PENDING_REVIEW'
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === 'RESOLVED'
  ).length;

  const stateCounts = incidents.reduce((acc, incident) => {
  const stateName = incident.state?.trim();

  if (!stateName) return acc;

  acc[stateName] = (acc[stateName] || 0) + 1;
  return acc;
}, {});

const states = Object.entries(stateCounts)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count);

const maxStateCount = Math.max(
  ...states.map((state) => state.count),
  1
);

const activities = [...incidents]
  .sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt) -
      new Date(a.updatedAt || a.createdAt)
  )
  .slice(0, 5)
  .map((incident) => {
    const statusLabels = {
      NEW_OBSERVATION: 'New',
      PENDING_REVIEW: 'Pending Review',
      ASSIGNED: 'Assigned',
      UNDER_INVESTIGATION: 'Investigating',
      RESOLVED: 'Resolved',
      DISMISSED: 'Dismissed',
    };

    const titles = {
      NEW_OBSERVATION: 'New incident recorded',
      PENDING_REVIEW: 'Incident pending review',
      ASSIGNED: 'Incident assigned to field officer',
      UNDER_INVESTIGATION: 'Incident under investigation',
      RESOLVED: 'Incident resolution recorded',
      DISMISSED: 'Incident dismissed',
    };

    return {
      title: titles[incident.status] || 'Incident status updated',
      location: `${incident.district}, ${incident.state}`,
      time: new Date(
        incident.updatedAt || incident.createdAt
      ).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: statusLabels[incident.status] || incident.status,
      incidentId: incident.incidentId,
    };
  });

  const stats = [
    {
      title: 'Total Observations',
      value: loading ? '...' : observations.length.toLocaleString('en-IN'),
      change: 'Live',
      note: 'Database observations',
      icon: '◉',
    },
    {
      title: 'Total Incidents',
      value: loading ? '...' : incidents.length.toLocaleString('en-IN'),
      change: 'Live',
      note: 'Recorded incidents',
      icon: '◎',
    },
    {
      title: 'Pending Review',
      value: loading ? '...' : pendingCount.toLocaleString('en-IN'),
      change: 'Live',
      note: 'Awaiting verification',
      icon: '◷',
    },
    {
      title: 'Resolved Incidents',
      value: loading ? '...' : resolvedCount.toLocaleString('en-IN'),
      change: 'Live',
      note: 'Resolved records',
      icon: '✓',
    },
  ];

  return (
    <div className='min-h-screen bg-[#f1f0e5]'>
      {/* Separate Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className='min-h-screen lg:ml-64'>
        {/* Header */}
        <header className='sticky top-0 z-20 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-[#e1e2d4] bg-[#f9f7ed]/95 px-5 py-4 backdrop-blur-md sm:px-8'>
          <div>
            <h2 className='text-xl font-bold text-[#294936]'>Dashboard</h2>

            <p className='mt-1 text-xs text-[#82907b] sm:text-sm'>
              Environmental Fire Monitoring System
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <span className='hidden rounded-full bg-[#e5ecdd] px-4 py-2 text-xs font-semibold text-[#315c45] sm:block'>
              India Overview
            </span>

            <button className='rounded-xl border border-[#dce2d3] bg-[#f4f2e7] px-4 py-2.5 text-sm font-semibold text-[#52664f] transition hover:bg-[#e5ecdd]'>
              🔔 Notifications
            </button>
          </div>
        </header>

        <div className='space-y-8 p-5 sm:p-8'>
          {/* Welcome Section */}
          <section>
            <p className='text-xs font-bold uppercase tracking-[2px] text-[#a16d3f]'>
              National Overview
            </p>

            <h1 className='mt-2 text-2xl font-bold text-[#294936] sm:text-3xl'>
              Welcome to EcoTrack 🌿
            </h1>

            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#71816c]'>
              Monitor satellite observations and manage environmental fire
              incidents across India.
            </p>
          </section>

          {/* Statistics Cards */}
          <section className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            {stats.map((item) => (
              <StatCard
                key={item.title}
                item={item}
              />
            ))}
          </section>

          {/* Incident Status and Data Health */}
          <section className='grid gap-6 xl:grid-cols-3'>
            {/* Incident Status */}
            <div className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6 xl:col-span-2'>
              <div className='mb-7 flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <h3 className='font-bold text-[#294936]'>
                    Incident Status Overview
                  </h3>

                  <p className='mt-1 text-sm text-[#82907b]'>
                    Current distribution of incidents
                  </p>
                </div>

                <span className='rounded-lg bg-[#e8eddf] px-3 py-2 text-xs font-semibold text-[#52664f]'>
                  All India
                </span>
              </div>

              <div className='space-y-6'>
  {[
    {
      label: 'New Observation',
      status: 'NEW_OBSERVATION',
      color: 'bg-[#789b9a]',
    },
    {
      label: 'Pending Review',
      status: 'PENDING_REVIEW',
      color: 'bg-[#d5a34e]',
    },
    {
      label: 'Assigned',
      status: 'ASSIGNED',
      color: 'bg-[#789b9a]',
    },
    {
      label: 'Under Investigation',
      status: 'UNDER_INVESTIGATION',
      color: 'bg-[#c98251]',
    },
    {
      label: 'Resolved',
      status: 'RESOLVED',
      color: 'bg-[#477b53]',
    },
    {
      label: 'Dismissed',
      status: 'DISMISSED',
      color: 'bg-[#929b87]',
    },
  ].map((item) => {
    const count = incidents.filter(
      (incident) => incident.status === item.status
    ).length;

    const percent =
      incidents.length > 0
        ? Math.round((count / incidents.length) * 100)
        : 0;

    return (
      <div key={item.status}>
        <div className='mb-2 flex justify-between gap-3 text-sm'>
          <span className='font-semibold text-[#52664f]'>
            {item.label}
          </span>

          <span className='text-[#82907b]'>
            {loading ? '...' : `${count} (${percent}%)`}
          </span>
        </div>

        <div className='h-3 overflow-hidden rounded-full bg-[#e8eadd]'>
          <div
            className={`h-full rounded-full ${item.color}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  })}

              </div>
            </div>

            {/* Data Source Health */}
            <div className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6'>
              <h3 className='font-bold text-[#294936]'>Data Source Health</h3>

              <p className='mt-1 text-sm text-[#82907b]'>
                Satellite data connection status
              </p>

              <div className='mt-7 space-y-6'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-sm font-bold text-[#52664f]'>
                      NASA FIRMS
                    </p>
                    <p className='mt-1 text-xs text-[#929b87]'>
                      Satellite observations
                    </p>
                  </div>

                  <span className='rounded-full bg-[#f7edda] px-3 py-1.5 text-xs font-bold text-[#a16d3f]'>
                    Connected
                  </span>
                </div>

                <div className='h-px bg-[#e7e6da]' />

                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-sm font-bold text-[#52664f]'>
                      ISRO / NRSC
                    </p>
                    <p className='mt-1 text-xs text-[#929b87]'>
                      Official data source
                    </p>
                  </div>

                  <span className='rounded-full bg-[#eeeee5] px-3 py-1.5 text-xs font-semibold text-[#82907b]'>
                    Not connected
                  </span>
                </div>

                <div className='border-t border-[#e7e6da] pt-4'>
                  <p className='text-xs text-[#929b87]'>Last successful sync</p>

                  <p className='mt-1 text-sm font-bold text-[#52664f]'>
                    Sample data only
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* State Summary and Recent Activity */}
          <section className='grid gap-6 xl:grid-cols-2'>
            {/* State-wise Observations */}
            <div className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6'>
              <h3 className='font-bold text-[#294936]'>
                State-wise Incidents
              </h3>

              <p className='mt-1 text-sm text-[#82907b]'>
                Incident distribution across states
              </p>

              <div className='mt-7 space-y-6'>
  {loading ? (
    <p className='text-sm text-[#82907b]'>
      Loading state-wise data...
    </p>
  ) : states.length > 0 ? (
    states.map((state) => {
      const percent = Math.round(
        (state.count / maxStateCount) * 100
      );

      return (
        <div key={state.name}>
          <div className='mb-2 flex justify-between gap-3 text-sm'>
            <span className='font-semibold text-[#52664f]'>
              {state.name}
            </span>

            <span className='text-[#82907b]'>
              {state.count}
            </span>
          </div>

          <div className='h-2.5 overflow-hidden rounded-full bg-[#e8eadd]'>
            <div
              className='h-full rounded-full bg-[#58805b]'
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      );
    })
  ) : (
    <p className='text-sm text-[#82907b]'>
      No incident records available.
    </p>
  )}
  </div>
            </div>

            {/* Recent Activity */}
            <div className='rounded-2xl border border-[#e1e2d4] bg-[#f9f7ed] p-6'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <h3 className='font-bold text-[#294936]'>Recent Activity</h3>

                  <p className='mt-1 text-sm text-[#82907b]'>
                    Latest incident updates
                  </p>
                </div>

                <Link
                  href='/incidents'
                  className='text-sm font-bold text-[#477b53] hover:underline'
                >
                  View all →
                </Link>
              </div>

              <div className='mt-5 divide-y divide-[#e7e6da]'>
              {loading ? (
  <p className='text-sm text-[#82907b]'>
    Loading recent incidents...
  </p>
) : activities.length > 0 ? (
  activities.map((activity, index) => (
    <div
      key={activity.incidentId || index}
      className='flex items-start justify-between gap-4'
    >
      <div>
        <p className='text-sm font-semibold text-[#52664f]'>
          {activity.title}
        </p>

        <p className='mt-1 text-xs text-[#82907b]'>
          {activity.location}
        </p>

        <p className='mt-1 text-xs text-[#82907b]'>
          {activity.incidentId}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <p className='text-xs text-[#82907b]'>
          {activity.time}
        </p>

        <span className='mt-2 inline-block rounded-full bg-[#e8eadd] px-3 py-1 text-xs font-semibold text-[#52664f]'>
          {activity.status}
        </span>
      </div>
    </div>
  ))
) : (
  <p className='text-sm text-[#82907b]'>
    No recent incidents available.
  </p>
)} 
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className='border-t border-[#dedfce] pt-6 text-center text-xs text-[#929b87]'>
            EcoTrack © 2026 · Monitor. Detect. Respond. Protect.
          </footer>
        </div>
      </main>
    </div>
  );
}
