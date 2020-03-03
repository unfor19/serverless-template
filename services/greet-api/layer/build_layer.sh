#!/bin/bash
ROOTDIR="${PWD}"
rm -rf ./python/.ENV/
python -m venv ./python/.ENV/
source ./python/.ENV/bin/activate
pip install --quiet --no-cache-dir -r ./python/requirements.txt
rm -f greet-api-layer.zip
mkdir -p tmp_python/python
cp -R python/.ENV/lib/python3.8/site-packages/* ./tmp_python/python/
cd tmp_python
zip -q -r9 "${ROOTDIR}/greet-api-layer.zip" .
cd "${ROOTDIR}"
deactivate
rm -r tmp_python
