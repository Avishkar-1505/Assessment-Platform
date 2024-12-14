# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port using an environment variable
EXPOSE 5000

# Start the application and pass in the environment variables from .env
CMD ["node", "index.js"]
