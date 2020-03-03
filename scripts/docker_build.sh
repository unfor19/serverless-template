#!/bin/bash
PROJECT_DIR="${PWD}"

error (){
    local msg=$1
    echo -e "\033[31mFATA[0000]\e[0m ${msg}"
    usage
    exit
}

usage(){
  cat << EOF
Usage: bash ./scripts/docker_build.sh -tv v1
Short  | Full             | Default
-tv    | --tag_version    | Required
-h     | --help
EOF
}

while [ "$1" != "" ]; do
    case $1 in
        -tv | --tag_version )
            shift
            tag_version=$1
        ;;                                                       
        -h | --help ) usage
            exit
        ;;
        * )          usage
            exit 1
    esac
    shift
done

image_name="unfor19/serverless-template"

[[ -z ${tag_version} ]] && error "Tag version name is required"

docker build -f "${PROJECT_DIR}/Dockerfile" --rm -t "${image_name}:${tag_version}" .