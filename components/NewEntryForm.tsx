"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./forms.module.css";

export default function NewEntryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "작성에 실패했습니다.");
        return;
      }

      setName("");
      setMessage("");
      setPassword("");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>새 글 남기기</h2>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        required
      />
      <input
        type="password"
        placeholder="비밀번호 (수정·삭제할 때 필요, 4자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={4}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "작성 중..." : "남기기"}
      </button>
    </form>
  );
}
