const express = require("express");
const app = express();
const studentExpressRoute = express.Router();

let StudentSchema = require("../model/student.model");

studentExpressRoute.route("/").get((req, res) => {
  StudentSchema.find((error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(data);
    }
  });
});

//This will find students
studentExpressRoute.route("/student/:id").get((req, res) => {
  StudentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(data);
    }
  });
});

//This is to create students
studentExpressRoute.route("/add-student").post((req, res, next) => {
  StudentSchema.create(req.body, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(data);
    }
  });
});

//This is to Delete students
studentExpressRoute.route("/del-student/:id").delete((req, res) => {
  StudentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//This will update students/ for update we need the params,id and body
studentExpressRoute.route("/update-student/:id").put((req, res) => {
  StudentSchema.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      cohort: req.body.cohort,
      phoneNumber: req.body.phoneNumber,
    },
    (error, data) => {
      if (error) {
        res.json(error);
      } else {
        res.json(data);
        console.log("Delete seccessfully");
      }
    }
  );
});

module.exports = studentExpressRoute;
