# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Expose the app's port
EXPOSE 8020

# Set environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8020
ENV ENVIRONMENT=production
ENV URL=http://0.0.0.0:8020
ENV API_URL=http://0.0.0.0:8000
ENV DOMAIN=0.0.0.0

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Define the command to run your app
CMD ["npm", "start"]