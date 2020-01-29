import { v1 as uuidv1 } from 'uuid';
import { prepareResponse } from './controller';

export function status(event: any, context: any, callback: any) {
  console.log(`Console uuid is: ${uuidv1()}`);
  callback(
    null,
    prepareResponse(
      {
        status: 'healthy',
        uuid: uuidv1(),
      },
      200,
    ),
  );
}
