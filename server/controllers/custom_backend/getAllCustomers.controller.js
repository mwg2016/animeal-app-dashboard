// const axios = require('axios');
// const fs = require('fs');
// require("dotenv").config();

// const baseUrl = process.env.STORE_URL;
// const accessToken = process.env.ACCESS_TOKEN;

// const getAllCustomers = async (req, res) => {
//     if (!baseUrl || !accessToken) {
//         console.error("Missing environment variables: STORE_URL or ACCESS_TOKEN.");
//         return res.status(500).json({
//             success: false,
//             message: 'Missing Shopify API credentials in environment variables.'
//         });
//     }

//     const allCustomers = [];
//     let nextLink = `${baseUrl}/admin/api/2023-04/customers.json?limit=250`; // Start with the initial URL
//     let iteration = 0;

//     const headers = {
//         "X-Shopify-Access-Token": accessToken,
//         "Content-Type": "application/json"
//     };

//     console.log("Starting to fetch all Shopify customers using Link header pagination...");

//     try {
//         while (nextLink) { // Loop as long as there's a 'next' link
//             iteration++;
//             console.log(`\n--- Iteration ${iteration} ---`);
//             console.log(`Making request to: ${nextLink}`);

//             const response = await axios.get(nextLink, { headers });

//             const customers = response.data.customers;

//             if (!customers || customers.length === 0) {
//                 console.log("No more customers found in this batch. Pagination complete.");
//                 nextLink = null; // No customers in this response, so no next link
//                 break; // Exit loop
//             }

//             // Filter duplicates before adding to allCustomers
//             const newCustomerIds = new Set(allCustomers.map(c => c.id));
//             const uniqueNewCustomers = customers.filter(c => !newCustomerIds.has(c.id));
//             allCustomers.push(...uniqueNewCustomers);

//             // --- IMPORTANT: Parse the 'Link' header for the next page URL ---
//             const linkHeader = response.headers.link;
//             let currentBatchNextLink = null;
//             if (linkHeader) {
//                 const links = linkHeader.split(',').map(s => s.trim());
//                 for (const link of links) {
//                     const match = link.match(/<(.*)>; rel="next"/);
//                     if (match && match[1]) {
//                         currentBatchNextLink = match[1];
//                         break;
//                     }
//                 }
//             }
//             nextLink = currentBatchNextLink; // Update nextLink for the next iteration

//             console.log(`Fetched ${customers.length} customers in this batch. Added ${uniqueNewCustomers.length} unique customers. Total collected so far: ${allCustomers.length}.`);
//             console.log(`Next page link: ${nextLink || 'None (end of pagination)'}`);

//             await new Promise(resolve => setTimeout(resolve, 500)); // Respect API rate limit
//         }

//         const fileName = 'all_shopify_customers.json';
//         fs.writeFileSync(fileName, JSON.stringify(allCustomers, null, 2));
//         console.log(`Successfully saved ${allCustomers.length} customers to file: ${fileName}`);

//         return res.status(200).json({
//             success: true,
//             message: 'All customers fetched and saved successfully.',
//             total: allCustomers.length,
//         });

//     } catch (error) {
//         console.error("\n--- API request error occurred! ---");
//         console.error("Error fetching customers:", error.message);
//         if (error.response) {
//             console.error("Status:", error.response.status);
//             console.error("Data:", error.response.data);
//             console.error("Headers:", error.response.headers);
//         }

//         return res.status(500).json({
//             success: false,
//             message: 'Failed to fetch customers',
//             error: error.message,
//             statusCode: error.response ? error.response.status : 500
//         });
//     }
// };

// module.exports = {
//     getAllCustomers
// };

const { getAllCustomersAndSave } = require('../../Services/shopifyCustomerService');

const fetchAndSaveCustomers = async (req, res) => {
    try {
        const result = await getAllCustomersAndSave();
        res.json({
            success: true,
            message: 'Customers synced successfully',
            data: result
        });
    } catch (error) {
        console.error('Customer sync error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to sync Shopify customers',
            error: error.message
        });
    }
};

module.exports = {
    fetchAndSaveCustomers
};
