FROM node:14.21.2-alpine
WORKDIR /app
ENV PORT 80
COPY . .
RUN npm install
EXPOSE 80
CMD ["node", "/src/index.js"]