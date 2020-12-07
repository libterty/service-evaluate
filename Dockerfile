FROM node:10-alpine
WORKDIR /app

# Installing dockerize which can test and wait on the availability of a TCP host and port.
ENV DOCKERIZE_VERSION v0.6.1
RUN apk add --no-cache openssl \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Installing bash.
RUN apk add --no-cache bash bash-doc bash-completion python python3 make g++
# Installing git.
RUN apk add --no-cache git

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7070 8080