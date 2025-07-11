const knex = require('../config/db');

const getReportsDetails = async() => {
try {
    const results = await knex('commission_details')
.select('*');
return results;
} catch (error) {
    console.log("Error in Fetching Reports Details", error.message);
}

}

module.exports = { getReportsDetails };