const knex = require('../config/db');

const addRecord = (data) => knex('vet_records').insert(data);

const updateRecordStatus = async (id, approved) => {
  if (approved === "true") {
    return knex("vet_records").where({ id }).update({ approved: "true" });
  } else {
    return knex("vet_records").where({ id }).update({approved: "pending"});
  }
};
const getPendingOnly = () =>
  knex('vet_records').select('*').where({ approved: "false" });

const getRejectedOnly = () =>
  knex('vet_records').select('*').where({ approved: "pending" });

module.exports = {
  addRecord,
  updateRecordStatus,
  getPendingOnly,
  getRejectedOnly,
};