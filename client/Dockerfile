FROM node:18.15.0-alpine as build
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
