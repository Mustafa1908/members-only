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

module.exports = {
  insertNewUser,
  updateUserMembership,
};
