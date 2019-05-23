# OMNI API Gateway Mock

This project provides a mock of omni-api-gateway for UAT and QA environment usage.

## Prerequisites

- node.js 10.x

## Installation

Follow the instructions below.

1. Clone the repository `ssh://git@bitbucket.englishtown.cn:7999/etkt/extract-course-structure.git`.
2. Install dependencies `npm install`.
3. Start the server `npm start`.

## Development

1. Follow the `installation procedure` to clone repo and install dependencies.
2. Put mock data into the "data" directory.
3. Run the server `npm run dev` for test, the base url is `http://localhost:3000/omni/apigateway/`.

### Data source

The data source of each API can be found in the following table.

Request | Data Source
---|---
POST /api/v1/customer | data/students.json
GET /api/v1/customer/{customerId}/profile | data/profiles.json
GET /api/v1/customer/{customerId}/inprogressgroups | data/inprogressgroups.json
GET /api/v1/customer/{customerId}/enrolledgroups | data/enrolledgroups.json
GET /api/v1/customer/{customerId}/grammarpro | data/gpgroups.json
GET /api/v1/account/authenticate?loginName={}&encryptedPassword={} | data/teachers.json
GET /api/v1/user/{customerId}/profile | data/users.json
GET /api/v1/teacher/{teacherId}/GetSessionsofDateandSchoolCode?year={}&month={}&date={}&schoolCode={} | data/sessions.json
GET /api/v1/customer/GetInfoListofGroup?groupId={} | data/groupinfos.json

## Deployment

[PD-CN-OMNI-ApiGateway-QA-Deploy](https://e1jenkins.ef.cn/view/E1PDBE_QA/job/PD-CN-OMNI-ApiGateway-QA-Deploy/)

Webhook is setup, git push will trigger deployment automatically.

## Reference

This mock is built based on [json-server](https://github.com/typicode/json-server)
