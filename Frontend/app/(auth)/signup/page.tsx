"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import styles from "../../styles/Auth.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await api.post("/Auth/register", {
        userName: form.userName,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      setMsg({ type: "success", text: "User registered successfully — redirecting to login…" });
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      const text = err?.response?.data ?? "Registration failed. Please check details.";
      setMsg({ type: "error", text: String(text) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} role="main" aria-labelledby="signup-title">
        <div className={styles.brand}>
          <h1 id="signup-title" className={styles.title}>Create an account</h1>
          <div className={styles.subtitle}>Enter your details to register — you'll be redirected to login on success.</div>
        </div>

        <form onSubmit={submit} className={styles.form} autoComplete="on">
          <div>
            <label className={styles.fieldLabel} htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              required
              value={form.userName}
              onChange={(e) => setForm(f => ({ ...f, userName: e.target.value }))}
              placeholder="e.g. employee1"
              className={styles.input}
              autoFocus
            />
          </div>

          <div>
            <label className={styles.fieldLabel} htmlFor="fullname">Full name</label>
            <input
              id="fullname"
              name="fullname"
              required
              value={form.fullName}
              onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
              placeholder="Your full name"
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.fieldLabel} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@company.com"
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.fieldLabel} htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Choose a strong password"
              className={styles.input}
            />
          </div>

          {msg && (
            <div className={`${styles.message} ${msg.type === "success" ? styles.success : styles.error}`} role="status">
              {msg.text}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? "Registering..." : "Register"}
            </button>
            <button type="button" onClick={() => router.push("/login")} className={styles.link} style={{ alignSelf: "center" }}>
              Back to login
            </button>
          </div>
        </form>

        <div className={styles.row}>
          <div className={styles.small}>Already have an account?</div>
          <button type="button" className={styles.link} onClick={() => router.push("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}