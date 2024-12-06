FROM node:18.17.1
WORKDIR /the/workdir/path
COPY ./ ./
RUN "npm install"
COPY ./ ./
CMD [ "node" ,"index.js" ]