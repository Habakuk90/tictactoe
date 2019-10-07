#!/bin/bash

# if [ -z $GHOST_API_REPLACE ]; then
#     sed -i 's/GHOST_API_KEY/('"$GHOST_API_REPLACE"')/g' src/environments/environment.prod.ts
# fi

# If we are building develop we are pushing the latest tag
if [ "$TRAVIS_BRANCH" == "develop" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build --build-arg key=${GHOST_API_KEY} -t wahnsinnshub/ttt-repo:latest .
  docker push wahnsinnshub/ttt-repo:latest
fi

# TODO If we are buildin master we want to push by the latest release number