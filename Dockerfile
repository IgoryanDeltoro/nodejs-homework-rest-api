FROM node

WORKDIR /backand-app

COPY . .

RUN npm instal 

EXPOSE 3000

CMD [ "node", "server" ]