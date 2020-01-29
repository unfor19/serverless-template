#!/bin/bash
echo ">> Removing dist folder and candidate.zip"
rm -r "${serviceFolder}/dist" "candidate.zip"
echo ">> Identifying files & folders to zip"
servicesFolders=$(find . -maxdepth 1 -type d -exec bash -c '[ -f "$0"/package.json ] && [ -f "$0"/yarn.lock ]' '{}' \; -print | sort)
echo $servicesFolders
echo ">> Copying files & folders to dist folder"
for serviceFolder in $servicesFolders; do
    serviceSubFiles=$(ls -p $serviceFolder | grep -v /)
    serviceSubFiles=$(echo $serviceSubFiles | sed 's|[^ ]*|'${serviceFolder}'/&|g')
    serviceSubFolders="src"
    serviceSubFolders=$(echo $serviceSubFolders | sed 's|[^ ]*|'${serviceFolder}'/&|g')
    mkdir -p "dist/${serviceFolder}"
    cp -r ${serviceSubFiles} ${serviceSubFolders} "dist/${serviceFolder}"
done
serverlessFiles=$(find -maxdepth 1 -name "serverless.*yml" -type f | sort)
echo ">> The following serverless files will also be zipped: $serverlessFiles"
cp $serverlessFiles ./dist
echo ">> Zipping build to candidate.zip"
cd dist
zip -rq ../candidate.zip . 