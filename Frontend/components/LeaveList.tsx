// src/components/LeaveList.tsx
"use client";
import React from "react";
import type { LeaveRequestDto } from "../types/index";

export default function LeaveList({ leaves = [] as LeaveRequestDto[] }) {
  return (
    <div className="card">
      <h4>Leave History</h4>
      <div className="leave-list" style={{ marginTop:12 }}>
        {leaves.map(l => (
          <div className="leave-item" key={l.id}>
            <div>
              <div style={{ fontWeight:700 }}>{l.leaveTypeName || "Leave"}</div>
              <div className="leave-meta">{new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}</div>
              <div className="leave-meta">Requested by: {l.userName || "-"}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div className={`badge ${l.status.toLowerCase()}`}>{l.status}</div>
              <div className="leave-meta" style={{ marginTop:8 }}>{l.totalDays} days</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
