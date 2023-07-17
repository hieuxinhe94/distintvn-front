FROM node:16.17.0

WORKDIR /app/storefront

COPY . .

RUN rm -rf node_modules

RUN apt-get update

RUN npm install -g next

RUN npm install --force --loglevel=error

ENTRYPOINT ["npm", "start", "-H", "0.0.0.0", "-p", "8000" ]