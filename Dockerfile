FROM node:8.8.1

RUN unlink /bin/sh && ln -s /bin/bash /bin/sh \
    && apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

COPY package.json npm-shrinkwrap.json ./
COPY deploy.sh ./

RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app && cp ./deploy.sh ./ng-app

WORKDIR /ng-app

COPY . .

RUN apt-get install -y python python-pip python python-dev python-setuptools groff less && \
  $(npm bin)/ng build --prod && pip install --upgrade pip && pip install --upgrade awscli

ENTRYPOINT ./deploy.sh
