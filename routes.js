'use strict'

module.exports = {
  "/omni/apigateway/api/v1/customer": "/students",
  "/omni/apigateway/api/v1/customer/:id/profile": "/profiles/:id",
  "/omni/apigateway/api/v1/customer/:id/inprogressgroups": "/inprogressgroups/:id",
  "/omni/apigateway/api/v1/customer/:id/enrolledgroups": "/enrolledgroups/:id",
  "/omni/apigateway/api/v1/customer/:id/grammarpro": "/gpgroups/:id",
  "/omni/apigateway/api/v1/account/authenticate?loginName=:id&*": "/teachers/:id",
  "/omni/apigateway/api/v1/user/:id/profile": "profiles/:id",
  "/omni/apigateway/api/v1/teacher/:id/GetSessionsofDateandSchoolCode?*": "/sessions/:id"
}
