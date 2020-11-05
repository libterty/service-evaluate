FROM node:10-alpine AS base

# Work Directory
WORKDIR /app

# timezone
RUN apk add --no-cache tzdata
ENV TZ Asia/Taipei

# ------ Dependencies Injection --------
FROM base As dependencies

RUN apk add --no-cache --virtual .persistent-deps \
  curl \
  openssl \
  # for node-sass module
  make \
  gcc \
  g++ \
  python \
  py-pip \
  # Install node packages
  && npm install --silent --save-dev -g \
  typescript

RUN curl -L https://unpkg.com/@pnpm/self-installer | node
RUN npm install pm2@4.2.3 -g
RUN npm install grpc --grpc_node_binary_host_mirror=https://storage.cloud.google.com/node-precompiled-binaries.grpc.io
RUN npm install

# VOLUME []
COPY . /app/
EXPOSE 7070
CMD ["pm2-runtime", "ecosystem.config.js"]