import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

export async function createClient() {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    sql = postgres(connectionString, {
      max: 10, // Maximum number of connections
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return sql;
}

export async function getDB() {
  return createClient();
}
