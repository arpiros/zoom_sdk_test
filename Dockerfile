FROM node:16

WORKDIR /product/zoom_sdk

COPY package*.json ./

RUN npm install express body-parser crypto cors jsrsasign dotenv

CMD [ "node", "index.js" ]
