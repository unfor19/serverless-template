# drone.io

You can perform all the steps in this repository with a single command. We'll be using [drone's](https://docs.drone.io/) cli, it's not best practice to do so (better use [Docker Compose](https://docs.docker.com/compose/)), but still, it's nice to get familiar with different tools.

## Requirements

1. Install [Docker Engine](https://docs.docker.com/install/)
1. Clone this repository
1. Install [drone-cli](https://docs.drone.io/cli/install/)

## Getting Started

1. Create an `.env.drone` file with your AWS credentials, store it in the root folder of this repo
   ```bash
   aws_access_key_id=AKIA1232123ASDF
   aws_secret_access_key=1kJMAKfjeiadf92oskdfjoakod1232
   aws_region=eu-west-1
   ```
1. Execute the pipelines in `.drone.yml`
   ```bash
   $ (serverless-template) drone exec --secret-file ./.env.drone
   ```
1. That's it! Let it run, and watch the `usage` step, example output:
   ```bash
    [usage:0] + APIGW_ID=$(bash ./scripts/get_apigw_endpoint.sh serverless-template-rest-api-dev)
    [usage:1] + APIGATEWAY_ENDPOINT="https://$APIGW_ID.execute-api.$AWS_REGION.amazonaws.com"
    [usage:2] + echo $APIGATEWAY_ENDPOINT
    [usage:3] https://87soabd2ja.execute-api.********.amazonaws.com
    [usage:4] + MY_CONTENT="some content"
    [usage:5] + RESULT=$(curl --silent --location --request POST $APIGATEWAY_ENDPOINT/dev/todo/create --header 'Content-Type:application/json' --data-raw '{ "content":"'"$MY_CONTENT"'" }')
    [usage:6] + echo $RESULT
    [usage:7] { "id": "9172dc70-5fb3-11ea-993d-efb386712b09" }
    [usage:8] + MY_NAME="Willy"
    [usage:9] + RESULT=$(curl --silent --location --request GET "$APIGATEWAY_ENDPOINT/dev/greet/$MY_NAME")
    [usage:10] + echo $RESULT
    [usage:11] "Hello Willy!"
   ```
