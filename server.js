const express = require('express');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger.json");
const cors = require('cors');
// create a app
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Listen a request
app.listen(process.env.PORT, () => console.log("Server is listening SuccessFully !!!"));

//Define a Simple Route
app.get('/', (req, res) => res.json({ "message": "Welcome to Fundoo Note Application" }))

//Require Notes routes
require('./app/routers/user.router.js')(app);

// Configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.connection();

module.exports = app;