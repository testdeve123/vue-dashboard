FROM node:17-alpine AS builder

WORKDIR /work

COPY ./ /work

RUN npm install
  

RUN npm run build

FROM nginx:1.19.6-alpine

WORKDIR /work

COPY --from=builder /work/dist /usr/share/nginx/html