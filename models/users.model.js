const db = require('../db');

exports.add = async ({ email, password, first, last }) => {
  if (!email || !password) {
    throw new Error('Missing Required Parameters');
  }

  await db.query(
    `INSERT INTO users (email, password, first_name, last_name) VALUES
    ($1, crypt($2, gen_salt('bf', 8)), $3, $4);`,
    [email, password, first, last]
  );
};

exports.authenticate = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Missing Required Parameters');
  }

  const result = await db.query(
    `SELECT * FROM users WHERE email = lower($1) AND
    password = crypt($2, password);`,
    [email, password]
  );

  return result.rowCount !== 0;
};
