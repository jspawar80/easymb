# Use an official Node.js image as the base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React app with a static server
FROM nginx:stable-alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
