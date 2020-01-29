import * as AWS from 'aws-sdk';
import { prepareResponse } from './controller';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4',
});

async function deleteObject(id: number) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.TODOS_BUCKET_NAME || '',
      Key: id.toString(),
    };
    s3.deleteObject(params, (err: any, data: any) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({
          id: id,
        });
      }
    });
  });
}

export async function deleteItem(event: any, context: any, _callback: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  const id = event.pathParameters.id;
  return prepareResponse(await deleteObject(id), 200);
}
