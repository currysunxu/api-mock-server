# OMNI API Gateway Mock

This project provides a mock of omni-api-gateway for UAT and QA environment usage.

## Supported API

- [X] POST /api/v1/customer
- [X] GET /api/v1/customer/{customerId}/profile
- [X] GET /api/v1/customer/{customerId}/inprogressgroups
- [X] GET /api/v1/customer/{customerId}/enrolledgroups
- [ ] GET /api/v1/customer/{customerId}/grammarpro
- [ ] GET /api/v1/user/{customerId}/profile
- [ ] GET /api/v1/teacher/{teacherId}/GetSessionsofDateandSchoolCode
- [ ] GET /api/v1/account/authenticate
- [ ] POST /api/v1/customer/GetInfoListofGroup

## Prerequisites

- node.js 10.x

## Installation

Follow the instructions below.

1. Clone the repository `git clone git@github.com:LearningLocker/xapi-service.git`.
2. Install dependencies `npm install`.
3. Start the server `npm start`.

## Development

1. Follow the `installation procedure`.
2. Put mock data into the "data" directory.
3. Run the server `npm start`.

## Deployment

[PD-CN-OMNI-ApiGateway-QA-Deploy](https://e1jenkins.ef.cn/view/E1PDBE_QA/job/PD-CN-OMNI-ApiGateway-QA-Deploy/)
