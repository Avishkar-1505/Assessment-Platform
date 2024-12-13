# frontend/Dockerfile

# Use the official Node.js image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine

# Copy the build files to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]