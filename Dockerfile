ARG NODE_VERSION=node:22.2.0

ARG ALPINE_VERSION=alpine3.18

FROM ${NODE_VERSION}-${ALPINE_VERSION} as base

WORKDIR /home/node/app

RUN npm install -g npm@10.5.0

RUN apk --no-cache add curl

# Development image
FROM base as development

RUN apk add bash

USER node

# Builder image
FROM base as builder

COPY --chown=node:node . .

RUN npm install && \
    npm run build

# Production image
FROM base as production

RUN chown -R node:node .

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=builder /home/node/app/dist ./dist

USER node

ENV NODE_ENV production
RUN npm install --omit=dev

EXPOSE 3000

CMD npm run start:prod