#!/bin/bash

# if [ -z $GHOST_API_REPLACE ]; then
#     sed -i 's/GHOST_API_KEY/('"$GHOST_API_REPLACE"')/g' src/environments/environment.prod.ts
# fi

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build --build-arg key=${GHOST_API_KEY} -t wahnsinnshub/ttt-repo:latest .
  docker push wahnsinnshub/ttt-repo:latest
fi

# TODO If we are build as release we want to push by the latest release number