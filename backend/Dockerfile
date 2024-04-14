# syntax = docker/dockerfile:1.2
FROM node:alpine

# Create app directory and set permissions
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

# Set working directory
WORKDIR /usr/src/node-app

# Copy package files
COPY package.json yarn.lock .env ./

# Switch to non-root user
USER node

# Install dependencies
RUN yarn install --pure-lockfile

# Copy application files
COPY --chown=node:node . .

# Generate Prisma
RUN yarn prisma generate

# Build the application
RUN yarn build

# Expose port
EXPOSE 5000

# Set secrets (ensure your secret is properly accessed here)
RUN --mount=type=secret,id=_env yarn prisma migrate deploy

# Start command
CMD ["yarn", "start"]
