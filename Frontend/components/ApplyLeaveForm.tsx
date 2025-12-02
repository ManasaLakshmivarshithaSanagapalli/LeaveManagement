// src/components/ApplyLeaveForm.tsx
"use client";
import React, { useState } from "react";
import api from "../utils/api";
import type { LeaveTypeDto } from "../types/index";
import { getUserFromToken } from "../utils/auth";

export default function ApplyLeaveForm({ leaveTypes, onDone }: { leaveTypes: LeaveTypeDto[]; onDone: () => void; }) {
  const [leaveTypeId, setLeaveTypeId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      // If you support file upload: use FormData and backend must accept multipart/form-data
      const user = getUserFromToken();
      if (!user) throw new Error("Not logged in");

      if (file) {
        const fd = new FormData();
        fd.append("UserId", user.id);
        fd.append("LeaveTypeId", leaveTypeId);
        fd.append("StartDate", startDate);
        fd.append("EndDate", endDate);
        fd.append("Reason", reason);
        fd.append("Attachment", file);
        await api.post("/leaverequests/withfile", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await api.post("/leaverequests", {
          userId: user.id,
          leaveTypeId: Number(leaveTypeId),
          startDate,
          endDate,
          reason
        });
      }
      setMsg("Request submitted");
      setLeaveTypeId(""); setStartDate(""); setEndDate(""); setReason(""); setFile(null);
      onDone();
    } catch (err) {
      setMsg("Failed to submit request");
    } finally { setLoading(false); }
  }

  return (
    <div className="card apply-form">
      <h3>Apply for Leave</h3>
      <form onSubmit={submit}>
        <div className="row">
          <div>
            <label className="small-muted">Leave Type</label>
            <select className="input" value={leaveTypeId} onChange={e=>setLeaveTypeId(e.target.value)} required>
              <option value="">Select</option>
              {leaveTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="small-muted">Attach (optional)</label>
            <input type="file" className="input" onChange={e=>setFile(e.target.files?.[0]||null)} />
          </div>
        </div>

        <div className="row" style={{ marginTop:12 }}>
          <div>
            <label className="small-muted">Start</label>
            <input className="input" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} required />
          </div>
          <div>
            <label className="small-muted">End</label>
            <input className="input" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} required />
          </div>
        </div>

        <div style={{ marginTop:12 }}>
          <label className="small-muted">Reason</label>
          <textarea className="textarea" value={reason} onChange={e=>setReason(e.target.value)} required />
        </div>

        <div style={{ marginTop:12, display:"flex", gap:8 }}>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Sending..." : "Submit"}</button>
          <button className="btn btn-ghost" type="button" onClick={()=>{ setLeaveTypeId(""); setStartDate(""); setEndDate(""); setReason(""); setFile(null); }}>Reset</button>
        </div>

        {msg && <div className="small-muted" style={{ marginTop:10 }}>{msg}</div>}
      </form>
    </div>
  );
}
