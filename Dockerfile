FROM node:12.18.2-buster
LABEL maintainer="gideon@gideontong.com"
COPY secrets.json config
COPY . .
RUN npm ci
CMD ["npm", "start"]