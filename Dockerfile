FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]

# docker run -p 49160:8080 -v $HOME/ottvok:/usr/src/app rbalazs/ottvok-app