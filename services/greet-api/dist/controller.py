import json


def prepareResponse(body, status_code):
    return {
        'body': json.dumps(body),
        'statusCode': status_code,
        'isBase64Encoded': False
    }
