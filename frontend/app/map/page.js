'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import Sidebar from '../components/Sidebar';

const observations = [
  {
    id: 1,
    location: 'Ludhiana, Punjab',
    category: 'Crop Burning',
    status: 'Pending Review',
    lat: 30.9,
    lng: 75.85,
    color: '#ef4444',
  },
  {
    id: 2,
    location: 'Karnal, Haryana',
    category: 'Crop Burning',
    status: 'Assigned',
    lat: 29.68,
    lng: 76.99,
    color: '#ef4444',
  },
  {
    id: 3,
    location: 'Jaipur, Rajasthan',
    category: 'Unclassified',
    status: 'Pending Review',
    lat: 26.91,
    lng: 75.78,
    color: '#eab308',
  },
  {
    id: 4,
    location: 'Bhopal, Madhya Pradesh',
    category: 'Forest Fire',
    status: 'Under Investigation',
    lat: 23.25,
    lng: 77.41,
    color: '#16a34a',
  },
  {
    id: 5,
    location: 'Meerut, Uttar Pradesh',
    category: 'Crop Burning',
    status: 'Pending Review',
    lat: 28.98,
    lng: 77.7,
    color: '#ef4444',
  },
  {
    id: 6,
    location: 'Dehradun, Uttarakhand',
    category: 'Forest Fire',
    status: 'Assigned',
    lat: 30.32,
    lng: 78.03,
    color: '#16a34a',
  },
];

