FROM node:14.6.0-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN npm rebuild node-sass

ENTRYPOINT npm run serve

