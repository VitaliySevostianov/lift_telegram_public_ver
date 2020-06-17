FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 228
RUN npm i pm2 -g

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
