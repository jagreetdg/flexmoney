const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

let db = new Map();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", function (req, res) {
	res.send(db);
});

app.get("/api/register", function (req, res) {
	res.send("Welcome to Flexmoney Yoga Registraion API");
});

app.post("/api/register", (req, res) => {

	const user = req.body
	const name = user.name
	const age = user.age
	const payDate = user.payDate
	const monthYear = payDate.substring(0, 7)
  const batch = user.batch

	const response = {}

  if (db.has(name)) {
		let paymentStatus = db.get(name).paymentStatus;
		if (paymentStatus.get(monthYear)) {
			response.success = false;
			response.message = "User has already paid for this month";
		} else {
			paymentStatus.set(monthYear, true);
			db.set(name, {
				age: age,
				paymentStatus: paymentStatus,
				batch: batch,
			});
			response.success = true;
			response.message = "User has successfully paid for this month";
		}
	} else {
		let paymentStatus = new Map();
		paymentStatus.set(monthYear,true);
		db.set(name, {
			age: age,
			paymentStatus: paymentStatus,
			batch: batch,
		});
		response.success = true;
		response.message = "User created & successfully paid for this month";
	}
  res.send(response)
});

app.listen(port, function (err) {
	if (err) {
		console.log("Error while starting server");
	} else {
		console.log("Server has been started at " + port);
	}
});