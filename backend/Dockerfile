# Dockerfile
FROM node

# Set environment variables
ENV appDir /app

# Initiate project folders
RUN mkdir -p /app && mkdir -p /node_tmp

#WORKDIR ${appDir}
WORKDIR /app

# Install pm2 *globally* so we can run our application
RUN npm i -g pm2

# Put NPM node_modules in a temp folder to cache and point PATH to
ENV PATH /node_tmp/node_modules/.bin:$PATH  
# To make `require` of any node module possible
ENV NODE_PATH /node_tmp/node_modules/

COPY ./package.json /node_tmp/package.json 
RUN cd /node_tmp && npm install 
