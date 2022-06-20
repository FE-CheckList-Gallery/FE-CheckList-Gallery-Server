FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
RUN npm i -g pm2
COPY . ./
EXPOSE 4000
CMD ["pm2-runtime", "start", "ecosystem.config.js", "pm2", "logs"]