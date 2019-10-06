#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build --build-arg key=${GHOST_API_KEY} -t wahnsinnshub/ttt-repo:latest .
  docker push wahnsinnshub/ttt-repo:latest
fi