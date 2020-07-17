"use strict";

const dbGen = require("./../data");

const constructResponse = function(entityList, success, errorMsg) {
  return {
    isSuccess: success,
    ResponseDatas: entityList,
    errorMsg: errorMsg
  };
};

module.exports = function(req, res) {
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)

  let list = dbGen()[req.params.resourceName];

  switch (req.method) {
    case "GET":
      list = list.filter(i => i.id == req.query.customerId).map(i => i.data);
      res.status(200).json(constructResponse(list, true, null));
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
