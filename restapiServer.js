"use strict";

const queryString = require("query-string");

const initRestapiServer = function(expressApp) {
  expressApp.post("/omni/apigateway/api/v1/sf/restapi", urlRewriteMiddleware);
  expressApp.use("/services/apexrest/v2/customer/:resourceName", router);
  expressApp.use("/services/apexrest/:resourceName/:apiVersion", router);
  expressApp.use("/services/apexrest/:resourceName/:apiVersion/:subResourceName", router);

};

const urlRewriteMiddleware = function(req, res, next) {
    console.log(req.body.url);
    let url = req.body.url;
    let query = url.substring(url.indexOf("?"));
    req.url = url;
    req.method = req.body.http_method;
    req.query = queryString.parse(query);
    req.body = req.body.body;
    next();
};

const router = function(req, res){
    console.log(req.params.resourceName);
    console.log(req.params.subResourceName);
    console.log(req.params.apiVersion);
    require("./restapiHandlers/"+req.params.resourceName)(req,res);
  };


module.exports = {
  init: initRestapiServer
};
