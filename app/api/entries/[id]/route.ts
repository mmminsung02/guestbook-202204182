import { sql } from "@/lib/db";
import { getPasswordHash } from "@/lib/entries";
import { verifyPassword } from "@/lib/password";

type UpdateEntryBody = { message?: unknown; password?: unknown };
type DeleteEntryBody = { password?: unknown };

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as UpdateEntryBody;

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (message.length === 0) {
    return Response.json({ error: "메시지를 입력해주세요." }, { status: 400 });
  }

  const storedHash = await getPasswordHash(id);
  if (!storedHash) {
    return Response.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }
  if (!verifyPassword(password, storedHash)) {
    return Response.json(
      { error: "비밀번호가 일치하지 않습니다." },
      { status: 403 }
    );
  }

  const [entry] = await sql`
    update entries
    set message = ${message}, updated_at = now()
    where id = ${id}
    returning id, name, message, created_at, updated_at
  `;

  return Response.json(entry);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as DeleteEntryBody;
  const password = typeof body.password === "string" ? body.password : "";

  const storedHash = await getPasswordHash(id);
  if (!storedHash) {
    return Response.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }
  if (!verifyPassword(password, storedHash)) {
    return Response.json(
      { error: "비밀번호가 일치하지 않습니다." },
      { status: 403 }
    );
  }

  await sql`delete from entries where id = ${id}`;

  return Response.json({ ok: true });
}
