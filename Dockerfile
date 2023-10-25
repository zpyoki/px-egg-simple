FROM node:slim

LABEL \
	maintainer="Silence <zpyoki@aliyun.com>" \
	version="1.0" \
	description="px node"

ENV NODE_ENV=production
ENV TIME_ZONE=Asia/Shanghai

RUN \
	mkdir -p /www

WORKDIR /www

COPY package.json /www/

# RUN npm i --omit=dev --registry=https://registry.npm.taobao.org
RUN npm i --omit=dev

COPY . /www

EXPOSE 9999

CMD npm run startd