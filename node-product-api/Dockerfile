FROM node:14.17.4-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3001

RUN  npm i -g nodemon

CMD npm run dev
