FROM node:8.1.4
RUN unlink /bin/sh && ln -s /bin/bash /bin/sh \
    && apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

COPY package.json npm-shrinkwrap.json ./
COPY deploy.sh ./

RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app && cp ./deploy.sh ./ng-app

WORKDIR /ng-app

COPY . .

RUN $(npm bin)/ng build --prod && apt-get install -y python python-pip python python-dev \
  python-setuptools groff less && pip install --upgrade pip && pip install --upgrade awscli

ENTRYPOINT ./deploy.sh
