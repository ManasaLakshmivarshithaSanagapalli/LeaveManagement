// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import React from "react";
export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="brand">Leave Ledger</div>

      <nav className="nav">
        <Link href="/employee" className="active">Dashboard</Link>
        <Link href="/employee/apply">Apply</Link>
        <Link href="/employee/calendar">Calendar</Link>
        <Link href="/employee/history">History</Link>
        <Link href="/employee/notifications">Notifications</Link>
        <Link href="/manager">Manager</Link>
      </nav>
    </aside>
  );
}
