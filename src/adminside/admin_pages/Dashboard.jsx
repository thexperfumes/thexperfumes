// import React, { useEffect, useState } from "react";
// import adminApi from "../services/axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import {
//   Users,
//   ShoppingCart,
//   Clock,
//   AlertCircle,
//   IndianRupee,
// } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState({});
//   const [ordersPerDay, setOrdersPerDay] = useState([]);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* 🔔 Notifications */
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   /* ================= FETCH DASHBOARD ================= */
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const [statsRes, ordersRes, bestRes] = await Promise.all([
//           adminApi.get("dashboard/stats/"),
//           adminApi.get("dashboard/orders-per-day/"),
//           adminApi.get("dashboard/best-selling/"),
//         ]);

//         setStats(statsRes.data);
//         setOrdersPerDay(ordersRes.data);
//         setBestSelling(bestRes.data);
//       } catch {
//         setError("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   /* ================= FETCH UNREAD NOTIFICATIONS ================= */
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await adminApi.get("orders/notifications/");
//         setNotifications(res.data);              // backend already filters unread
//         setUnreadCount(res.data.length);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   /* ================= WEBSOCKET ================= */
//   // useEffect(() => {
//   //   const socket = new WebSocket(
//   //     `${window.location.protocol === "https:" ? "wss" : "ws"}://localhost:8000/ws/admin/notifications/`
//   //   );

//   //   socket.onmessage = (e) => {
//   //     const data = JSON.parse(e.data);
//   //     setNotifications((prev) => [data, ...prev]);
//   //     setUnreadCount((prev) => prev + 1);
//   //   };

//   //   return () => socket.close();
//   // }, []);
// useEffect(() => {
//   const socket = new WebSocket(
//     `${window.location.protocol === "https:" ? "wss" : "ws"}://localhost:8000/ws/admin/notifications/`
//   );

//   socket.onopen = () => {
//     console.log("✅ WebSocket Connected");
//   };

//   socket.onerror = (error) => {
//     console.error("❌ WebSocket Error:", error);
//   };

//   socket.onclose = () => {
//     console.log("❌ WebSocket Closed");
//   };

//   socket.onmessage = (e) => {
//     const data = JSON.parse(e.data);
//     console.log("🔔 New Notification:", data);

//     setNotifications((prev) => [data, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   };

//   return () => socket.close();
// }, []);

//   /* ================= CLOSE SINGLE NOTIFICATION ================= */
//   const closeNotification = async (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//     setUnreadCount((prev) => Math.max(prev - 1, 0));

//     try {
//       await adminApi.post(`orders/notifications/${id}/mark-read/`);
//     } catch (err) {
//       console.error("Failed to mark notification read");
//     }
//   };

//   /* ================= MARK ALL READ ================= */
//   const markAllRead = async () => {
//     setNotifications([]);
//     setUnreadCount(0);
//     setShowNotifications(false);

//     try {
//       await adminApi.post("orders/notifications/mark-read/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-300">
//         Loading dashboard...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400">
//         {error}
//       </div>
//     );

//   return (
//     <div className="min-h-screen p-6 bg-[#0b0b0b] text-white">
//       {/* HEADER */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-yellow-400">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Business performance overview
//           </p>
//         </div>

//         {/* 🔔 Notification Bell */}
//         <div className="relative">
//           <button
//             onClick={() => setShowNotifications(!showNotifications)}
//             className="relative p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500"
//           >
//             🔔
//             {unreadCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           {showNotifications && (
//             <ul className="absolute right-0 mt-2 w-80 bg-[#111] border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
//               {notifications.length === 0 && (
//                 <li className="p-4 text-center text-gray-500">
//                   No notifications
//                 </li>
//               )}

//               {notifications.map((notif) => (
//                 <li
//                   key={notif.id}
//                   className="flex justify-between gap-2 p-3 border-b border-gray-700 hover:bg-gray-800"
//                 >
//                   <div className="text-yellow-400">
//                     {notif.text}
//                     <span className="block text-xs text-gray-400 mt-1">
//                       {new Date(notif.timestamp).toLocaleString()}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => closeNotification(notif.id)}
//                     className="text-gray-400 hover:text-red-500 text-sm"
//                   >
//                     ✕
//                   </button>
//                 </li>
//               ))}

//               {notifications.length > 0 && (
//                 <li className="p-2 text-center">
//                   <button
//                     onClick={markAllRead}
//                     className="text-sm text-yellow-400 hover:underline"
//                   >
//                     Mark all as read
//                   </button>
//                 </li>
//               )}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* LOW STOCK ALERT */}
//       {stats.low_stock_perfumes > 0 && (
//         <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
//           ⚠ {stats.low_stock_perfumes} perfumes are running low on stock
//         </div>
//       )}

//       {/* STATS */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 mb-10">
//         <StatCard title="Total Users" value={stats.total_users} icon={Users} />
//         <StatCard title="Total Orders" value={stats.total_orders} icon={ShoppingCart} />
//         <StatCard title="Today's Orders" value={stats.today_orders} icon={Clock} />
//         <StatCard title="Pending Orders" value={stats.pending_orders} icon={AlertCircle} />
//         <StatCard title="Total Revenue" value={`₹${stats.total_revenue ?? 0}`} icon={IndianRupee} />
//         <StatCard title="Today's Revenue" value={`₹${stats.today_revenue ?? 0}`} icon={IndianRupee} />
//       </div>

//       {/* CHARTS */}
//       <ChartCard title="Orders per Day">
//         <ResponsiveContainer width="100%" height={320}>
//           <LineChart data={ordersPerDay}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="date" stroke="#aaa" />
//             <YAxis stroke="#aaa" />
//             <Tooltip />
//             <Line type="monotone" dataKey="orders" stroke="#facc15" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>

//       <ChartCard title="Best-Selling Perfumes">
//         <ResponsiveContainer width="100%" height={320}>
//           <BarChart data={bestSelling}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="perfume_name" stroke="#aaa" />
//             <YAxis stroke="#aaa" />
//             <Tooltip />
//             <Bar dataKey="sold" fill="#facc15" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </div>
//   );
// };

// /* ================= COMPONENTS ================= */

// const StatCard = ({ title, value, icon: Icon }) => (
//   <div className="bg-[#111] p-5 rounded-xl border border-yellow-400/30">
//     <div className="flex items-center justify-between mb-2">
//       <p className="text-gray-400 text-sm">{title}</p>
//       <Icon className="text-yellow-400 w-5 h-5" />
//     </div>
//     <h3 className="text-2xl font-bold text-yellow-400">{value ?? 0}</h3>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-[#111] p-6 rounded-xl border border-gray-700 mb-8">
//     <h2 className="text-xl font-semibold text-yellow-400 mb-4">{title}</h2>
//     {children}
//   </div>
// );

// export default Dashboard;


import React, { useEffect, useState } from "react";
import adminApi from "../services/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  ShoppingCart,
  Clock,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [ordersPerDay, setOrdersPerDay] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🔔 Notifications */
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  /* ================= FETCH DASHBOARD ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, ordersRes, bestRes] = await Promise.all([
          adminApi.get("dashboard/stats/"),
          adminApi.get("dashboard/orders-per-day/"),
          adminApi.get("dashboard/best-selling/"),
        ]);

        setStats(statsRes.data);
        setOrdersPerDay(ordersRes.data);
        setBestSelling(bestRes.data);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ================= FETCH NOTIFICATIONS (Refresh Based) ================= */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await adminApi.get("orders/notifications/");
        setNotifications(res.data);
        setUnreadCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();

    // Auto refresh every 10 seconds (optional)
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  /* ================= CLOSE SINGLE NOTIFICATION ================= */
  const closeNotification = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(prev - 1, 0));

    try {
      await adminApi.post(`orders/notifications/${id}/mark-read/`);
    } catch (err) {
      console.error("Failed to mark notification read");
    }
  };

  /* ================= MARK ALL READ ================= */
  const markAllRead = async () => {
    setNotifications([]);
    setUnreadCount(0);
    setShowNotifications(false);

    try {
      await adminApi.post("orders/notifications/mark-read/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-[#0b0b0b] text-white">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Business performance overview
          </p>
        </div>

        {/* 🔔 Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <ul className="absolute right-0 mt-2 w-80 bg-[#111] border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {notifications.length === 0 && (
                <li className="p-4 text-center text-gray-500">
                  No notifications
                </li>
              )}

              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="flex justify-between gap-2 p-3 border-b border-gray-700 hover:bg-gray-800"
                >
                  <div className="text-yellow-400">
                    {notif.text}
                    <span className="block text-xs text-gray-400 mt-1">
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => closeNotification(notif.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}

              {notifications.length > 0 && (
                <li className="p-2 text-center">
                  <button
                    onClick={markAllRead}
                    className="text-sm text-yellow-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* LOW STOCK ALERT */}
      {stats.low_stock_perfumes > 0 && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
          ⚠ {stats.low_stock_perfumes} perfumes are running low on stock
        </div>
      )}

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 mb-10">
        <StatCard title="Total Users" value={stats.total_users} icon={Users} />
        <StatCard title="Total Orders" value={stats.total_orders} icon={ShoppingCart} />
        <StatCard title="Today's Orders" value={stats.today_orders} icon={Clock} />
        <StatCard title="Pending Orders" value={stats.pending_orders} icon={AlertCircle} />
        <StatCard title="Total Revenue" value={`₹${stats.total_revenue ?? 0}`} icon={IndianRupee} />
        <StatCard title="Today's Revenue" value={`₹${stats.today_revenue ?? 0}`} icon={IndianRupee} />
      </div>

      {/* CHARTS */}
      <ChartCard title="Orders per Day">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={ordersPerDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#facc15" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Best-Selling Perfumes">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={bestSelling}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="perfume_name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="sold" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-[#111] p-5 rounded-xl border border-yellow-400/30">
    <div className="flex items-center justify-between mb-2">
      <p className="text-gray-400 text-sm">{title}</p>
      <Icon className="text-yellow-400 w-5 h-5" />
    </div>
    <h3 className="text-2xl font-bold text-yellow-400">{value ?? 0}</h3>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-[#111] p-6 rounded-xl border border-gray-700 mb-8">
    <h2 className="text-xl font-semibold text-yellow-400 mb-4">{title}</h2>
    {children}
  </div>
);

export default Dashboard;