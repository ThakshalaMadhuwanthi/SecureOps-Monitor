FROM node:18-alpine

WORKDIR /app

COPY back-end/ .


CMD ["node", "server.js"]