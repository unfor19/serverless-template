import * as AWS from 'aws-sdk';
import { prepareResponse } from './controller';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4',
});

async function listObjects() {
  const params = {
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    MaxKeys: 1000,
  };
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err: any, data: any) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (data.Contents.length === 0) {
          resolve({
            status: 'empty',
          });
        } else {
          console.log('Data:', JSON.stringify(data.Contents, null, 2));
          const arr: any[] = [];
          data.Contents.forEach((item: any) => {
            arr.push({
              id: item.Key,
            });
          });
          resolve(arr);
        }
      }
    });
  });
}

export async function listItems(event: any, context: any, _callback: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  return prepareResponse(await listObjects(), 200);
}
