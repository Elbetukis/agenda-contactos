const express = require("express");
const contactoRoutes = require("./routes/contactoRoutes");

const app = express();

app.use(express.json());

app.use("/contactos", contactoRoutes);

module.exports = app;