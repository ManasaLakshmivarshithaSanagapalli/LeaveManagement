"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import styles from "../../styles/Auth.module.css";

export default function ForgotPasswordPage() {
  const [email, setemail] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await api.post("/Auth/forgotpassword", { email });
      if (res?.data?.token) {
        setMsg({ type: "success", text: `Reset token (dev): ${res.data.token}` });
      } else {
        setMsg({ type: "success", text: "If the account exists, a reset link was sent to the registered email." });
      }
      setemail("");
    } catch (error: any) {
      setMsg({ type: "error", text: "Error requesting password reset. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} role="main" aria-labelledby="forgot-title">
        <div className={styles.brand}>
          <h1 id="forgot-title" className={styles.title}>Reset your password</h1>
          <div className={styles.subtitle}>Enter your username or email to receive a reset link</div>
        </div>

        <form onSubmit={submit} className={styles.form} autoComplete="on">
          <div>
            <label className={styles.fieldLabel} htmlFor="username">email</label>
            <input
              id="username"
              name="username"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Username or email"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          {msg && (
            <div className={`${styles.message} ${msg.type === "error" ? styles.error : styles.success}`} role="status">
              {msg.text}
            </div>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className={styles.row}>
          <button type="button" className={styles.link} onClick={() => router.push("/login")}>
            Back to login
          </button>
          <button type="button" className={styles.link} onClick={() => router.push("/signup")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}