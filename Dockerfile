FROM node:18-alpine3.16
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]