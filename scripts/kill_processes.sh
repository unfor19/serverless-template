#!/bin/bash
processes_sls=$(sudo netstat -tulpn | grep '127.0.0.1:300[0-9]' | grep '[0-9]*\/node' | sed -n 's|/node||p' | awk 'NF{ print $NF }')
if [[ ! -z $processes_sls ]]; then
    kill -9 $processes_sls
fi

processes_dynamodb=$(sudo netstat -tulpn | grep '0.0.0.0:800[0-9]' | grep '[0-9]*\/java' | sed -n 's|/java||p' | awk 'NF{ print $NF }')
if [[ ! -z $processes_dynamodb ]]; then
    kill -9 $processes_dynamodb
fi
