import { DEVELOPER_NAME, STUDENT_ID } from "@/lib/config";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      만든 사람: <strong>{DEVELOPER_NAME}</strong> · 학번 {STUDENT_ID}
    </footer>
  );
}
