from greetings import greetings
import controller


def greet(event, context):
    try:
        print(event)
        name = event['pathParameters']['name']
        msg = controller.prepareResponse(greetings.simple_hello(name), 200)
        print(msg)
        return msg
    except NameError:
        return controller.prepareResponse('Name Error', 500)


# greet({'pathParameters': {'name': 'Meir'}}, None)
