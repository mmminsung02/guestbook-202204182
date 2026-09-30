import { getAllEntries } from "@/lib/entries";
import NewEntryForm from "@/components/NewEntryForm";
import EntryCard from "@/components/EntryCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const entries = await getAllEntries();

  return (
    <main>
      <h1>미니 방명록</h1>

      <NewEntryForm />

      {entries.length === 0 && <p>아직 남겨진 글이 없습니다.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </ul>
    </main>
  );
}
