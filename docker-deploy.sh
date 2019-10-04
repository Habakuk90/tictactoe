#!/bin/bash

if [ -n "$GHOST_API_KEY" ]; then
    sed -i 's/GHOST_API_KEY/GHOST_API_KEY_REPLACE/g' src/environments/environment.prod.ts
fi

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build -t wahnsinnshub/ttt-repo:latest .
  docker push wahnsinnshub/ttt-repo:latest
fi