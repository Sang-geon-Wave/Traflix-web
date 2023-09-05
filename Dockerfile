FROM node:18

WORKDIR /app
COPY traflix-web/package*.json ./
RUN npm install

COPY traflix-web/ .

EXPOSE 8088

CMD npm run dev