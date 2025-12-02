
// "use client";
// import React, { useEffect, useState } from "react";
// import api from "@/utils/api";
// import { getUserFromToken } from "@/utils/auth";
// import type { LeaveRequestDto, LeaveTypeDto } from "@/types";

// export default function EmployeeDashboard() {
//   const [requests, setRequests] = useState<LeaveRequestDto[]>([]);
//   const [leaveTypes, setLeaveTypes] = useState<LeaveTypeDto[]>([]);
//   const [form, setForm] = useState({
//     leaveTypeId: "",
//     startDate: "",
//     endDate: "",
//     reason: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [activeTab, setActiveTab] = useState<"new" | "all">("new");

//   useEffect(() => {
//     fetchRequests();
//     fetchLeaveTypes();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function fetchRequests() {
//     const user = getUserFromToken();
//     const res = await api.get<LeaveRequestDto[]>("/leaverequests");
//     setRequests(res.data.filter((r) => r.userId === user?.id));
//   }

//   async function fetchLeaveTypes() {
//     const res = await api.get<LeaveTypeDto[]>("/leavetypes");
//     setLeaveTypes(res.data);
//   }

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");
//     const user = getUserFromToken();
//     if (!user) {
//       setMsg("Please login again.");
//       setLoading(false);
//       return;
//     }
//     try {
//       await api.post("/leaverequests", {
//         userId: user.id,
//         ...form,
//         startDate: new Date(form.startDate),
//         endDate: new Date(form.endDate),
//       });
//       setMsg("✅ Leave request submitted!");
//       setForm({ leaveTypeId: "", startDate: "", endDate: "", reason: "" });
//       fetchRequests();
//     } catch {
//       setMsg("❌ Error submitting request.");
//     }
//     setLoading(false);
//   }

//   const totals = {
//     total: requests.length,
//     pending: requests.filter((r) => r.status === "Pending").length,
//     approved: requests.filter((r) => r.status === "Approved").length,
//     rejected: requests.filter((r) => r.status === "Rejected").length,
//   };

//   const recent = requests.slice().reverse().slice(0, 5);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-amber-50 py-10">
//       <div className="max-w-6xl mx-auto px-6">
//         <header className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-800">My Leave Portal</h1>
//             <p className="text-slate-500 mt-1">Submit requests and track statuses — simple and clear.</p>
//           </div>

//           <div className="flex gap-4 items-center">
//             <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow">
//               <div className="text-sm">Total</div>
//               <div className="text-2xl font-bold">{totals.total}</div>
//             </div>
//             <div className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow border">
//               <div className="text-sm text-slate-500">Pending</div>
//               <div className="text-xl font-semibold text-amber-600">{totals.pending}</div>
//             </div>
//             <div className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow border">
//               <div className="text-sm text-slate-500">Approved</div>
//               <div className="text-xl font-semibold text-green-600">{totals.approved}</div>
//             </div>
//           </div>
//         </header>

//         {/* Tabs */}
//         <div className="mb-6 bg-white/60 p-2 rounded-xl inline-flex gap-2 shadow">
//           <button
//             onClick={() => setActiveTab("new")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               activeTab === "new" ? "bg-emerald-500 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"
//             }`}
//           >
//             New Request
//           </button>
//           <button
//             onClick={() => setActiveTab("all")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               activeTab === "all" ? "bg-emerald-500 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"
//             }`}
//           >
//             Previous Requests
//           </button>
//         </div>

//         <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left: Form Card (visible on New Request tab) */}
//           {activeTab === "new" && (
//             <section className="lg:col-span-1 rounded-2xl p-6 bg-gradient-to-tr from-white/90 to-indigo-50 shadow-xl border">
//               <h2 className="text-xl font-bold text-indigo-700 mb-3">Request Leave</h2>
//               <form onSubmit={submit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">Leave Type</label>
//                   <select
//                     value={form.leaveTypeId}
//                     onChange={(e) => setForm((f) => ({ ...f, leaveTypeId: e.target.value }))}
//                     className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:ring-2 focus:ring-emerald-300 bg-white"
//                     required
//                   >
//                     <option value="">Select</option>
//                     {leaveTypes.map((t) => (
//                       <option key={t.id} value={t.id}>
//                         {t.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">Start</label>
//                     <input
//                       type="date"
//                       value={form.startDate}
//                       onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
//                       className="mt-1 block w-full rounded-md border-gray-200 p-2 bg-white"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700">End</label>
//                     <input
//                       type="date"
//                       value={form.endDate}
//                       onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
//                       className="mt-1 block w-full rounded-md border-gray-200 p-2 bg-white"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">Reason</label>
//                   <textarea
//                     value={form.reason}
//                     onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
//                     rows={3}
//                     className="mt-1 block w-full rounded-md border-gray-200 p-2 bg-white"
//                     placeholder="Short reason for leave"
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-slate-500">{msg}</div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`rounded-full px-5 py-2 font-semibold text-white shadow-md transition-transform ${
//                       loading ? "bg-emerald-300" : "bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105"
//                     }`}
//                   >
//                     {loading ? "Submitting..." : "Submit Request"}
//                   </button>
//                 </div>
//               </form>
//             </section>
//           )}

