'use strict'

module.exports = {
  "/omni/apigateway/api/v1/customer": "/students",
  "/omni/apigateway/api/v1/customer/:id/profile": "/profiles/:id",
  "/omni/apigateway/api/v1/customer/:id/inprogressgroups": "/inprogressgroups/:id",
  "/omni/apigateway/api/v1/customer/:id/enrolledgroups": "/enrolledgroups/:id",
  "/omni/apigateway/api/v1/customer/:id/grammarpro": "/gpgroups/:id",
  "/omni/apigateway/api/v1/customer/GetInfoListofGroup?groupId=:id": "/groupinfos/:id",
  "/omni/apigateway/api/v1/account/authenticate?loginName=:id&*": "/teachers/:id",
  "/omni/apigateway/api/v1/user/:id/profile": "/users/:id",
  "/omni/apigateway/api/v1/teacher/:teacher/GetSessionsofDateandSchoolCode?year=:year&month=:month&date=:date&schoolCode=*": "/sessions/:teacher-:year-:month-:date",
  "/omni/apigateway/api/v1/ilab/checkphone?phone=:id&*":"/checkphone/:id"
}
