FROM node:latest

WORKDIR /var/www/html/frontend

COPY . .

RUN npm install

CMD [ "npm", "run", "start" ]

