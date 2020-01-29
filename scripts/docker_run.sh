#!/bin/bash
tag_version=v2
if [[ ! -z $AWS_SESSION_TOKEN && ! -z $AWS_SECURITY_TOKEN ]]; then
    docker run -it --rm \
        --env AWS_REGION=$AWS_REGION \
        --env AWS_DEFAULT_REGION=$AWS_REGION \
        --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
        --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
        --env AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
        --env AWS_SECURITY_TOKEN=$AWS_SECURITY_TOKEN \
        --mount type=bind,source="${PWD}",target=/code \
        unfor19/serverless-template:${tag_version} bash
else
    docker run -it --rm \
        --env AWS_REGION=$AWS_REGION \
        --env AWS_DEFAULT_REGION=$AWS_REGION \
        --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
        --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
        --mount type=bind,source="${PWD}",target=/code \
        unfor19/serverless-template:${tag_version} bash
fi