FROM node:14-alpine as builder

ARG HTTP_PORT=8001
ARG HTTPS_PORT=8443
ARG GRPC_PORT=8006

RUN apk add --no-cache make gcc g++ python

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

COPY ./package*.json ./
RUN npm install

COPY --chown=node:node ./ /usr/src/app
RUN npm run prod


FROM node:14-alpine as runtime

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app
RUN mkdir -p /usr/src/data
RUN chown node:node /usr/src/data

COPY --chown=node:node --from=builder /usr/src/app/builds/prod /usr/src/app/builds/prod 

USER node
RUN cd /usr/src/app/builds/prod && npm install --only=prod

USER root
COPY --chown=node:node ./ ./

EXPOSE ${HTTP_PORT}
EXPOSE ${GRPC_PORT}

CMD ["sh", "-c", "node ./builds/prod/src/backend/db/cli/ExecuteMigrations.js&& node ./builds/prod/src/ServerCluster.js"]