export default function MapPage() {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const filteredObservations = observations.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;

    const statusMatch = status === 'All' || item.status === status;

    return categoryMatch && statusMatch;
  });

  return (
    <div className='min-h-screen bg-[#f1f0e5] text-[#294936]'>
      <div className='flex min-h-screen'>
        <Sidebar />

        <aside className='hidden w-64 shrink-0 border-r border-[#e4e2d5] bg-[#f9f7ed] p-6 shadow-sm md:block'>
          <h1 className='mb-1 text-2xl font-bold text-[#315c45]'>EcoTrack</h1>

          <p className='mb-10 text-xs text-[#777d70]'>
            Monitor. Detect. Respond. Protect.
          </p>

          <nav className='space-y-2'>
            <Link
              href='/dashboard'
              className='block rounded-lg px-4 py-3 text-[#536456] transition hover:bg-[#e5ecdd] hover:text-[#315c45]'
            >
              Dashboard
            </Link>

            <Link
              href='/map'
              className='block rounded-lg bg-[#e5ecdd] px-4 py-3 font-semibold text-[#315c45]'
            >
              India Map
            </Link>

            <Link
              href='/observations'
              className='block rounded-lg px-4 py-3 text-[#536456] transition hover:bg-[#e5ecdd] hover:text-[#315c45]'
            >
              Observations
            </Link>

            <Link
              href='/incidents'
              className='block rounded-lg px-4 py-3 text-[#536456] transition hover:bg-[#e5ecdd] hover:text-[#315c45]'
            >
              Incidents
            </Link>

            <Link
              href='/officers'
              className='block rounded-lg px-4 py-3 text-[#536456] transition hover:bg-[#e5ecdd] hover:text-[#315c45]'
            >
              Officers
            </Link>

            <Link
              href='/reports'
              className='block rounded-lg px-4 py-3 text-[#536456] transition hover:bg-[#e5ecdd] hover:text-[#315c45]'
            >
              Reports
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='min-w-0 flex-1 p-5 md:p-8'>
          {/* Header */}
          <div className='mb-7 flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl font-bold text-[#294936]'>
                India Fire Monitoring Map
              </h2>

              <p className='mt-1 text-sm text-[#777d70]'>
                View and monitor satellite-based fire observations across India.
              </p>
            </div>

            <Link
              href='/dashboard'
              className='rounded-lg border border-[#dedccd] bg-[#f9f7ed] px-4 py-2 text-sm font-medium text-[#315c45] transition hover:bg-[#e5ecdd]'
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Summary Cards */}
          <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div className='rounded-xl border border-[#e6e3d6] bg-[#f9f7ed] p-5 shadow-sm'>
              <p className='text-sm text-[#777d70]'>Total Observations</p>
              <h3 className='mt-2 text-2xl font-bold text-[#294936]'>2,486</h3>
            </div>

            <div className='rounded-xl border border-[#e6e3d6] bg-[#f9f7ed] p-5 shadow-sm'>
              <p className='text-sm text-[#777d70]'>Pending Review</p>
              <h3 className='mt-2 text-2xl font-bold text-[#c65b4b]'>186</h3>
            </div>

            <div className='rounded-xl border border-[#e6e3d6] bg-[#f9f7ed] p-5 shadow-sm'>
              <p className='text-sm text-[#777d70]'>Locations Displayed</p>
              <h3 className='mt-2 text-2xl font-bold text-[#315c45]'>
                {filteredObservations.length}
              </h3>
            </div>
          </div>

          {/* Filters */}
          <div className='mb-5 rounded-xl border border-[#e6e3d6] bg-[#f9f7ed] p-5 shadow-sm'>
            <h3 className='mb-4 font-semibold text-[#294936]'>
              Filter Observations
            </h3>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm text-[#536456]'>
                  Detection Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full rounded-lg border border-[#dedccd] bg-[#fffef8] p-3 text-[#294936] outline-none transition focus:border-[#315c45] focus:ring-2 focus:ring-[#e5ecdd]'
                >
                  <option value='All'>All Categories</option>
                  <option value='Crop Burning'>Crop Burning</option>
                  <option value='Forest Fire'>Forest Fire</option>
                  <option value='Unclassified'>Unclassified</option>
                </select>
              </div>

              <div>
                <label className='mb-2 block text-sm text-[#536456]'>
                  Incident Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='w-full rounded-lg border border-[#dedccd] bg-[#fffef8] p-3 text-[#294936] outline-none transition focus:border-[#315c45] focus:ring-2 focus:ring-[#e5ecdd]'
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

          {/* Map */}
          <div className='overflow-hidden rounded-xl border border-[#e6e3d6] bg-[#f9f7ed] p-3 shadow-sm'>
            <div className='mb-3 flex flex-wrap items-center justify-between gap-2 px-2'>
              <h3 className='font-semibold text-[#294936]'>
                Observation Locations
              </h3>

              <span className='text-xs text-[#777d70]'>
                Sample demonstration data
              </span>
            </div>

            <MapContainer
              center={[22.5, 82.0]}
              zoom={5}
              scrollWheelZoom={true}
              className='h-[520px] w-full rounded-lg'
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {filteredObservations.map((item) => (
                <CircleMarker
                  key={item.id}
                  center={[item.lat, item.lng]}
                  radius={9}
                  pathOptions={{
                    color: item.color,
                    fillColor: item.color,
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>
                    <div className='min-w-40 text-sm'>
                      <strong>{item.location}</strong>
                      <p className='mt-2'>Category: {item.category}</p>
                      <p>Status: {item.status}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>

            {/* Legend */}
            <div className='flex flex-wrap gap-5 px-3 py-4 text-sm text-[#536456]'>
              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 rounded-full bg-red-500'></span>
                Crop Burning
              </span>

              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 rounded-full bg-green-600'></span>
                Forest Fire
              </span>

              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 rounded-full bg-yellow-500'></span>
                Unclassified
              </span>
            </div>
          </div>

          {/* Information Note */}
          <div className='mt-5 rounded-xl border border-[#e7d8a9] bg-[#f6f0dc] p-4'>
            <p className='text-sm text-[#78632d]'>
              <strong>Note:</strong> Satellite observations indicate possible
              thermal anomalies. They do not independently confirm the cause of
              a fire. Each observation requires appropriate review and
              verification.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
