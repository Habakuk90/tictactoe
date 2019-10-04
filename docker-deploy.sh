#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  docker build -t wahnsinnshub/ttt-repo:latest .
  docker push wahnsinnshub/ttt-repo:latest
fi