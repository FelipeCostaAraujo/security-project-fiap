FROM node:14.17.4-alpine
EXPOSE 3000

WORKDIR /home/app

COPY . /home/app

ENV PATH /home/node_modules/bin:$PATH

RUN npm config set prefix "/home/node_modules" \
    && npm i express \ 
    && npm i mysql2 \
    && npm i cors \
    && npm i request \
    && npm i -g nodemon

CMD nodemon app.js
