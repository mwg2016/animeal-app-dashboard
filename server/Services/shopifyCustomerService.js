// const axios = require('axios');
// const {
//     createCustomerTable,
//     insertOrUpdateCustomers
// } = require('../models/custom_backend/insertCustomerToDb');

// const baseUrl = process.env.STORE_URL;
// const accessToken = process.env.ACCESS_TOKEN;

// const getAllCustomersAndSave = async () => {
//     if (!baseUrl || !accessToken) throw new Error("Missing Shopify API credentials");

//     await createCustomerTable();

//     let allCustomers = [];
//     let nextLink = `${baseUrl}/admin/api/2023-04/customers.json?limit=250`;

//     const headers = {
//         "X-Shopify-Access-Token": accessToken,
//         "Content-Type": "application/json"
//     };

//     while (nextLink) {
//         const response = await axios.get(nextLink, { headers });
//         const customers = response.data.customers;

//         if (!customers || customers.length === 0) break;

//         const linkHeader = response.headers.link;
//         nextLink = null;
//         if (linkHeader) {
//             const links = linkHeader.split(',').map(s => s.trim());
//             for (const link of links) {
//                 const match = link.match(/<(.*)>; rel="next"/);
//                 if (match && match[1]) {
//                     nextLink = match[1];
//                     break;
//                 }
//             }
//         }

//         allCustomers.push(...customers);
//         await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit pause
//     }

//     const validCustomers = allCustomers
//         .filter(c => c.phone)
//         .map(customer => ({
//             mobile_number: customer.phone,
//             customer_name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim(),
//             email: customer.email || null,
//             vet_code_linkage: null,
//             customer_type: null,
//             addresses: JSON.stringify(customer.addresses || []),
//             shopify_customer_id: customer.id
//         }));

//     await insertOrUpdateCustomers(validCustomers);

//     return {
//         totalFetched: allCustomers.length,
//         totalSaved: validCustomers.length,
//         totalSkipped: allCustomers.length - validCustomers.length
//     };
// };

// module.exports = {
//     getAllCustomersAndSave
// };


// const axios = require('axios');
// const {
//     createCustomerTable,
//     insertOrUpdateCustomers
// } = require('../models/custom_backend/insertCustomerToDb');
// const { log } = require('../utils/logger');

// const baseUrl = process.env.STORE_URL;
// const accessToken = process.env.ACCESS_TOKEN;

// const getAllCustomersAndSave = async () => {
//     if (!baseUrl || !accessToken) throw new Error("Missing Shopify API credentials");

//     await createCustomerTable();

//     let allCustomers = [];
//     let nextLink = `${baseUrl}/admin/api/2023-04/customers.json?limit=250`;
//     const headers = {
//         "X-Shopify-Access-Token": accessToken,
//         "Content-Type": "application/json"
//     };

//     let batchCount = 0;

//     while (nextLink) {
//         batchCount++;
//         log(`🔄 Fetching batch #${batchCount} from Shopify...`);

//         const response = await axios.get(nextLink, { headers });
//         const customers = response.data.customers;

//         if (!customers || customers.length === 0) {
//             log(`✅ No more customers in batch #${batchCount}. Pagination complete.`);
//             break;
//         }

//         log(`📦 Batch #${batchCount} fetched: ${customers.length} customers.`);

//         allCustomers.push(...customers);

//         // Parse link header
//         nextLink = null;
//         const linkHeader = response.headers.link;
//         if (linkHeader) {
//             const links = linkHeader.split(',').map(s => s.trim());
//             for (const link of links) {
//                 const match = link.match(/<(.*)>; rel="next"/);
//                 if (match && match[1]) {
//                     nextLink = match[1];
//                     break;
//                 }
//             }
//         }

//         log(`➡️ Next page: ${nextLink || 'None (end)'}`);
//         await new Promise(resolve => setTimeout(resolve, 500));
//     }

//     // Save all raw customers without filtering by phone:
//     const customersToSave = allCustomers.map(c => ({
//         mobile_number: c.phone || null,
//         customer_name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
//         email: c.email || null,
//         vet_code_linkage: null,
//         customer_type: null,
//         addresses: JSON.stringify(c.addresses || []),
//         shopify_customer_id: c.id
//     }));

//     log(`💾 Saving ${customersToSave.length} customers (including those without phone) to DB...`);

//     await insertOrUpdateCustomers(customersToSave);
//     log(`💾 Saved ${customersToSave.length} customers to DB.`);

//     return {
//         totalFetched: allCustomers.length,
//         totalSaved: customersToSave.length,
//         totalSkipped: 0
//     };
// };

// module.exports = {
//     getAllCustomersAndSave
// };


const axios = require('axios');
const knex = require('../config/db'); // your knex instance
const {
    createCustomerTable,
    insertOrUpdateCustomers
} = require('../models/custom_backend/insertCustomerToDb');
const { log } = require('../utils/logger');

const baseUrl = process.env.STORE_URL;
const accessToken = process.env.ACCESS_TOKEN;

const getAllCustomersAndSave = async () => {
    if (!baseUrl || !accessToken) throw new Error("Missing Shopify API credentials");

    await createCustomerTable();

    let allCustomers = [];
    let nextLink = `${baseUrl}/admin/api/2023-04/customers.json?limit=250`;
    const headers = {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json"
    };

    let batchCount = 0;

    while (nextLink) {
        batchCount++;
        log(`🔄 Fetching batch #${batchCount} from Shopify...`);

        const response = await axios.get(nextLink, { headers });
        const customers = response.data.customers;

        if (!customers || customers.length === 0) {
            log(`✅ No more customers in batch #${batchCount}. Pagination complete.`);
            break;
        }

        log(`📦 Batch #${batchCount} fetched: ${customers.length} customers.`);
        allCustomers.push(...customers);

        // Parse link header for pagination
        nextLink = null;
        const linkHeader = response.headers.link;
        if (linkHeader) {
            const links = linkHeader.split(',').map(s => s.trim());
            for (const link of links) {
                const match = link.match(/<(.*)>; rel="next"/);
                if (match && match[1]) {
                    nextLink = match[1];
                    break;
                }
            }
        }

        log(`➡️ Next page: ${nextLink || 'None (end)'}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    log(`📊 Total customers fetched from Shopify: ${allCustomers.length}`);

    // Prepare data for saving
    const customersToSave = allCustomers.map(c => ({
        mobile_number: c.phone || null,
        customer_name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
        email: c.email || null,
        vet_code_linkage: null,
        customer_type: null,
        addresses: JSON.stringify(c.addresses || []),
        shopify_customer_id: c.id
    }));

    // ✅ Check for existing customer IDs in DB
    const fetchedIds = allCustomers.map(c => c.id);
    const existingIds = await knex('Customers').whereIn('shopify_customer_id', fetchedIds).pluck('shopify_customer_id');
    const existingIdSet = new Set(existingIds);

    const newCount = fetchedIds.filter(id => !existingIdSet.has(id)).length;
    const duplicateCount = existingIds.length;

    log(`🆕 New customers (not in DB): ${newCount}`);
    log(`🔁 Duplicate customers (already in DB): ${duplicateCount}`);

    // Insert or update all customers
    await insertOrUpdateCustomers(customersToSave);
    log(`💾 Saved ${customersToSave.length} customers to DB (insert or update).`);

    return {
        totalFetched: allCustomers.length,
        totalSaved: customersToSave.length,
        totalNew: newCount,
        totalDuplicates: duplicateCount
    };
};

module.exports = {
    getAllCustomersAndSave
};
