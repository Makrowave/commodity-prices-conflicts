FROM node:24-alpine AS development-dependencies-env
WORKDIR /app
COPY ./frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM node:24-alpine AS production-dependencies-env
WORKDIR /app
COPY ./frontend/package.json frontend/package-lock.json ./
RUN npm ci --omit=dev

FROM node:24-alpine AS build-env
WORKDIR /app
COPY ./frontend/ ./
COPY --from=development-dependencies-env /app/node_modules ./node_modules

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY ./frontend/package.json frontend/package-lock.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build

CMD ["npm", "run", "start"]