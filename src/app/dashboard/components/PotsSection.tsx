import PotsWidget from '@/app/ui/dashboard/PotsWidget';
import { getDB } from '@/lib/db';
import { Pot } from '@/lib/definitions';

export default async function PotsSection() {
  const sql = await getDB();
  const pots = await sql`SELECT * FROM pots`;

  return <PotsWidget pots={pots as unknown as Pot[]} />;
}
