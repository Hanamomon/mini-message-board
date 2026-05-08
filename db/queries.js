const pool = require('./pool');

exports.insertMessage = async (text, author) => {
  await pool.query("INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)", [text, author, new Date()]);
}

exports.getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

exports.getMessage = async (id) => {
  console.log(id)
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return rows[0];
}