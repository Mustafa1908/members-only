const pool = require("./pool");

async function insertNewUser(user, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [user.userName, user.firstName, user.lastName, hashedPassword, false]
  );
}

module.exports = {
  insertNewUser,
};
