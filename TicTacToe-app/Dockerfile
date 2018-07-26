#
# BudgetTracker Dockerfile for UI
#
FROM nginx:alpine
WORKDIR /ng-app
# COPY . .
# # Remove the default Nginx configuration file
# RUN rm -v /etc/nginx/nginx.conf

# # Copy a configuration file from the current directory
# ADD nginx.conf /etc/nginx/

COPY /dist/TicTacToe-app /usr/share/nginx/html
# Append "daemon off;" to the beginning of the configuration
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
# CMD ["/bin/bash"]
