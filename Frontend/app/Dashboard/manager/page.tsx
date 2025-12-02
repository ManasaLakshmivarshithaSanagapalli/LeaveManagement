// "use client";
// import React, { useEffect, useState } from "react";
// import api from "@/utils/api";
// import type { LeaveRequestDto } from "@/types";

// export default function ManagerDashboard() {
//   const [requests, setRequests] = useState<LeaveRequestDto[]>([]);

//   useEffect(() => { fetchAll(); }, []);

//   async function fetchAll() {
//     const res = await api.get<LeaveRequestDto[]>("/leaverequests");
//     setRequests(res.data);
//   }

//   async function approve(id: number) {
//     await api.put(`/leaverequests/${id}/approve`);
//     await fetchAll();
//   }
//   async function reject(id: number) {
//     await api.put(`/leaverequests/${id}/reject`);
//     await fetchAll();
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl mb-4">Pending Requests</h2>
//       <table className="w-full border">
//         <thead><tr><th>#</th><th>User</th><th>Type</th><th>Dates</th><th>Reason</th><th>Action</th></tr></thead>
//         <tbody>
//           {requests.map(r => (
//             <tr key={r.id}>
//               <td>{r.id}</td>
//               <td>{r.userName}</td>
//               <td>{r.leaveTypeName}</td>
//               <td>{new Date(r.startDate).toLocaleDateString()}→{new Date(r.endDate).toLocaleDateString()}</td>
//               <td>{r.reason}</td>
//               <td>
//                 {r.status === "Pending" ? (
//                   <>
//                     <button onClick={() => approve(r.id)} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">Approve</button>
//                     <button onClick={() => reject(r.id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
//                   </>
//                 ) : r.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// "use client";
// import React, { useEffect, useState } from "react";
// import api from "@/utils/api";
// import type { LeaveRequestDto } from "@/types";

// export default function ManagerDashboard() {
//   const [requests, setRequests] = useState<LeaveRequestDto[]>([]);
//   const [loadingId, setLoadingId] = useState<number | null>(null);

//   useEffect(() => { fetchAll(); }, []);

//   async function fetchAll() {
//     const res = await api.get<LeaveRequestDto[]>("/leaverequests");
//     setRequests(res.data);
//   }

//   async function approve(id: number) {
//     setLoadingId(id);
//     await api.put(`/leaverequests/${id}/approve`);
//     await fetchAll();
//     setLoadingId(null);
//   }
//   async function reject(id: number) {
//     setLoadingId(id);
//     await api.put(`/leaverequests/${id}/reject`);
//     await fetchAll();
//     setLoadingId(null);
//   }

//   const pending = requests.filter(r => r.status === "Pending");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50 to-cyan-50 py-10">
//       <div className="max-w-6xl mx-auto px-6">
//         <header className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-800">Manager Portal</h1>
//             <p className="text-slate-500 mt-1">Review and action leave requests</p>
//           </div>
//           <div className="text-sm text-slate-600">Pending: <span className="font-semibold text-amber-600">{pending.length}</span></div>
//         </header>

//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pending.length === 0 && (
//             <div className="col-span-full p-8 rounded-xl bg-white/80 shadow text-center text-slate-500">No pending requests.</div>
//           )}

//           {pending.map(r => (
//             <div key={r.id} className="rounded-xl p-4 bg-white/90 border shadow hover:shadow-lg transition">
//               <div className="flex items-start gap-3">
//                 <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">{r.id}</div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-sm font-semibold text-slate-800">{r.userName}</div>
//                       <div className="text-xs text-slate-500">{r.leaveTypeName} • {new Date(r.startDate).toLocaleDateString()} → {new Date(r.endDate).toLocaleDateString()}</div>
//                     </div>
//                     <div className="text-xs text-slate-500">{r.totalDays} days</div>
//                   </div>

//                   <p className="mt-3 text-slate-700">{r.reason}</p>

//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => approve(r.id)}
//                       disabled={loadingId === r.id}
//                       className={`flex-1 px-3 py-2 rounded-md font-semibold text-white transition
//                         ${loadingId === r.id ? "bg-green-300" : "bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105"}`}
//                     >
//                       {loadingId === r.id ? "Approving..." : "Approve"}
//                     </button>
//                     <button
//                       onClick={() => reject(r.id)}
//                       disabled={loadingId === r.id}
//                       className={`flex-1 px-3 py-2 rounded-md font-semibold text-white transition
//                         ${loadingId === r.id ? "bg-red-300" : "bg-gradient-to-r from-rose-500 to-red-600 hover:scale-105"}`}
//                     >
//                       {loadingId === r.id ? "Rejecting..." : "Reject"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* All requests summary table (optional) */}
//         <section className="mt-8 rounded-xl p-4 bg-white/60 shadow border">
//           <h2 className="text-lg font-bold text-slate-800 mb-3">All Requests</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="text-slate-600">
//                 <tr>
//                   <th className="py-2">ID</th>
//                   <th>User</th>
//                   <th>Type</th>
//                   <th>Dates</th>
//                   <th>Status</th>
//                   <th>Approver</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map(r => (
//                   <tr key={r.id} className="border-t">
//                     <td className="py-2 font-medium text-slate-700">{r.id}</td>
//                     <td>{r.userName}</td>
//                     <td>{r.leaveTypeName}</td>
//                     <td className="text-sm text-slate-600">{new Date(r.startDate).toLocaleDateString()} → {new Date(r.endDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className={
//                         r.status === "Approved" ? "text-green-700" :
//                         r.status === "Rejected" ? "text-red-700" : "text-amber-700"
//                       }>{r.status}</span>
//                     </td>
//                     <td className="text-sm text-slate-600">{r.approverName || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }














// app/manager/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import type { LeaveRequestDto } from "../../../types/index";
import LeaveCalendar from "../../../components/LeaveCalendar";

export default function ManagerPage(){
  const [leaves, setLeaves] = useState<LeaveRequestDto[]>([]);
  const [pending, setPending] = useState<LeaveRequestDto[]>([]);

  async function fetchAll(){
    const res = await api.get<LeaveRequestDto[]>("/leaverequests");
    setLeaves(res.data);
    setPending(res.data.filter(l=>l.status==="Pending"));
  }

  useEffect(()=>{ fetchAll(); }, []);

  async function approve(id:number){
    await api.put(`/leaverequests/${id}/approve`);
    fetchAll();
  }
  async function reject(id:number){
    await api.put(`/leaverequests/${id}/reject`);
    fetchAll();
  }

  return (
    <div>
      <h2 style={{ marginBottom:12 }}>Team Pending Requests</h2>

      <div className="card" style={{ marginBottom:12 }}>
        {pending.length === 0 ? <div className="small-muted">No pending requests</div> : pending.map(l=>(
          <div key={l.id} className="leave-item" style={{ marginBottom:10 }}>
            <div>
              <div style={{ fontWeight:700 }}>{l.userName}</div>
              <div className="leave-meta">{l.leaveTypeName} • {new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}</div>
              <div className="small-muted">{l.reason}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <button className="btn btn-primary" onClick={()=>approve(l.id)}>Approve</button>
              <button className="btn btn-ghost" onClick={()=>reject(l.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom:12 }}>
        <h3>Team Calendar</h3>
        <LeaveCalendar leaves={leaves}/>
      </div>

      <div className="card analytics">
        <div>
          <h4>Analytics</h4>
          <div className="small-muted">Basic team insights - extend from backend metrics</div>
        </div>
        <div>
          <h4>Totals</h4>
          <div className="small-muted">Total leaves: {leaves.length}</div>
        </div>
      </div>
    </div>
  );
}
