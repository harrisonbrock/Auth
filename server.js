const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const db = require('./data/db');
const setupRoutes = require('./routes/route');

server.use(cors());
server.use(helmet());
server.use(express.json());
setupRoutes(server);


db
    .conntectTo('jwtauth')
    .then(() => console.log('\n... API Connected to jwtauth Database ...\n'))
    .catch(err => {
        console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
    });


server.listen(7777, () => console.log('\n=== API running on port 5500 ===\n'));