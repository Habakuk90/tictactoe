### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10.11.0-alpine as builder

# COPY package.json .
ADD package.json /tmp/package.json
WORKDIR /opt/app
ADD . /opt/app

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN cd /tmp && npm install && mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# setting TravisCI environment variable via docker build --build-args key=${GHOST_API_KEY}
ARG key
ENV GHOST_API_KEY=$key

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --aot --prod --output-path=dist

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY /nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /opt/app/dist/TicTacToe-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
