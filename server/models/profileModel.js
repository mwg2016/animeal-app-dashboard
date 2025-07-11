const knex = require("../config/db");

const getAdminByUsername = (username) => {
  return knex("admin_credentials")
    .where({ username })
    .first();
};

const updateAdminPassword = (username, hashedPassword) => {
  return knex("admin_credentials")
    .where({ username })
    .update({ password: hashedPassword });
};

module.exports = { getAdminByUsername, updateAdminPassword };
