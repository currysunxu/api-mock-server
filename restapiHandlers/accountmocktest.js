"use strict";

const dbGen = require("./../data");

const constructResponse = function (entityList, success, errorMsg) {
  return {
    isSuccess: success,
    ResponseDatas: entityList,
    errorMsg: errorMsg
  };
};

module.exports = function (req, res) {
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)

  let list = dbGen()[req.params.resourceName];

  switch (req.method) {
    case "GET":
      list = list.filter(i => (req.query.customer_id == null || i.CustomerID == req.query.customer_id) &&
        (req.query.grades == null || i.Grade.toLowerCase() == req.query.grades.toLowerCase()) &&
        (req.query.center_code == null || i.center_codes.toLowerCase() == req.query.center_code.toLowerCase()));
      res.status(200).json(constructResponse(list, true, null));
      break;
    case "POST":
      res.status(200).json(constructResponse(null, true, null));
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
