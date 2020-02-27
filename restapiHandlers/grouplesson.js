"use strict";

const dbGen = require("./../data");

module.exports = function(req, res) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  let list = dbGen()[req.params.resourceName];

  switch (req.method) {
    case "POST":
      list = list.filter(i => i.id == req.body.studentId);
      res.status(200).json(list.length ? list[0].data : []);
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
