#!/bin/bash
PROJECT_DIR="${PWD}"
echo "🔎  Identifying services folders ..."
servicesFolders=$(find ./services -maxdepth 1 -type d -name "*-api" -print | sort)
[[ -z "${servicesFolders}" ]] && "Failed - missing folders named: {service}-api " && exit
printf "📁  Services folders\n===================\n${servicesFolders}\n"
sleep 1
echo "🌍  Installing dependencies, building services and layers"
sleep 3
for serviceFolder in $servicesFolders; do
    echo "🛠️  Building ${serviceFolder}"
    cd "${PROJECT_DIR}/${serviceFolder}"
    yarn build:dev
    sleep 1
    if [[ -d "./layer" ]]; then
        echo "⛏️  Building ${serviceFolder}/layer"
        cd "${PROJECT_DIR}/${serviceFolder}/layer"
        yarn build
        sleep 1
    fi
done

echo "✅  Finished"