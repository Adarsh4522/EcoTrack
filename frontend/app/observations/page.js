'use client';

import Link from 'next/link';
import { useState } from 'react';

const observations = [
  {
    id: 'OBS001',
    location: 'Ludhiana, Punjab',
    category: 'Crop Burning',
    satellite: 'VIIRS',
    date: '18 Nov 2026',
    confidence: 'High',
    status: 'Pending Review',
  },
  {
    id: 'OBS002',
    location: 'Karnal, Haryana',
    category: 'Crop Burning',
    satellite: 'MODIS',
    date: '18 Nov 2026',
    confidence: 'Medium',
    status: 'Assigned',
  },
  {
    id: 'OBS003',
    location: 'Jaipur, Rajasthan',
    category: 'Unclassified',
    satellite: 'VIIRS',
    date: '17 Nov 2026',
    confidence: 'Low',
    status: 'Pending Review',
  },
  {
    id: 'OBS004',
    location: 'Bhopal, Madhya Pradesh',
    category: 'Forest Fire',
    satellite: 'MODIS',
    date: '17 Nov 2026',
    confidence: 'High',
    status: 'Under Investigation',
  },
  {
    id: 'OBS005',
    location: 'Meerut, Uttar Pradesh',
    category: 'Crop Burning',
    satellite: 'VIIRS',
    date: '16 Nov 2026',
    confidence: 'Medium',
    status: 'Pending Review',
  },
  {
    id: 'OBS006',
    location: 'Dehradun, Uttarakhand',
    category: 'Forest Fire',
    satellite: 'VIIRS',
    date: '16 Nov 2026',
    confidence: 'High',
    status: 'Assigned',
  },
];

function StatusBadge({ status }) {
  const styles = {
    'Pending Review': 'bg-yellow-100 text-yellow-700',
    Assigned: 'bg-blue-100 text-blue-700',
    'Under Investigation': 'bg-purple-100 text-purple-700',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}

export default function ObservationsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const filteredObservations = observations.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === 'All' || item.category === category;

    const matchesStatus = status === 'All' || item.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className='min-h-screen bg-gray-100 text-gray-800'>
      <div className='flex min-h-screen'>
        {/* Sidebar */}
        <aside className='hidden w-64 shrink-0 bg-white p-6 shadow-sm md:block'>
          <h1 className='text-2xl font-bold text-green-700'>EcoTrack</h1>

          <p className='mb-10 mt-1 text-xs text-gray-500'>
            Monitor. Detect. Respond. Protect.
          </p>

          <nav className='space-y-2'>
            <Link
              href='/dashboard'
              className='block rounded-lg px-4 py-3 text-gray-600 hover:bg-green-50'
            >
              Dashboard
            </Link>

            <Link
              href='/map'
              className='block rounded-lg px-4 py-3 text-gray-600 hover:bg-green-50'
            >
              India Map
            </Link>

            <Link
              href='/observations'
              className='block rounded-lg bg-green-100 px-4 py-3 font-semibold text-green-700'
            >
              Observations
            </Link>

            <Link
              href='/incidents'
              className='block rounded-lg px-4 py-3 text-gray-600 hover:bg-green-50'
            >
              Incidents
            </Link>

            <Link
              href='/officers'
              className='block rounded-lg px-4 py-3 text-gray-600 hover:bg-green-50'
            >
              Officers
            </Link>

            <Link
              href='/reports'
              className='block rounded-lg px-4 py-3 text-gray-600 hover:bg-green-50'
            >
              Reports
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='min-w-0 flex-1 p-5 md:p-8'>
          {/* Header */}
          <div className='mb-7'>
            <h2 className='text-2xl font-bold'>Satellite Observations</h2>

            <p className='mt-1 text-sm text-gray-500'>
              Explore and review satellite-based thermal anomaly detections.
            </p>
          </div>

          {/* Summary Cards */}
          <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div className='rounded-xl bg-white p-5 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Observations</p>
              <h3 className='mt-2 text-2xl font-bold'>2,486</h3>
            </div>

            <div className='rounded-xl bg-white p-5 shadow-sm'>
              <p className='text-sm text-gray-500'>Pending Review</p>
              <h3 className='mt-2 text-2xl font-bold text-yellow-600'>186</h3>
            </div>

            <div className='rounded-xl bg-white p-5 shadow-sm'>
              <p className='text-sm text-gray-500'>High Confidence</p>
              <h3 className='mt-2 text-2xl font-bold text-green-600'>742</h3>
            </div>
          </div>

          {/* Filters */}
          <div className='mb-6 rounded-xl bg-white p-5 shadow-sm'>
            <h3 className='mb-4 font-semibold'>
              Search and Filter Observations
            </h3>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div>
                <label className='mb-2 block text-sm text-gray-600'>
                  Search Location or ID
                </label>

                <input
                  type='text'
                  placeholder='Search here...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm text-gray-600'>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500'
                >
                  <option value='All'>All Categories</option>
                  <option value='Crop Burning'>Crop Burning</option>
                  <option value='Forest Fire'>Forest Fire</option>
                  <option value='Unclassified'>Unclassified</option>
                </select>
              </div>

              <div>
                <label className='mb-2 block text-sm text-gray-600'>
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500'
                >
                  <option value='All'>All Statuses</option>
                  <option value='Pending Review'>Pending Review</option>
                  <option value='Assigned'>Assigned</option>
                  <option value='Under Investigation'>
                    Under Investigation
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Observations Table */}
          <div className='overflow-hidden rounded-xl bg-white shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-3 border-b p-5'>
              <div>
                <h3 className='font-semibold'>Observation Records</h3>

                <p className='mt-1 text-xs text-gray-500'>
                  {filteredObservations.length} records displayed
                </p>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full min-w-[850px] text-left text-sm'>
                <thead className='bg-gray-50 text-gray-500'>
                  <tr>
                    <th className='px-5 py-4'>Observation ID</th>
                    <th className='px-5 py-4'>Location</th>
                    <th className='px-5 py-4'>Category</th>
                    <th className='px-5 py-4'>Satellite</th>
                    <th className='px-5 py-4'>Date</th>
                    <th className='px-5 py-4'>Confidence</th>
                    <th className='px-5 py-4'>Status</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-100'>
                  {filteredObservations.map((item) => (
                    <tr
                      key={item.id}
                      className='hover:bg-gray-50'
                    >
                      <td className='px-5 py-4 font-medium text-green-700'>
                        {item.id}
                      </td>

                      <td className='px-5 py-4'>{item.location}</td>

                      <td className='px-5 py-4'>{item.category}</td>

                      <td className='px-5 py-4'>{item.satellite}</td>

                      <td className='px-5 py-4'>{item.date}</td>

                      <td className='px-5 py-4'>{item.confidence}</td>

                      <td className='px-5 py-4'>
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}

                  {filteredObservations.length === 0 && (
                    <tr>
                      <td
                        colSpan='7'
                        className='px-5 py-10 text-center text-gray-500'
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
          <div className='mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4'>
            <p className='text-sm text-yellow-800'>
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
