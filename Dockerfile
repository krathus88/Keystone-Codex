FROM node:25.1.0-alpine3.22 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

COPY . .

ENV CI=true
RUN npm install

# Default MODE to development
RUN npm run build -- --mode=${MODE:-development}

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config will come from the nginx container in docker-compose, so no need to copy here

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
