import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL이 설정되지 않았습니다. .env.local 파일에 Neon Connection String을 넣어주세요."
  );
}

export const sql = neon(process.env.DATABASE_URL);
