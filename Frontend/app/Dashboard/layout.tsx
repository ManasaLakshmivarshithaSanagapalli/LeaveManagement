"use client";
import React from "react";
import "../globals.css"; // if you have global CSS
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        {/* move sidebar/menu markup here */} 
        <Topbar />
        <Sidebar />
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}