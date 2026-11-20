import Link from 'next/link';
import Sidebar from '../components/Sidebar';

const stats = [
  {
    title: 'Total Observations',
    value: '2,486',
    change: '+12.5%',
    note: 'Satellite detections',
    icon: '◉',
  },
  {
    title: 'Total Incidents',
    value: '1,248',
    change: '+8.2%',
    note: 'Recorded incidents',
    icon: '◎',
  },
  {
    title: 'Pending Review',
    value: '186',
    change: 'Needs attention',
    note: 'Awaiting verification',
    icon: '◷',
  },
  {
    title: 'Resolved Incidents',
    value: '864',
    change: '69.2%',
    note: 'Of total incidents',
    icon: '✓',
  },
];

const activities = [
  {
    title: 'New satellite observation detected',
    location: 'Bathinda, Punjab',
    time: '10 minutes ago',
    status: 'New',
  },
  {
    title: 'Incident assigned to field officer',
    location: 'Hisar, Haryana',
    time: '35 minutes ago',
    status: 'Assigned',
  },
  {
    title: 'Incident marked under investigation',
    location: 'Ludhiana, Punjab',
    time: '1 hour ago',
    status: 'Investigating',
  },
  {
    title: 'Incident resolution recorded',
    location: 'Karnal, Haryana',
    time: '2 hours ago',
    status: 'Resolved',
  },
];

const states = [
  { name: 'Punjab', count: 420, percent: 85 },
  { name: 'Haryana', count: 350, percent: 70 },
  { name: 'Uttar Pradesh', count: 290, percent: 58 },
  { name: 'Rajasthan', count: 210, percent: 42 },
  { name: 'Madhya Pradesh', count: 160, percent: 32 },
];

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
                    label: 'Resolved',
                    count: 864,
                    percent: 69,
                    color: 'bg-[#477b53]',
                  },
                  {
                    label: 'Pending Review',
                    count: 186,
                    percent: 15,
                    color: 'bg-[#d5a34e]',
                  },
                  {
                    label: 'Assigned',
                    count: 124,
                    percent: 10,
                    color: 'bg-[#789b9a]',
                  },
                  {
                    label: 'Under Investigation',
                    count: 74,
                    percent: 6,
                    color: 'bg-[#c98251]',
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className='mb-2 flex justify-between gap-3 text-sm'>
                      <span className='font-semibold text-[#52664f]'>
                        {item.label}
                      </span>

                      <span className='text-[#82907b]'>
                        {item.count} ({item.percent}%)
                      </span>
                    </div>

                    <div className='h-3 overflow-hidden rounded-full bg-[#e8eadd]'>
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
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
                    Demo
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
                State-wise Observations
              </h3>

              <p className='mt-1 text-sm text-[#82907b]'>
                Sample observation distribution across states
              </p>

              <div className='mt-7 space-y-6'>
                {states.map((state) => (
                  <div key={state.name}>
                    <div className='mb-2 flex justify-between gap-3 text-sm'>
                      <span className='font-semibold text-[#52664f]'>
                        {state.name}
                      </span>

                      <span className='text-[#82907b]'>{state.count}</span>
                    </div>

                    <div className='h-2.5 overflow-hidden rounded-full bg-[#e8eadd]'>
                      <div
                        className='h-full rounded-full bg-[#58805b]'
                        style={{ width: `${state.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
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
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className='py-4'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-sm font-semibold text-[#52664f]'>
                          {activity.title}
                        </p>

                        <p className='mt-1 text-xs text-[#929b87]'>
                          {activity.location} · {activity.time}
                        </p>
                      </div>

                      <span className='shrink-0 rounded-full bg-[#e8eddf] px-2.5 py-1 text-xs font-semibold text-[#52664f]'>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
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
