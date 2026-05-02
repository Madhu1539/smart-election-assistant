# Stage 1: Build the frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the backend
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy built frontend to the expected location so the backend can serve it
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose port (Cloud Run uses 8080 by default)
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Start the Node server
CMD ["npm", "start"]
