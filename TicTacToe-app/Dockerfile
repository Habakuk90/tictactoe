### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10.11.0-alpine as builder

COPY package.json .

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN mkdir /ng-app
#&& mv -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm install
ENV GHOST_KEY=${GHOST_KEY}
## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --aot --prod


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY /nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/TicTacToe-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
