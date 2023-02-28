# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:18-slim

WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]