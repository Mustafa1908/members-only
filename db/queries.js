const pool = require("./pool");

async function insertNewUser(user, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [user.userName, user.firstName, user.lastName, hashedPassword, false]
  );
}

async function updateUserMembership(username) {
  await pool.query(
    `UPDATE users SET membership_status = true WHERE username = '${username}'`
  );
}

async function createNewMessage(username, messageData, date) {
  const { rows } = await pool.query(
    `SELECT id FROM users WHERE username = '${username}' `
  );

  await pool.query(
    `INSERT INTO messages (id, message_title, message, time) VALUES ($1, $2, $3, $4)`,
    [rows[0].id, messageData.messageTitle, messageData.message, date]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT users.id, username, message_title, message, time FROM users INNER JOIN messages ON users.id = messages.id;
`
  );

  return rows;
}

module.exports = {
  insertNewUser,
  updateUserMembership,
  createNewMessage,
  getAllMessages,
};
