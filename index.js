const express = require('express');
require('dotenv').config();
const routes = require('./router/routes');

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started at:http://localhost:${port}`);
});