FROM node:20 AS base

# working directory inside the container
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# install app dependencies
RUN yarn install

# bundle the app source
COPY . .

# build the app for production usage
RUN yarn build

EXPOSE 5001

# start the application
CMD ["yarn", "start:dev"]
