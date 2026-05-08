#! /usr/bin/env node

require('dotenv').config();

const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 200 ),
  username VARCHAR ( 10 ),
  added TIMESTAMPTZ
);
`;

const INSERT = `
INSERT INTO messages (text, username, added) 
VALUES
  ('Hi there!', 'Amando', $1),
  ('Hello World!', 'Charles', $1);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.query(INSERT, [new Date()]);
  await client.end();
  console.log("done");
}

main();