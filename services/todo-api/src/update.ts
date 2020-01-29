import * as AWS from 'aws-sdk';
import { ITodoItem, instanceOfTodoItem } from './interface';
import { prepareResponse } from './controller';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4',
});

async function updateObject(item: ITodoItem) {
  const params = {
    Metadata: {
      content: item.content,
    },
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    Key: item.id.toString(),
  };
  const putObjectPromise = s3.putObject(params).promise();
  return putObjectPromise
    .then((data: any) => {
      console.log(data);
      return {
        id: item.id,
      };
    })
    .catch((err: any) => {
      const errorMessage = `Failed to upload file to S3: ${err}`;
      return new Error(errorMessage);
    });
}

export async function updateItem(event: any, context: any, _callback: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  try {
    const item: ITodoItem = JSON.parse(event.body);
    if (instanceOfTodoItem(item)) {
      return await updateObject(item).then((res: any) => {
        console.log(res);
        return prepareResponse(res, 200);
      });
    } else {
      return prepareResponse('Invalid item type', 500);
    }
  } catch (e) {
    return prepareResponse(e, 501);
  }
}
