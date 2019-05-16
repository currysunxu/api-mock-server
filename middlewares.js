'use strict'

const utils = require('./utils')

module.exports = {
  supportAuth: function(req, res, next) {

    if (req.method == 'POST' && req.url == ('/accounts')) {
      // Get username from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var username = reqBody.username

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/accounts/' + username
    }

    if(req.url == ('/staffs')) {
      console.log(req.url)
    }

    // if (req.method == 'GET' && req.url == ('/staffs')) {
    //   // Get loginName from query parameter
    //   var loginName = req.query.loginName
    //   console.log("loginName is " + loginName)

    //   // Replace req.url
    //   req.url = '/staffs/' + loginName
    // }

    // Contiue to JSON server router
    next()
  }
}
