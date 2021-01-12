"use strict";

const dbGen = require("./../data");

module.exports = function (req, res) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  let list = dbGen()[req.params.resourceName];


  switch (req.method) {
    case "POST":
      list = list.filter(i => i.customerId == req.body.customerId && i.reservationId == req.body.reservationId);
      res.status(200).json(list.length ? list[0] : []);
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
