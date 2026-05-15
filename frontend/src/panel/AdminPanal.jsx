import React from "react";

const AdminPanel = () => {
  const stats = [
    { title: "Total Members", value: "1280" },
    { title: "Active Members", value: "1050" },
    { title: "Today Attendance", value: "320" },
    { title: "Pending Payments", value: "₹42,000" },
  ];

  const menuItems = [
    "Dashboard",
    "Members",
    "Attendance",
    "Payments",
    "Trainers",
    "Membership Plans",
    "Reports",
    "Notifications",
    "Settings",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#0B1120] text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          Gym<span className="text-violet-400">OS</span>
        </h1>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl cursor-pointer hover:bg-violet-500/20 transition-all duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h2>
            <p className="text-gray-500 text-sm">Welcome back, Admin</p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-xl outline-none"
            />
            <div className="w-11 h-11 rounded-full bg-violet-500"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Members Table UI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Members Management</h3>
            <button className="bg-violet-500 text-white px-5 py-2 rounded-xl">
              + Add Member
            </button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4">Rahul Kumar</td>
                <td>rahul@gmail.com</td>
                <td>Monthly</td>
                <td>Active</td>
                <td>Edit | Delete</td>
              </tr>
              <tr>
                <td className="py-4">Aman Singh</td>
                <td>aman@gmail.com</td>
                <td>Yearly</td>
                <td>Pending</td>
                <td>Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-gray-600">
            <p>• New member joined today</p>
            <p>• Membership renewed successfully</p>
            <p>• Payment pending for 12 members</p>
            <p>• Trainer assigned to premium batch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
