# syntax = docker/dockerfile:1.2
FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .
 
EXPOSE 5000

RUN --mount=type=secret,id=_env

RUN yarn prisma migrate deploy

RUN yarn prisma generate

CMD yarn start