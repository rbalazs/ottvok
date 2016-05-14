FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]