# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
COPY tsconfig.json ./
COPY .env.local ./
COPY .env.dev ./


# Install production dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . .

RUN yarn build

COPY dist /usr/src/app/dist



# Run the web service on container startup.
CMD [ "node", "dist/main.js"]