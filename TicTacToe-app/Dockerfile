#
# BudgetTracker Dockerfile for UI
#
#FROM nginx:alpine
#WORKDIR /ng-app
# COPY . .
# # Remove the default Nginx configuration file
# RUN rm -v /etc/nginx/nginx.conf

# # Copy a configuration file from the current directory
# ADD nginx.conf /etc/nginx/

#COPY /dist/TicTacToe-app /usr/share/nginx/html
# Append "daemon off;" to the beginning of the configuration
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
#EXPOSE 80

# Set the default command to execute
# when creating a new container
# CMD ["/bin/bash"]


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

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --aot --prod


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/TicTacToe-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
