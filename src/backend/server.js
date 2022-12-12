require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(express.json());
app.use("/api", require("./routes/api"));

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(422).send({ error: err.message });
});

app.listen(PORT || 4000, function () {
	console.log("Server Running on 4000");
});
