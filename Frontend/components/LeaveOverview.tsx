// src/components/LeaveOverview.tsx
"use client";
import React from "react";

export default function LeaveOverview({ balances }: { balances: { label:string; value:number; sub?:string }[] }) {
  return (
    <div className="overview-row">
      {balances.map(b => (
        <div key={b.label} className="mini card">
          <div className="value">{b.value}</div>
          <div className="label">{b.label}</div>
          {b.sub && <div className="small-muted">{b.sub}</div>}
        </div>
      ))}
    </div>
  );
}
