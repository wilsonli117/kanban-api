const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const boards = require("./routes/api/boards");
const tasks = require("./routes/api/tasks");

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/boards", boards);
// app.use("/api/tasks", tasks);