FROM node:22-slim

WORKDIR /

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN npm install pm2@latest -g

COPY dockerentrypoint.sh /

EXPOSE 8080

# run dockerentrypoint.sh
CMD ["sh", "/dockerentrypoint.sh"]