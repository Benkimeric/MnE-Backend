#!/bin/sh

printf "\n\n======================================\n"
printf "Making database migrations"
printf "\n======================================\n\n"
export NODE_ENV=production
# yarn db:migrate
yarn db:rollmigrate
# yarn db:seed

printf "\n\n======================================\n"
printf "Start the application"
printf "\n======================================\n\n"
yarn start

exit 0
