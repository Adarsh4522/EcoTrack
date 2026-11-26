'use client';

import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';

const districtData = [
  {
    district: 'Ludhiana',
    state: 'Punjab',
    observations: 486,
    incidents: 124,
    resolved: 98,
  },
  {
    district: 'Karnal',
    state: 'Haryana',
    observations: 352,
    incidents: 86,
    resolved: 72,
  },
  {
    district: 'Jaipur',
    state: 'Rajasthan',
    observations: 298,
    incidents: 64,
    resolved: 48,
  },
  {
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    observations: 415,
    incidents: 91,
    resolved: 76,
  },
  {
    district: 'Meerut',
    state: 'Uttar Pradesh',
    observations: 526,
    incidents: 138,
    resolved: 112,
  },
  {
    district: 'Dehradun',
    state: 'Uttarakhand',
    observations: 214,
    incidents: 42,
    resolved: 35,
  },
];

const monthlyData = [
  { month: 'Jun', incidents: 45, resolved: 32 },
  { month: 'Jul', incidents: 68, resolved: 49 },
  { month: 'Aug', incidents: 82, resolved: 65 },
  { month: 'Sep', incidents: 105, resolved: 84 },
  { month: 'Oct', incidents: 142, resolved: 110 },
  { month: 'Nov', incidents: 186, resolved: 151 },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('All Time');
  const [search, setSearch] = useState('');

  const totals = useMemo(() => {
    return districtData.reduce(
      (acc, item) => ({
        observations: acc.observations + item.observations,
        incidents: acc.incidents + item.incidents,
        resolved: acc.resolved + item.resolved,
      }),
      { observations: 0, incidents: 0, resolved: 0 },
    );
  }, []);

  const pending = totals.incidents - totals.resolved;

  const filteredDistricts = districtData.filter((item) =>
    `${item.district} ${item.state}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const resolutionRate = Math.round((totals.resolved / totals.incidents) * 100);

  const downloadCSV = () => {
    const headers = [
      'District',
      'State',
      'Observations',
      'Total Incidents',
      'Resolved Incidents',
      'Pending Incidents',
    ];

    const rows = districtData.map((item) => [
      item.district,
      item.state,
      item.observations,
      item.incidents,
      item.resolved,
      item.incidents - item.resolved,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'ecotrack-district-report.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className='min-h-screen bg-[#f1f0e5] text-[#294936]'>
      <Sidebar />

      <main className='min-h-screen p-5 md:ml-64 md:p-8'>
        {/* Header */}
        <div className='mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
          <div>
            <p className='mb-1 text-sm font-medium text-[#718575]'>
              EcoTrack / Analytics
            </p>

            <h1 className='text-3xl font-bold text-[#294936]'>
              Reports & Analytics
            </h1>

            <p className='mt-2 text-sm text-[#718575]'>
              Monitor incidents, observations and district-wise performance.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className='rounded-xl border border-[#d9dfd3] bg-[#f9f7ed] px-4 py-3 text-sm font-medium outline-none focus:border-[#315c45]'
            >
              <option>All Time</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>

            <button
              onClick={downloadCSV}
              className='rounded-xl bg-[#315c45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#294936]'
            >
              ↓ Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          <SummaryCard
            title='Total Observations'
            value={totals.observations.toLocaleString()}
            icon='🛰️'
            description='Satellite detections'
          />

          <SummaryCard
            title='Total Incidents'
            value={totals.incidents.toLocaleString()}
            icon='🔥'
            description='Reported incidents'
          />

          <SummaryCard
            title='Resolved Incidents'
            value={totals.resolved.toLocaleString()}
            icon='✓'
            description='Successfully resolved'
          />

          <SummaryCard
            title='Pending Incidents'
            value={pending.toLocaleString()}
            icon='⏳'
            description='Awaiting action'
          />
        </div>

        {/* Resolution Rate */}
        <section className='mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-6 lg:col-span-1'>
            <h2 className='text-lg font-bold'>Resolution Rate</h2>
            <p className='mt-1 text-sm text-[#718575]'>
              Overall incident resolution progress
            </p>

            <div className='my-7 flex items-center justify-center'>
              <div
                className='flex h-40 w-40 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(#315c45 ${resolutionRate}%, #e5ecdd 0)`,
                }}
              >
                <div className='flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#f9f7ed]'>
                  <span className='text-3xl font-bold text-[#315c45]'>
                    {resolutionRate}%
                  </span>
                  <span className='text-xs text-[#718575]'>Resolved</span>
                </div>
              </div>
            </div>

            <div className='flex justify-between border-t border-[#e4e3d7] pt-4 text-sm'>
              <span className='text-[#718575]'>Resolved</span>
              <span className='font-bold'>{totals.resolved}</span>
            </div>

            <div className='mt-3 flex justify-between text-sm'>
              <span className='text-[#718575]'>Pending</span>
              <span className='font-bold'>{pending}</span>
            </div>
          </div>

          {/* Monthly Chart */}
          <div className='rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-6 lg:col-span-2'>
            <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
              <div>
                <h2 className='text-lg font-bold'>Monthly Incident Overview</h2>
                <p className='mt-1 text-sm text-[#718575]'>
                  Incidents reported and resolved
                </p>
              </div>

              <div className='flex gap-4 text-xs'>
                <span className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#315c45]' />
                  Reported
                </span>
                <span className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#b6c9a9]' />
                  Resolved
                </span>
              </div>
            </div>

            <div className='flex h-56 items-end justify-around gap-3 border-b border-l border-[#e4e3d7] px-3 pb-2'>
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className='flex h-full flex-1 items-end justify-center gap-1'
                >
                  <div
                    title={`Reported: ${item.incidents}`}
                    className='w-5 rounded-t-md bg-[#315c45] transition hover:opacity-75'
                    style={{ height: `${(item.incidents / 200) * 100}%` }}
                  />

                  <div
                    title={`Resolved: ${item.resolved}`}
                    className='w-5 rounded-t-md bg-[#b6c9a9] transition hover:opacity-75'
                    style={{ height: `${(item.resolved / 200) * 100}%` }}
                  />

                  <span className='absolute' />
                </div>
              ))}
            </div>

            <div className='mt-3 flex justify-around text-xs text-[#718575]'>
              {monthlyData.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </div>
        </section>

        {/* District Table */}
        <section className='mb-8 rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-5 shadow-sm'>
          <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h2 className='text-xl font-bold'>District-wise Performance</h2>
              <p className='mt-1 text-sm text-[#718575]'>
                Compare observations and incident resolution across districts.
              </p>
            </div>

            <input
              type='text'
              placeholder='Search district...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-xl border border-[#d9dfd3] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#315c45] sm:w-64'
            />
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[750px] text-left'>
              <thead>
                <tr className='border-b border-[#e4e3d7] text-xs uppercase tracking-wider text-[#718575]'>
                  <th className='px-4 py-4'>District</th>
                  <th className='px-4 py-4'>Observations</th>
                  <th className='px-4 py-4'>Incidents</th>
                  <th className='px-4 py-4'>Resolved</th>
                  <th className='px-4 py-4'>Pending</th>
                  <th className='px-4 py-4'>Resolution</th>
                </tr>
              </thead>

              <tbody>
                {filteredDistricts.map((item) => {
                  const rate = Math.round(
                    (item.resolved / item.incidents) * 100,
                  );

                  return (
                    <tr
                      key={item.district}
                      className='border-b border-[#eeece2] transition hover:bg-[#f2f3e9]'
                    >
                      <td className='px-4 py-4'>
                        <p className='font-semibold'>{item.district}</p>
                        <p className='text-xs text-[#829083]'>{item.state}</p>
                      </td>

                      <td className='px-4 py-4 text-sm'>{item.observations}</td>

                      <td className='px-4 py-4 text-sm'>{item.incidents}</td>

                      <td className='px-4 py-4 text-sm font-semibold text-green-700'>
                        {item.resolved}
                      </td>

                      <td className='px-4 py-4 text-sm font-semibold text-amber-700'>
                        {item.incidents - item.resolved}
                      </td>

                      <td className='px-4 py-4'>
                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-20 overflow-hidden rounded-full bg-[#e5ecdd]'>
                            <div
                              className='h-full rounded-full bg-[#315c45]'
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className='text-xs font-semibold'>{rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredDistricts.length === 0 && (
              <p className='py-10 text-center text-sm text-[#718575]'>
                No district found.
              </p>
            )}
          </div>
        </section>

        {/* Insights */}
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <div className='rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-5'>
            <h3 className='mb-4 font-bold'>Key Insights</h3>

            <div className='space-y-4'>
              <Insight
                icon='📍'
                title='Highest Incident District'
                value='Meerut, Uttar Pradesh'
              />

              <Insight
                icon='✓'
                title='Highest Resolved Incidents'
                value='Meerut, 112 resolved'
              />

              <Insight
                icon='🛰️'
                title='Total Satellite Observations'
                value={`${totals.observations.toLocaleString()} observations`}
              />
            </div>
          </div>

          <div className='rounded-2xl border border-[#e4e3d7] bg-[#e5ecdd] p-5'>
            <h3 className='mb-3 font-bold text-[#294936]'>
              About These Reports
            </h3>

            <p className='text-sm leading-6 text-[#536d59]'>
              These reports provide an overview of satellite observations,
              reported crop-burning incidents and district-level resolution
              performance. Use this information to monitor activity and identify
              areas requiring attention.
            </p>

            <div className='mt-5 rounded-xl bg-[#f9f7ed] p-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-[#718575]'>
                Report Summary
              </p>
              <p className='mt-2 text-sm font-semibold text-[#315c45]'>
                {resolutionRate}% of recorded incidents have been resolved in
                this sample dataset.
              </p>
            </div>
          </div>
        </section>

        <p className='mt-8 text-center text-xs text-[#829083]'>
          © 2026 EcoTrack. Satellite-Based Environmental Monitoring System.
        </p>
      </main>
    </div>
  );
}

function SummaryCard({ title, value, icon, description }) {
  return (
    <div className='rounded-2xl border border-[#e4e3d7] bg-[#f9f7ed] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-sm font-medium text-[#718575]'>{title}</p>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5ecdd] text-lg'>
          {icon}
        </div>
      </div>

      <h3 className='text-3xl font-bold text-[#294936]'>{value}</h3>
      <p className='mt-2 text-xs text-[#829083]'>{description}</p>
    </div>
  );
}

function Insight({ icon, title, value }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5ecdd]'>
        {icon}
      </div>

      <div>
        <p className='text-xs text-[#718575]'>{title}</p>
        <p className='text-sm font-semibold text-[#294936]'>{value}</p>
      </div>
    </div>
  );
}
