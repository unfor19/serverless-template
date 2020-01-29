#!/bin/bash
source ./scripts/kill_processes.sh
ROOTDIR="${PWD}"
servicesFolders=$(find . -maxdepth 2 -type d -exec bash -c '[ -f "$0"/package.json ] && [ -f "$0"/yarn.lock ]' '{}' \; -print | sort)
echo $servicesFolders
for serviceFolder in $servicesFolders; do
    cd $serviceFolder
    yarn start:local &
    sleep 1
    cd ..
done

cd $ROOTDIR
