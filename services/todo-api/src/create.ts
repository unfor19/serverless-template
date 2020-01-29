import * as AWS from 'aws-sdk';
import { v1 as uuidv1 } from 'uuid';
import { ITodoItem } from './interface';
import { prepareResponse } from './controller';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4',
});

// async function getMaxId() {
//   const params = {
//     Bucket: process.env.TODOS_BUCKET_NAME || '',
//     MaxKeys: 1000,
//   };
//   return new Promise((resolve, reject) => {
//     s3.listObjectsV2(params, (err: any, data: any) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         if (data.Contents.length === 0) {
//           resolve(1);
//         } else {
//           console.log('Data:', JSON.stringify(data.Contents, null, 2));
//           let max_id = 0;
//           data.Contents.forEach((item: any) => {
//             if (parseInt(item.Key) >= max_id) {
//               max_id = parseInt(item.Key);
//             }
//           });
//           resolve(max_id + 1);
//         }
//       }
//     });
//   });
// }

async function uploadObject(item: ITodoItem) {
  const uuid = uuidv1();
  const params = {
    Metadata: {
      content: item.content,
    },
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    Key: uuid,
  };
  const putObjectPromise = s3.putObject(params).promise();
  return putObjectPromise
    .then((data: any) => {
      return {
        id: uuid,
      };
    })
    .catch((err: any) => {
      const errorMessage = `Failed to upload file to S3: ${err}`;
      return new Error(errorMessage);
    });
}

export async function createItem(event: any, context: any, _callback: any) {
  console.log(`Event: ${JSON.stringify(event)}`);
  try {
    const item: ITodoItem = JSON.parse(event.body);
    if (item.content) {
      return await uploadObject(item).then((res: any) => {
        return prepareResponse(res, 200);
      });
    } else {
      return prepareResponse('Invalid item type', 500);
    }
  } catch (e) {
    return prepareResponse(e, 501);
  }
}
