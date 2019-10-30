const db = require('../db');

exports.add = async ({ email, password, first, last }) => {
  if (!email || !password) {
    throw new Error('Missing Required Parameters');
  }

  const userid = await db.query(
    `INSERT INTO users (email, password, first_name, last_name) VALUES
    ($1, crypt($2, gen_salt('bf', 8)), $3, $4) RETURNING id;`,
    [email, password, first, last]
  );

  const cookie = await db.query(
    `INSERT INTO sessions (user_id) VALUES ($1) RETURNING (id || '-' || encode(hmac(id::text, key, 'sha256'), 'hex')) as cookie;`,
    [userid.rows[0].id]
  );

  return cookie.rows[0].cookie;
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

  if (result.rowCount !== 0) {
    const sessions = await db.query(
      `SELECT * FROM sessions WHERE user_id = $1;`,
      [result.rows[0].id]
    );

    if (sessions.rowCount > 10) {
      await db.query(`DELETE FROM sessions WHERE user_id = $1;`, [
        result.rows[0].id
      ]);
    }

    const cookie = await db.query(
      `INSERT INTO sessions (user_id) VALUES ($1) RETURNING (id || '-' || encode(hmac(id::text, key, 'sha256'), 'hex')) as cookie;`,
      [result.rows[0].id]
    );

    return cookie.rows[0].cookie;
  }

  return false;
};

exports.logout = async ({ cookie }) => {
  if (!cookie) {
    throw new Error('Missing Required Parameters');
  }

  await db.query(
    `DELETE FROM sessions WHERE (id || '-' || encode(hmac(id::text, key, 'sha256'), 'hex')) = $1;`,
    [cookie]
  );

  return true;
};

exports.logoutAll = async ({ cookie }) => {
  if (!cookie) {
    throw new Error('Missing Required Parameters');
  }

  const result = await db.query(
    `SELECT user_id FROM sessions WHERE (id || '-' || encode(hmac(id::text, key, 'sha256'), 'hex')) = $1;`,
    [cookie]
  );

  await db.query(`DELETE FROM sessions WHERE user_id = $1;`, [
    result.rows[0].user_id
  ]);

  return true;
};

exports.verify = async cookie => {
  try {
    if (!cookie) {
      return false;
    }

    const result = await db.query(
      `SELECT user_id FROM sessions WHERE (id || '-' || encode(hmac(id::text, key, 'sha256'), 'hex')) = $1;`,
      [cookie]
    );

    if (result.rowCount !== 0) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};
