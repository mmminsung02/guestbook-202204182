import { sql } from "@/lib/db";

export type Entry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export async function getAllEntries(): Promise<Entry[]> {
  const rows = await sql`
    select id, name, message, created_at, updated_at
    from entries
    order by created_at desc
  `;
  return rows as Entry[];
}

export async function getPasswordHash(id: string): Promise<string | null> {
  const rows = (await sql`
    select password_hash from entries where id = ${id}
  `) as { password_hash: string }[];
  return rows[0]?.password_hash ?? null;
}
