const knex = require("../config/db")

const getLoginDetails = (username, password) => {
    return knex('admin_credentials')
      .where({ username, password })
      .first();
  };

module.exports={getLoginDetails};