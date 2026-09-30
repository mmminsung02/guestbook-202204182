"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Entry } from "@/lib/entries";
import styles from "./EntryCard.module.css";

type Mode = "view" | "editing" | "deleting";

export default function EntryCard({ entry }: { entry: Entry }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("view");
  const [message, setMessage] = useState(entry.message);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const edited = entry.updated_at !== entry.created_at;

  function reset() {
    setMode("view");
    setMessage(entry.message);
    setPassword("");
    setError(null);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/entries/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "수정에 실패했습니다.");
        return;
      }
      setMode("view");
      setPassword("");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/entries/${entry.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "삭제에 실패했습니다.");
        return;
      }
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <strong>{entry.name}</strong>
        <span className={styles.time}>
          {new Date(entry.created_at).toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
          })}
          {edited && " (수정됨)"}
        </span>
      </div>

      {mode === "view" && (
        <>
          <p className={styles.message}>{entry.message}</p>
          <div className={styles.actions}>
            <button onClick={() => setMode("editing")}>수정</button>
            <button onClick={() => setMode("deleting")}>삭제</button>
          </div>
        </>
      )}

      {mode === "editing" && (
        <form onSubmit={handleUpdate} className={styles.inlineForm}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type="submit" disabled={submitting}>
              {submitting ? "저장 중..." : "저장"}
            </button>
            <button type="button" onClick={reset}>
              취소
            </button>
          </div>
        </form>
      )}

      {mode === "deleting" && (
        <form onSubmit={handleDelete} className={styles.inlineForm}>
          <p>이 글을 삭제하려면 비밀번호를 입력하세요.</p>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type="submit" disabled={submitting}>
              {submitting ? "삭제 중..." : "삭제 확인"}
            </button>
            <button type="button" onClick={reset}>
              취소
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
