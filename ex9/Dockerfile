FROM node:10

RUN mkdir -p /app

WORKDIR /app

RUN npm install -g nodemon

COPY ./package.json ./

RUN npm install && npm cache clean --force

COPY ./public /app/public/

COPY ./src /app/src/

CMD ["node", "src/server.js"]
