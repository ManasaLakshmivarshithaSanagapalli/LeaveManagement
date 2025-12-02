"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../../utils/api";
import styles from "../../styles/Auth.module.css";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search?.get("token") ?? "";
  const userId = search?.get("userId") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !userId) {
      setMsg({ type: "error", text: "No reset token found. Request a reset from login page." });
    }
  }, [token, userId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      await api.post("/Auth/resetpassword", { userId, token, newPassword: password });
      setMsg({ type: "success", text: "Password updated successfully. Redirecting to login..." });
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      setMsg({ type: "error", text: err?.response?.data ?? "Reset failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} role="main" aria-labelledby="reset-title">
        <div className={styles.brand}>
          <h1 id="reset-title" className={styles.title}>Set a new password</h1>
          <div className={styles.subtitle}>Securely update your account password</div>
        </div>

        <form onSubmit={submit} className={styles.form} autoComplete="off">
          <div>
            <label className={styles.fieldLabel} htmlFor="newpassword">New password</label>
            <input
              id="newpassword"
              name="newpassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password"
              type="password"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div>
            <label className={styles.fieldLabel} htmlFor="confirmpassword">Confirm password</label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm password"
              type="password"
              className={styles.input}
              required
            />
          </div>

          {msg && (
            <div className={`${styles.message} ${msg.type === "success" ? styles.success : styles.error}`} role="status">
              {msg.text}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button disabled={loading || !token || !userId} className={styles.button}>
              {loading ? "Saving..." : "Set password"}
            </button>
            <button type="button" onClick={() => router.push("/login")} className={styles.link} style={{ alignSelf: "center" }}>
              Back
            </button>
          </div>
        </form>

        <div className={styles.row}>
          <div className={styles.small}>Remember your password?</div>
          <button type="button" className={styles.link} onClick={() => router.push("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}