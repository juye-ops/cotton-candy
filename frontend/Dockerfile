FROM node:18

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /root

COPY ./package.json /root/

RUN npm install
ENV NODE_PATH=/root/node_modules

WORKDIR /root/frontend

CMD ["npm", "start"]