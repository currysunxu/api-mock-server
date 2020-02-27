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
      let filteredlist = list.filter(i => i.id == req.query.customer_id).map(i => i.data);
      res.status(200).json(constructResponse(filteredlist.length?filteredlist : list.map(i => i.data), true, null));
      break;
    case "POST":
      res.status(200).json(constructResponse(null, true, null));
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};
