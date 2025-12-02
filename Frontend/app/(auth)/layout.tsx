"use client";
import React from "react";
import styles from "../styles/Auth.module.css"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}