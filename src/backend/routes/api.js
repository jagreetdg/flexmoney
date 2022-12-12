const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/register", function (req, res) { 
  const user = req.body;
	const name = user.name;
	const age = user.age;
	const payDate = user.payDate;
	const year = payDate.substring(0, 4);
  const month = payDate.substring(5, 7);
  const batch = user.batch;
  
    Person.findOne({ name: name }).then(function (original) {
      if (original == null || original.monthYear == null) {
        Person.create({
					name: name,
					age: age,
					monthYear: month+year,
					batch: batch,
				}).then(function (person) {
					res.send({
						success: true,
						message: "User created and payment made successfully",
					});
				});
      }
      else if (original.monthYear.includes(month+year,0)) {
        res.send({
          success: false,
          message: "User has already paid for this month"
        })
      }
      else {
        console.log(original.monthYear)
        original.monthYear.push(month+year)
        Person.findOneAndUpdate({ name: name }, original).then(function (
          person
        ) {
          Person.findOne({ name: name }).then(function (retPerson) {
            res.send({
              success: true,
              message: "User has successfully paid for this month",
            });
          });
        });
      }
    });
});

router.get("/list", function (req, res, next) {
	Person.find({})
		.then(function (people) {
			res.send(people);
		})
		.catch(next);
});

module.exports = router;
