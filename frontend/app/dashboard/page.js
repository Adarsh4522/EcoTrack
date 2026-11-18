
import Link from "next/link";

const stats = [
  {
    title: "Total Observations",
    value: "2,486",
    change: "+12.5%",
    note: "Satellite detections",
    icon: "◉",
  },
  {
    title: "Total Incidents",
    value: "1,248",
    change: "+8.2%",
    note: "Recorded incidents",
    icon: "◎",
  },
  {
    title: "Pending Review",
    value: "186",
    change: "Needs attention",
    note: "Awaiting verification",
    icon: "◷",
  },
  {
    title: "Resolved Incidents",
    value: "864",
    change: "69.2%",
    note: "Of total incidents",
    icon: "✓",
  },
];

const activities = [
  {
    title: "New satellite observation detected",
    location: "Bathinda, Punjab",
    time: "10 minutes ago",
    status: "New",
  },
  {
    title: "Incident assigned to field officer",
    location: "Hisar, Haryana",
    time: "35 minutes ago",
    status: "Assigned",
  },
  {
    title: "Incident marked under investigation",
    location: "Ludhiana, Punjab",
    time: "1 hour ago",
    status: "Investigating",
  },
  {
    title: "Incident resolution recorded",
    location: "Karnal, Haryana",
    time: "2 hours ago",
    status: "Resolved",
  },
];

const states = [
  { name: "Punjab", count: 420, percent: 85 },
  { name: "Haryana", count: 350, percent: 70 },
  { name: "Uttar Pradesh", count: 290, percent: 58 },
  { name: "Rajasthan", count: 210, percent: 42 },
  { name: "Madhya Pradesh", count: 160, percent: 32 },
];

function Sidebar() {
  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: "▦" },
    { name: "India Map", href: "/map", icon: "◎" },
    { name: "Observations", href: "/observations", icon: "◉" },
    { name: "Incidents", href: "/incidents", icon: "⚑" },
    { name: "Officers", href: "/officers", icon: "♙" },
    { name: "Reports", href: "/reports", icon: "▤" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl text-white">
          🌿
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">EcoTrack</h1>
          <p className="text-xs text-gray-500">Monitor. Detect. Respond.</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <nav className="space-y-1">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                item.name === "Dashboard"
                  ? "bg-green-50 text-green-800"
                  : "text-gray-600 hover:bg-gray-50 hover:text-green-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-100 p-5">
        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-900">
            Protect our environment
          </p>
          <p className="mt-1 text-xs leading-5 text-green-800">
            Monitor fire observations and coordinate faster responses.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ item }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{item.title}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-xl text-green-700">
          {item.icon}
        </span>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-gray-900">
        {item.value}
      </h2>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-green-700">
          {item.change}
        </span>
        <span className="text-xs text-gray-400">{item.note}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="min-h-screen pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">
              Environmental Fire Monitoring System
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:block">
              India Overview
            </span>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              🔔 Notifications
            </button>
          </div>
        </header>

        <div className="space-y-8 p-8">
          {/* Welcome Section */}
          <section>
            <p className="text-sm font-medium text-green-700">
              NATIONAL OVERVIEW
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              Welcome to EcoTrack
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor satellite observations and manage environmental fire incidents across India.
            </p>
          </section>

          {/* Summary Cards */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </section>

          {/* Middle Section */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Incident Status */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">
                    Incident Status Overview
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Current distribution of incidents
                  </p>
                </div>
                <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                  All India
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Resolved", count: 864, percent: 69, color: "bg-green-600" },
                  { label: "Pending Review", count: 186, percent: 15, color: "bg-yellow-500" },
                  { label: "Assigned", count: 124, percent: 10, color: "bg-blue-500" },
                  { label: "Under Investigation", count: 74, percent: 6, color: "bg-orange-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                      <span className="text-gray-500">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
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
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Data Source Health</h3>
              <p className="mt-1 text-sm text-gray-500">
                Satellite data connection status
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      NASA FIRMS
                    </p>
                    <p className="text-xs text-gray-400">Satellite observations</p>
                  </div>
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                    Demo
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      ISRO / NRSC
                    </p>
                    <p className="text-xs text-gray-400">Official data source</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    Not connected
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">Last successful sync</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Sample data only
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="grid gap-6 xl:grid-cols-2">
            {/* State Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">
                State-wise Observations
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Sample observation distribution across states
              </p>

              <div className="mt-6 space-y-5">
                {states.map((state) => (
                  <div key={state.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {state.name}
                      </span>
                      <span className="text-gray-500">{state.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{ width: `${state.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Recent Activity</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Latest incident updates
                  </p>
                </div>
                <Link
                  href="/incidents"
                  className="text-sm font-medium text-green-700 hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="mt-5 divide-y divide-gray-100">
                {activities.map((activity, index) => (
                  <div key={index} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {activity.location} · {activity.time}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
            EcoTrack © 2026 · Monitor. Detect. Respond. Protect.
          </footer>
        </div>
      </main>
    </div>
  );
}
