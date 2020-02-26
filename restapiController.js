"use strict";

const dbGen = require("./data");

var handle = function(req, res) {
  var r = getReqFromBody(req);
  console.log(r);
  var list = dbGen()[r.resourceName];


  switch (r.method) {
    case "GET":
      list = list.filter(i => i.id == r.body.CustomerID)
      res.status(200).json(constructResponse(list, true, null));
      break;
    case "POST":
      if (r.resourceName == ('grouplesson')) {
        console.log("body=")
        console.log(r.body)
        list = list.filter(i => i.id == r.id)
         res.status(200).json(list[0].data)
      }
      else {
          res.status(200).json(constructResponse(null, true, null));}
      break;
    default:
      res.status(500).text("not supported http verb");
      break;
  }
};

var getReqFromBody = function(req) {
  console.log(req.body);
  var match = /\/services\/apexrest\/(?<resourceName>[\w\.\_-]+)\/v1/.exec(
    req.body.url
  );
  var body =
    req.body &&
    req.body.body &&
    req.body.body.parameters &&
    req.body.body.parameters[0];

  return {
    method: req.body.http_method,
    resourceName: match[1],
    body: body,
    id: req.body.body.studentId
  };
};

var constructResponse = function(entityList, success, errorMsg) {
  return {
    isSuccess: success,
    ResponseDatas: entityList,
    errorMsg: errorMsg
  };
};

module.exports = {
  handle: handle
};
