export function prepareResponse(body: any, status_code: number) {
  return {
    body: JSON.stringify(body, null, 2),
    statusCode: status_code,
    isBase64Encoded: false,
  };
}
