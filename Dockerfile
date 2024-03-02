# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Expose the app's port
EXPOSE 8020

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Define the command to run your app
CMD ["npm", "start"]