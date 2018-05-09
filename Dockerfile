FROM node:8.9-alpine
ENV NODE_ENV production
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build --production