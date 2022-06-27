FROM node:16.13.2

WORKDIR /usr/app

COPY package.json .

COPY . .

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

COPY . .

CMD ["npm", "run", "dev"]