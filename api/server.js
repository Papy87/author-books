//IMPORTS
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const bookRoutes = require('./server/routes/BookRoutes');
const authorRoutes = require('./server/routes/AuthorRoutes');
const loginRoutes = require('./server/routes/LoginRoutes');

//Cors configuration
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
};
//Cors and BodyParser
app.use(cors(corsOptions));
app.use(express.json());
//Routes
app.use('', loginRoutes);
app.use('', bookRoutes);
app.use('', authorRoutes);
//Server
app.listen(PORT, () => console.log(`Express Server is running at port no:${PORT}`));
