// src/components/Topbar.tsx
"use client";
import React from "react";

export default function Topbar({ title = "Leaves", subtitle = "" }: { title?: string; subtitle?: string; }) {
  return (
    <header className="topbar">
      <div>
        <div className="title">{title}</div>
        {subtitle && <div className="meta">{subtitle}</div>}
      </div>

      <div>
        <button className="btn btn-ghost">🔔</button>
      </div>
    </header>
  );
}
