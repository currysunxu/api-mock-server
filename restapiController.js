"use strict";

const dbGen = require("./data");

var handle = function(req, res) {
  var r = getReqFromBody(req);
  console.log(r);

  switch (r.method) {
    case "GET":
      var list = dbGen()[r.resourceName];
      list = list.map(i => {
        return i.data;
      });
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
    body: body
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
