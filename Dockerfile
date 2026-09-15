FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache nodejs

COPY --from=build /app/dist /usr/share/nginx/html
COPY scripts/list-bgm.mjs /opt/list-bgm.mjs
COPY docker-entrypoint.sh /list-bgm-then-nginx.sh

RUN sed -i 's/\r$//' /list-bgm-then-nginx.sh \
  && chmod +x /list-bgm-then-nginx.sh

EXPOSE 80

ENTRYPOINT ["/list-bgm-then-nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]
