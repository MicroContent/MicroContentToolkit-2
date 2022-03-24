FROM node:14-alpine

WORKDIR /user/src/

# install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080 8081 9010 9011 9012 9013
CMD ["node", "app/server.js"]


