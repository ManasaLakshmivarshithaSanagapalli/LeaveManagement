// src/components/Notifications.tsx
"use client";
import React from "react";

export default function Notifications({ items = [] as string[] }) {
  return (
    <div className="card notifications">
      <h4>Notifications</h4>
      {items.length === 0 ? <div className="notification">No notifications</div> : items.map((n,i)=><div key={i} className="notification">{n}</div>)}
    </div>
  );
}
