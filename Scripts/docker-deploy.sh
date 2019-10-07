#!/bin/bash

# if [ -z $GHOST_API_REPLACE ]; then
#     sed -i 's/GHOST_API_KEY/('"$GHOST_API_REPLACE"')/g' src/environments/environment.prod.ts
# fi

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build -t wahnsinnshub/ttt-repo:CITEST .
  docker push wahnsinnshub/ttt-repo:CITEST
fi