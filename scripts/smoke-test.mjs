const base = process.env.BASE_URL ?? "http://localhost:3000";

async function createEntry() {
  const res = await fetch(`${base}/api/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "민성",
      message: "방명록 테스트입니다",
      password: "test1234",
    }),
  });
  const data = await res.json();
  console.log("create:", res.status, data);
  return data;
}

async function list() {
  const res = await fetch(`${base}/api/entries`);
  const data = await res.json();
  console.log("list count:", data.length, "first:", data[0]);
  return data;
}

async function updateWrongPassword(id) {
  const res = await fetch(`${base}/api/entries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "해킹시도", password: "wrong" }),
  });
  console.log("update wrong password (should be 403):", res.status, await res.json());
}

async function updateCorrectPassword(id) {
  const res = await fetch(`${base}/api/entries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "수정된 메시지입니다", password: "test1234" }),
  });
  console.log("update correct password:", res.status, await res.json());
}

async function deleteWrongPassword(id) {
  const res = await fetch(`${base}/api/entries/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "wrong" }),
  });
  console.log("delete wrong password (should be 403):", res.status, await res.json());
}

async function deleteCorrectPassword(id) {
  const res = await fetch(`${base}/api/entries/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "test1234" }),
  });
  console.log("delete correct password:", res.status, await res.json());
}

const entry = await createEntry();
await list();
await updateWrongPassword(entry.id);
await updateCorrectPassword(entry.id);
await deleteWrongPassword(entry.id);
await deleteCorrectPassword(entry.id);
await list();
