const express = require('express');
require('dotenv').config();
const routes = require('./router/routes');

const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started at:http://localhost:${port}`);
});