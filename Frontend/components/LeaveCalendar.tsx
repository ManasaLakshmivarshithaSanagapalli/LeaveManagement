// src/components/LeaveCalendar.tsx
"use client";
import React from "react";
import type { LeaveRequestDto } from "../types/index";

function getMonthDays(year:number, month:number){
  const first = new Date(year, month, 1);
  const last = new Date(year, month+1, 0);
  const arr = [];
  for(let d=1; d<=last.getDate(); d++) arr.push(new Date(year, month, d));
  return arr;
}

export default function LeaveCalendar({ leaves = [] as LeaveRequestDto[] }){
  const now = new Date();
  const days = getMonthDays(now.getFullYear(), now.getMonth());
  const leaveSet = new Set<string>();
  leaves.forEach(l=>{
    const s = new Date(l.startDate);
    const e = new Date(l.endDate);
    for(let d=new Date(s); d<=e; d.setDate(d.getDate()+1)){
      leaveSet.add(new Date(d).toISOString().slice(0,10));
    }
  });

  return (
    <div className="card calendar">
      <h4>Calendar - {now.toLocaleString('default',{month:'long', year:'numeric'})}</h4>
      <div className="cal-grid" style={{ marginTop:10 }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=> <div key={x} style={{ fontWeight:700, color:"#6b7280"}}>{x}</div>)}
        {days.map(d=>{
          const iso = d.toISOString().slice(0,10);
          const isLeave = leaveSet.has(iso);
          return <div key={iso} className={`cal-cell ${isLeave ? "leave":""}`}>
            <div className="date">{d.getDate()}</div>
            <div className="small-muted">{isLeave ? "On leave" : ""}</div>
          </div>;
        })}
      </div>
    </div>
  );
}
