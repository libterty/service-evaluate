FROM node:10
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7070
CMD ["npm", "run", "start:prod"]