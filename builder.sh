#!/bin/bash

# Your Docker image name
DOCKER_IMAGE="kasra-fluentd"

# Check if the Docker image exists
if docker inspect "$DOCKER_IMAGE" &>/dev/null; then
    echo "Docker image $DOCKER_IMAGE exists."
else
    echo "Docker image $DOCKER_IMAGE does not exist. Building..."
    docker compose build
fi
