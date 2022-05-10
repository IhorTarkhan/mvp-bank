#!/usr/bin/env bash

set -e

cd frontend

rm -fr node_modules
rm -fr build
npm install
mv ".env" ".env.tmp"
mv ".env.prod" ".env"
npm run build
mv ".env" ".env.prod"
mv ".env.tmp" ".env"
ssh mvp_bank@ihor-tarkhan.com "rm -fr frontend/build"
scp -r build mvp_bank@ihor-tarkhan.com:~/frontend/

cd ..

cd backend

mvn clean package
ssh mvp_bank@ihor-tarkhan.com '[ -z "$(sudo lsof -t -i:8080)" ] || sudo kill "$(sudo lsof -t -i:8080)"'
ssh mvp_bank@ihor-tarkhan.com "rm -f backend/MvpBank.jar"
scp target/MvpBank.jar mvp_bank@ihor-tarkhan.com:~/backend
ssh mvp_bank@ihor-tarkhan.com "java -jar ~/backend/MvpBank.jar --spring.config.additional-location=backend/external-application.properties" &
slip 20

cd ..

