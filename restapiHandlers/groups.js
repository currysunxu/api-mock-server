"use strict";

const dbGen = require("./../data");

module.exports = function(req, res) {
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)

  let list = dbGen()['omni_'+req.params.resourceName];

  switch (req.method) {
    case "GET":
      list = list.filter(i => i.id == req.query.customerId).map(i => i.data);
      res.status(200).json(list[0]);
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
