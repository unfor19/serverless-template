const fs = require('fs');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const regexp = /.*-dev$/g;
var tables = [];
dynamoDB.listTables({}, function(err: any, data: any) {
  if (err) console.log(err);
  else {
    data.TableNames.forEach(function(table: any, i: number) {
      if (table.match(regexp)) {
        documentClient.scan({ TableName: table }, function(err: any, data: any) {
          if (err) console.log(err);
          else {
            fs.writeFileSync(`./${table.replace('-dev', '-seed')}.json`, JSON.stringify(data.Items));
          }
        });
      }
    });
  }
});
