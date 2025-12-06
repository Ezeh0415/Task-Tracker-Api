# Use an official lightweight Node runtime
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# If you have a build step (e.g. for TypeScript), run it here:
# RUN npm run build

# Use env PORT or default to 3000
ENV PORT=3000
EXPOSE 3000

# Default command (adjust if your package.json start script differs)
CMD ["npm", "start"]