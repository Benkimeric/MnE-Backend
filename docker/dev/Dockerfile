FROM node:10

LABEL MAINTAINER="Bolton <bolton.otieno@gmail.com>"
LABEL application="mne-backend"

# Create app directory
WORKDIR /usr/app

RUN apt-get -y update && apt-get -y upgrade

RUN rm -rf yarn.lock

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install --only=production
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source

# COPY . /usr/app

COPY .sequelizerc.build /usr/app
RUN mv .sequelizerc.build .sequelizerc

