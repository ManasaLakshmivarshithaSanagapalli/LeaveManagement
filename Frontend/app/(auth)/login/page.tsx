// ...existing code...
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { saveToken, getUserFromToken } from "../../../utils/auth";
import styles from "../../styles/Auth.module.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await api.post<{ token: string }>("/Auth/login", { userName, password });
      saveToken(res.data.token);
      const user = getUserFromToken();
      // route by role
      if (user && user.roles?.includes("Employee")) router.push("/Dashboard/employee");
      else if (user && (user.roles?.includes("Manager") || user.roles?.includes("HR"))) router.push("/Dashboard/manager");
      else router.push("/Dashboard");
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 404) setMsg({ type: "error", text: "User not found. Please sign up." });
      else if (status === 401) setMsg({ type: "error", text: "Invalid credentials. Check your password." });
      else setMsg({ type: "error", text: (error?.response?.data && String(error.response.data)) || "Login failed. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} role="main" aria-labelledby="auth-title">
        <div className={styles.brand}>
          <h1 id="auth-title" className={styles.title}>Leave Management System</h1>
          <div className={styles.subtitle}>Sign in to your account</div>
        </div>

        <form onSubmit={submit} className={styles.form} autoComplete="on">
          <div>
            <label className={styles.fieldLabel} htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div>
            <label className={styles.fieldLabel} htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className={styles.input}
              required
            />
          </div>

          {msg && (
            <div className={`${styles.message} ${msg.type === "error" ? styles.error : styles.success}`} role="status">
              {msg.text}
            </div>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.row}>
          <button type="button" className={styles.link} onClick={() => router.push("/forgot-password")}>
            Forgot password?
          </button>
          <button type="button" className={styles.link} onClick={() => router.push("/signup")}>
            Sign up
          </button>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.small}>Need help?</div>
          <div className={styles.footerLink} onClick={() => router.push("/support")}>Contact support</div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...