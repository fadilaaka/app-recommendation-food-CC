FROM node:14.21.2-alpine
WORKDIR /app
ENV PORT 5000
COPY . .
RUN npm install
CMD [ "npm", "run", "start"]
EXPOSE 5000
