apigw_list=$(aws apigateway get-rest-apis | jq --arg apigw_name $1 '.items[] | .name=$apigw_name')
apigw_endpoint=$(echo "$apigw_list" | jq -r 'select(.name | contains("serverless-template-rest-api-dev")) | .id')
echo $apigw_endpoint
