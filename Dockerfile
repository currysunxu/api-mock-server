FROM node:10 AS build-env

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm prune

FROM node:10-alpine

WORKDIR /app

COPY . ./
COPY --from=build-env /build/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
