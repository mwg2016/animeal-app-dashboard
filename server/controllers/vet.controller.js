const knex = require('../config/db'); 


const getVetRecords = (req, res) => {
  knex('vet_records') 
    .select('*') 
    .then((vet_record) => {
      res.json(vet_record);
    })
    .catch((err) => {
      console.error('Error fetching commission details:', err);
      res.status(500).json({ message: 'Error fetching data' }); 
    });
};

module.exports = { 
  getVetRecords
};
