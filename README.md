# serverless-template

A basic serverless [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) todo-list application.

To keep it simple, we're using S3 bucket as a database. The contents are saved to the objects' [user-defined metadata](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html).

![serverless-template-crud](./assets/serverless-template-crud.png)

<details><summary><b>Theory</b>

</summary>

## Concepts

Learn how to use the Serverless Framework, while taking advantage of AWS Lambda Function, Lambda Layer and API Gateway.

#### AWS Lambda Function

> _"AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume..."_ [[Source]](https://aws.amazon.com/lambda/)

###### [Pricing](https://aws.amazon.com/lambda/pricing/), [Limits](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html), [CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/) and [S3 Pricing](https://aws.amazon.com/s3/pricing/)

---

#### AWS Lambda Layer

> _"...A layer is a ZIP archive that contains libraries, a [custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html), or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package..."_ [[Source]](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html)

###### [S3 Pricing](https://aws.amazon.com/s3/pricing/)

---

#### AWS API Gateway

> _"...API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management..."_ [[Source]](https://aws.amazon.com/api-gateway/)

###### [Pricing](https://aws.amazon.com/api-gateway/pricing/) and [Limits](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)

---

#### Serverless Framework

> _"The Serverless Framework helps you build serverless apps with radically less overhead and cost. It provides a powerful, unified experience to develop, deploy, test, secure and monitor your serverless applications..."_ [[Source]](https://serverless.com/framework/docs/)

###### [Comparisons](https://serverless.com/learn/comparisons/)

## Use Cases

<details><summary>
Serverless backend and Cron jobs
</summary>

![Serverless backend and Cron jobs](https://www.simform.com/wp-content/uploads/2018/08/Serverless-Examples-with-AWS-Lambda-Use-Cases.png 'Serverless backend and Cron jobs')

[[Source]](https://www.simform.com/serverless-examples-aws-lambda-use-cases/)

</details>

<details><summary>
Data processing
</summary>

![Data processing](https://d0.awsstatic.com/Test%20Images/MasonTests/Lambda/Lambda_FileProcessing.png 'Data processing')

[[Source]](https://www.polyglotdeveloper.com/tools/2017-07-04-most-common-lambda-deployment-patterns/)

</details>

<details><summary>
Lambda@Edge Increase web application security
</summary>

![Before](./assets/example-lambdaatedge-before.png 'Before')

![After](./assets/example-lambdaatedge-after.png 'After')

</details>

###### [More use cases](https://serverless.com/learn/use-cases/)

## APIs

<details><summary>Project Tree
</summary>

![ProjectTree](./assets/project-tree-L3.png)

</details>

- Each API is an isolated service that contains multiple functions
- All APIs share the same API Gateway - easier to manage
- The file [serverless.common.yml](./serverless.common.yml) contains mappings that are relevant to all APIs, such as: region, allow_origin, user_pool_id, etc.

### APIs Structure

- serverless.yml - configuration for deployment - [Using Layers](https://serverless.com/framework/docs/providers/aws/guide/layers#using-your-layers)
- layer - deployed separately, these are the dependencies
- src - source code of API that will be deployed by serverless
- package.json - contains build, deploy and destroy scripts, and dev-dependencies
- yarn.lock - contains the list of dev-dependencies and their versions

## Layers

- **Never run** `yarn add some_package` **in an API folder**
- **Always use** `yarn add --dev some_package`**in an API folder**; Lambda Layer will supply the "real" dependencies
- There's no need to create a layer for AWS SDK (e.g aws-sdk, boto3) - These libraries are [provided by AWS automatically](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

#### Layer Structure

- serverless.yml - configuration for deploying the layer - [Deploying Layers](https://serverless.com/framework/docs/providers/aws/guide/layers#configuration)
- package.json - contains the scripts for building, deploying and destroying the layer
- nodejs/package.json - contains the dependencies that will be uploaded with this layer
- nodejs/yarn.lock - contains the list of dependencies and their versions

---

</details>

## Requirements

1. Clone this repository

1. Use this [Docker image](https://hub.docker.com/repository/docker/unfor19/serverless-template)
   - [aws-vault](https://github.com/99designs/aws-vault)
     ```bash
     $ (serverless-template) aws-vault exec PROFILE_NAME -- bash ./scripts/docker_run.sh
     ```
   - AWS Environment variables
     ```bash
     $ (serverless-template) export AWS_SECRET_ACCESS_KEY=A123123
     $ (serverless-template) export AWS_ACCESS_KEY_ID=B1232123123
     $ (serverless-template) export AWS_REGION=eu-west-1
     $ (serverless-template) export AWS_PROFILE=sls-template-dev
     $ (serverless-template) bash ./scripts/docker_run.sh
     ```
   - AWS Credentials & Config files
     ```bash
     $ (serverless-template) bash ./scripts/docker_run.sh
     ```

<details><summary>Packages
  </summary>

<table class="tg">
  <tr>
    <th class="tg-9wq8">Package</th>
    <th class="tg-9wq8">Version</th>
  </tr>
  <tr>
    <td class="tg-0pky">NodeJS</td>
    <td class="tg-c3ow">12.16.1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Python</td>
    <td class="tg-c3ow">3.8.1</td>
  </tr>
  <tr>
    <td class="tg-0lax">bash</td>
    <td class="tg-baqh">5.0.11</td>
  </tr>
  <tr>
    <td class="tg-0lax">curl</td>
    <td class="tg-baqh">7.67.0</td>
  </tr>
  <tr>
    <td class="tg-0lax">jq</td>
    <td class="tg-baqh">20191114-85-g260888d269</td>
  </tr>
  <tr>
    <td class="tg-lboi">yarn</td>
    <td class="tg-9wq8">1.22.0</td>
  </tr>
  <tr>
    <td class="tg-lboi">serverless-framework</td>
    <td class="tg-9wq8">1.64.0</td>
  </tr>
  <tr>
    <td class="tg-0pky">TypeScript</td>
    <td class="tg-c3ow">3.8.2</td>
  </tr>
</table>

</details>

## Getting Started

Deploy AWS resources

#### S3 Bucket and API Gateway

```bash
$ (serverless-template/aws-resources) yarn deploy:dev
```

#### AWS Lambda Layers

```bash
$ (serverless-template/services/todo-api/layer) yarn deploy:dev
$ (serverless-template/services/greet-api/layer) yarn deploy:dev
```

#### AWS Lambda Functions

```bash
$ (serverless-template/services/todo-api) yarn deploy:dev
$ (serverless-template/services/greet-api) yarn deploy:dev
```

<details><summary>
CloudFormation templates
</summary>

#### API Gateway

[![Launch in Ireland](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png) Ireland (eu-west-1)](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/quickcreate?templateURL=https://unfor19-serverless-template.s3-eu-west-1.amazonaws.com/cfn-apigateway.yml)

#### S3 Bucket

[![Launch in Ireland](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png) Ireland (eu-west-1)](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/quickcreate?templateURL=https://unfor19-serverless-template.s3-eu-west-1.amazonaws.com/cfn-s3.yml)

<details><summary>
More regions
</summary>

To deploy in other regions, replace AWS_REGION with the region's code

**API Gateway**

```
https://AWS_REGION.console.aws.amazon.com/cloudformation/home?region=AWS_REGION#/stacks/quickcreate?templateURL=https://
serverless-template.s3-eu-west-1.amazonaws.com/cfn-apigateway.yml
```

**S3 Bucket**

```
https://AWS_REGION.console.aws.amazon.com/cloudformation/home?region=AWS_REGION#/stacks/quickcreate?templateURL=https://
serverless-template.s3-eu-west-1.amazonaws.com/cfn-s3.yml
```

</details>

---

</details>

## Usage

Replace `ENDPOINT` with the API Gateway's endpoint that was generated by serverless-framework

```bash
APIGATEWAY_ENDPOINT=https://ENDPOINT.execute-api.eu-west-1.amazonaws.com
```

#### Create

Replace `MY_CONTENT`

```bash
MY_CONTENT='some content' && \
curl --location --request POST ${APIGATEWAY_ENDPOINT}/dev/todo/create \
--header 'Content-Type: application/json' \
--data-raw '{ "content": "'${MY_CONTENT}'" }'
```

#### Get (Read)

Replace `MY_UUID`

```bash
MY_UUID='cf27a7de-f3f7-43a0-b12f-ff8016b7b7e0' && \
curl --location --request GET ${APIGATEWAY_ENDPOINT}/dev/todo/get/${MY_UUID}
```

#### Update

Replace `MY_UUID` and `MY_CONTENT`

```bash
MY_UUID='cf27a7de-f3f7-43a0-b12f-ff8016b7b7e0' && \
MY_CONTENT='wohoo new content!' && \
curl --location --request POST ${APIGATEWAY_ENDPOINT}/dev/todo/update \
--header 'Content-Type: application/json' \
--data-raw '  { "id": "'${MY_UUID}'", "content": "'${MY_CONTENT}'" }'
```

#### Delete

Replace `MY_UUID`

```bash
MY_UUID='cf27a7de-f3f7-43a0-b12f-ff8016b7b7e0'
curl --location --request DELETE ${APIGATEWAY_ENDPOINT}/dev/todo/delete/${MY_UUID}
```

#### List

```bash
curl --location --request GET ${APIGATEWAY_ENDPOINT}/dev/todo/list
```

#### Greet

Replace `MY_NAME`

```bash
MY_NAME=willy
curl --location --request GET ${APIGATEWAY_ENDPOINT}/dev/greet/${MY_NAME}
```

<details><summary><b>Modify</b>
  </summary>

### Requirements

1. Clone this repository

1. Use this [Docker image](https://hub.docker.com/repository/docker/unfor19/serverless-template)
   - AWS Credentials file
     ```bash
     $ (serverless-template) bash ./scripts/docker_run.sh
     ```
   - aws-vault
     ```bash
     $ (serverless-template) aws-vault exec PROFILE_NAME -- bash ./scripts/docker_run.sh
     ```

<details><summary>Packages
  </summary>

<table class="tg">
  <tr>
    <th class="tg-9wq8">Package</th>
    <th class="tg-9wq8">Version</th>
  </tr>
  <tr>
    <td class="tg-0pky">NodeJS</td>
    <td class="tg-c3ow">12.16.1</td>
  </tr>
  <tr>
    <td class="tg-0pky">Python</td>
    <td class="tg-c3ow">3.8.1</td>
  </tr>
  <tr>
    <td class="tg-0lax">bash</td>
    <td class="tg-baqh">5.0.11</td>
  </tr>
  <tr>
    <td class="tg-0lax">curl</td>
    <td class="tg-baqh">7.67.0</td>
  </tr>
  <tr>
    <td class="tg-0lax">jq</td>
    <td class="tg-baqh">20191114-85-g260888d269</td>
  </tr>
  <tr>
    <td class="tg-lboi">yarn</td>
    <td class="tg-9wq8">1.22.0</td>
  </tr>
  <tr>
    <td class="tg-lboi">serverless-framework</td>
    <td class="tg-9wq8">1.64.0</td>
  </tr>
  <tr>
    <td class="tg-0pky">TypeScript</td>
    <td class="tg-c3ow">3.8.2</td>
  </tr>
</table>

</details>

3. Install dev-dependencies for each API

   ```
   $ (serverless-template/services/todo-api): yarn install
   $ (serverless-template/services/greet-api): yarn install
   ```

_TODO_: Create a script for that

4. Modify code in `src` and then build

   ```bash
   $ (serverless-template/services/todo-api): yarn build:dev
   $ (serverless-template/services/greet-api): yarn build  # it's the same for all stages in Python
   ```

_TODO_: Create a script for that

### Manage Dependencies

#### Adding a new dependency

`layer: yarn add package_name`

```
$ (serverless-template/todo-api): cd layer/nodejs
$ (serverless-template/todo-api/layer/nodejs): yarn add uuid # or any other package
```

#### Layer name and package.json

Make sure that your layer name in the serverless file is related with the names in package.json

```
# todo-api/layer/serverless.yml
custom.layers.[dev|staging|prod].[Tododev|Todostaging|Todoprod]

# todo-api/package.json
scripts: deploy:vault-dev|staging|prod .... --layer-name Tododev|Todostaging|Todoprod
```

#### Deploying a new Layer version

```
$ (serverless-template/todo-api/layer/nodejs): cd ..
$ (serverless-template/todo-api/layer): yarn deploy:vault-dev   # or deploy:dev if not using aws-vault
Serverless: Packaging service...
...
Serverless: Checking Stack update progress...
...
IMPORTANT! Do not forget to re-deploy the API to update Lambda Layer version
Done in 67.21s.
```

### Deploying and Redeploying the API

1. Upon deployment, the deployment script gets the latest version of Lambda Layer
2. When updating a Lambda Layer, you must re-deploy the API for it to use the latest Lambda Layer version

```
$ (serverless-template/todo-api/layer): cd ..
$ (serverless-template/todo-api): yarn deploy:vault-dev # or deploy:dev if not using aws-vault
yarn run v1.21.1
$ export layer_arn=$(aws-vault exec sls-template -- aws lambda list-layer-versions --layer-name Tododev | jq -r '.LayerVersions[0].LayerVersionArn') && aws-vault exec sls-template -- sls deploy --verbose --stage=dev
...
Serverless: Checking Stack update progress...
...
Done in 43.59s.
```

</details>

## Cleanup

#### AWS Lambda Functions

```bash
$ (serverless-template/services/todo-api): yarn destroy:dev
$ (serverless-template/services/greet-api): yarn destroy:dev
```

#### AWS Lambda Layers

```bash
$ (serverless-template/services/todo-api/layer): yarn destroy:dev
$ (serverless-template/services/greet-api/layer): yarn destroy:dev
```

#### S3 Bucket and API Gateway

**Impportant!** Delete all the objects in the bucket before performing this action

```bash
$ (serverless-template/aws-resources): yarn destroy:dev
```

---

## Also Check

- [Serverless Best Practices](https://serverless-stack.com) - a free resource to help you build full-stack production ready Serverless applications
- [AWS Docs - Best Practices for Working with AWS Lambda Functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [AWS Blog - 10 Things Serverless Architects Should Know](https://aws.amazon.com/blogs/architecture/ten-things-serverless-architects-should-know/)
- [AWS Blog - Best Practices for Developing on AWS Lambda
  ](https://aws.amazon.com/blogs/architecture/best-practices-for-developing-on-aws-lambda/)
- [Git Repo - AWS Serverless Workshops](https://github.com/aws-samples/aws-serverless-workshops)

## Contributing

Report issues/questions/feature requests on in the [Issues](https://github.com/unfor19/serverless-template/issues) section.

Pull requests are welcome! Ideally create a feature branch and issue for every
individual change you make. These are the steps:

1. Fork the repo.
2. Create your feature branch from master (`git checkout -b my-new-feature`).
3. Commit your awesome changes (`git commit -am 'Added some feature'`).
4. Push to the branch (`git push origin my-new-feature`).
5. Create a new Pull Request and tell us about your changes.

## Authors

Created and maintained by [Meir Gabay](https://github.com/unfor19)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
