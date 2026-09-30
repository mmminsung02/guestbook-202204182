import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/password";

type CreateEntryBody = {
  name?: unknown;
  message?: unknown;
  password?: unknown;
};

export async function GET() {
  const entries = await sql`
    select id, name, message, created_at, updated_at
    from entries
    order by created_at desc
  `;
  return Response.json(entries);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateEntryBody;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (name.length === 0) {
    return Response.json({ error: "이름을 입력해주세요." }, { status: 400 });
  }
  if (message.length === 0) {
    return Response.json({ error: "메시지를 입력해주세요." }, { status: 400 });
  }
  if (password.length < 4) {
    return Response.json(
      { error: "비밀번호는 4자 이상 입력해주세요." },
      { status: 400 }
    );
  }

  const passwordHash = hashPassword(password);

  const [entry] = await sql`
    insert into entries (name, message, password_hash)
    values (${name}, ${message}, ${passwordHash})
    returning id, name, message, created_at, updated_at
  `;

  return Response.json(entry, { status: 201 });
}
