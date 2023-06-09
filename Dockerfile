FROM node:14.21.2-alpine
WORKDIR ./src
ENV PORT 5000
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "./src/index.js"]