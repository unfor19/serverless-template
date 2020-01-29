#!/bin/bash
ROOTDIR=${PWD}
rm -f greet-api-layer.zip
mkdir -p tmp_python/python
cp -R python/.ENV/lib/python3.8/site-packages/* ./tmp_python/python/
cd tmp_python
zip -q -r9 ${ROOTDIR}/greet-api-layer.zip .
cd ${ROOTDIR}
rm -r tmp_python
