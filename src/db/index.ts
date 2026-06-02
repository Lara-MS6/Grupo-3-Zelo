import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('zelo.db');

// Cria tabela na hora que abre
db.execSync(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    password TEXT NOT NULL
  );
`);

export { db };