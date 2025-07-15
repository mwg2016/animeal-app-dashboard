const express = require('express');
const cors = require('cors')
const knex = require('./config/db'); 
const router  = require('./routes/vet.route');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, This Is Animeal Homepage');
});

app.use('/admin', router)

// Testing the database connection with Knex
knex.raw('SELECT 1')
  .then(() => {
    console.log('Connected to MySQL database.');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.listen(PORT,  () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
