const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

app.get("/", (req, res) => res.send("asdafasd"));

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