//           {/* Right: Requests list (span 2 cols) */}
//           <section className={`${activeTab === "new" ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
//             {/* Recent requests (shown on New tab as quick view) */}
//             {activeTab === "new" && (
//               <div className="rounded-2xl p-4 bg-white/60 backdrop-blur-sm shadow border mb-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <h2 className="text-lg font-bold text-slate-800">Recent Requests</h2>
//                 </div>

//                 <div className="space-y-3">
//                   {recent.length === 0 && <div className="p-6 text-center text-slate-500 italic">No recent requests.</div>}
//                   {recent.map((r) => (
//                     <article key={r.id} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 shadow-sm border">
//                       <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
//                         {r.id}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="text-sm font-semibold text-slate-800">{r.leaveTypeName}</div>
//                             <div className="text-xs text-slate-500">{new Date(r.startDate).toLocaleDateString()} → {new Date(r.endDate).toLocaleDateString()}</div>
//                           </div>
//                           <div>
//                             <span className={
//                               r.status === "Approved"
//                                 ? "inline-flex items-center px-3 py-1 rounded-full bg-green-200 text-green-800 text-sm font-semibold"
//                                 : r.status === "Rejected"
//                                 ? "inline-flex items-center px-3 py-1 rounded-full bg-red-200 text-red-800 text-sm font-semibold"
//                                 : "inline-flex items-center px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm font-semibold"
//                             }>
//                               {r.status}
//                             </span>
//                           </div>
//                         </div>

//                         <p className="mt-2 text-slate-700">{r.reason}</p>
//                         <div className="mt-3 text-xs text-slate-500">Approver: {r.approverName || "-"}</div>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* All / Previous Requests table */}
//             <div className="rounded-2xl p-4 bg-white/60 backdrop-blur-sm shadow border">
//               <h2 className="text-lg font-bold text-slate-800 mb-3">Previous Leave Requests</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead className="bg-white/80 text-slate-600">
//                     <tr>
//                       <th className="p-3 border-b">ID</th>
//                       <th className="p-3 border-b">Type</th>
//                       <th className="p-3 border-b">Dates</th>
//                       <th className="p-3 border-b">Reason</th>
//                       <th className="p-3 border-b">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {requests.length === 0 && (
//                       <tr>
//                         <td colSpan={5} className="p-6 text-center text-slate-500 italic">No leave requests found.</td>
//                       </tr>
//                     )}
//                     {requests.slice().reverse().map((r, i) => (
//                       <tr key={r.id} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-emerald-50 transition`}>
//                         <td className="p-3 border-b font-medium text-slate-700">{r.id}</td>
//                         <td className="p-3 border-b">{r.leaveTypeName}</td>
//                         <td className="p-3 border-b text-slate-600">{new Date(r.startDate).toLocaleDateString()} → {new Date(r.endDate).toLocaleDateString()}</td>
//                         <td className="p-3 border-b">{r.reason}</td>
//                         <td className="p-3 border-b">
//                           <span className={
//                             r.status === "Approved" ? "text-green-700 font-semibold" :
//                               r.status === "Rejected" ? "text-red-700 font-semibold" : "text-amber-700 font-semibold"
//                           }>{r.status}</span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }



// app/employee/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import LeaveOverview from "../../../components/LeaveOverview";
import ApplyLeaveForm from "../../../components/ApplyLeaveForm";
import LeaveCalendar from "../../../components/LeaveCalendar";
import LeaveList from "../../../components/LeaveList";
import Notifications from "../../../components/Notifications";
import Sidebar from "@/components/Sidebar";
import type { LeaveRequestDto, LeaveTypeDto } from "../../../types/index";
import { getUserFromToken } from "../../../utils/auth";

export default function EmployeePage() {
  const [allLeaves, setAllLeaves] = useState<LeaveRequestDto[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveTypeDto[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  async function fetchData() {
    const [lr, lt] = await Promise.all([
      api.get<LeaveRequestDto[]>("/leaverequests"),
      api.get<LeaveTypeDto[]>("/leavetypes"),
    ]);
    setAllLeaves(lr.data);
    setLeaveTypes(lt.data);
  }

  useEffect(()=>{ fetchData(); }, []);

  const user = getUserFromToken();
  const userLeaves = allLeaves.filter(l => l.userId === user?.id);

  // demo balances - you can replace with backend-provided balance endpoint
  const balances = [
    { label: "Annual Leave", value: 24 },
    { label: "Medical Leave", value: 10 },
    { label: "Pending", value: userLeaves.filter(l=>l.status==="Pending").length },
    { label: "Remaining", value: 12 },
  ];

  // notifications from leave status updates
  useEffect(()=>{
    const recent = userLeaves.slice().reverse().slice(0,5).map(l=>`${l.status}: ${l.leaveTypeName} (${new Date(l.startDate).toLocaleDateString()})`);
    setNotifications(recent);
  }, [allLeaves]);

  function refresh(){ fetchData(); }

  return (
    <div>
      <LeaveOverview balances={balances} />

      <div className="grid-2">
        <div>
          <ApplyLeaveForm leaveTypes={leaveTypes} onDone={refresh} />
          <div style={{ height: 16 }} />
          <LeaveList leaves={userLeaves} />
        </div>

        <div>
          <LeaveCalendar leaves={userLeaves} />
          <div style={{ height: 12 }} />
          <Notifications items={notifications} />
        </div>
      </div>
    </div>
  );
}


