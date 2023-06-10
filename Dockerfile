FROM node:16.15.0-alpine
WORKDIR /app
ENV PORT 5000
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 5000
CMD [ "npm", "run", "start"]
