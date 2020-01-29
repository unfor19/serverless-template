#!/bin/bash
ROOTDIR=${PWD}
rm -rf ./dist
mkdir ./dist
cp ./src/*.py ./dist/
cd ./dist
zip -q -r9 ${ROOTDIR}/dist/dist_greet.zip .
cd ${ROOTDIR}
