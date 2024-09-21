FROM node:22-slim

WORKDIR /
USER root

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN npm install pm2@latest -g && pm2 startup
RUN mkdir guidelines && chown -R www-data:www-data guidelines 
RUN mkdir -p /var/www/.pm2 && chmod -R +rwx /var/www/.pm2

RUN pm2 startup -u www-data --hp /guidelines
# USER www-data

COPY dockerentrypoint.sh /

EXPOSE 8080

# run dockerentrypoint.sh
CMD ["sh", "/dockerentrypoint.sh"]