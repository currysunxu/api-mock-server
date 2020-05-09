"use strict";

const dbGen = require("./../data");


module.exports = function(req, res) {
  console.log(req.params);
  console.log(req.query.studentId);
  console.log(req.method)

  let list = dbGen()[req.params.resourceName];

  switch (req.method) {
    case "GET":
      list = list.filter(i => i.id == req.query.studentId);
      res.status(200).json(list.length ? list[0].data : []);
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
