from ollama import Client

def query_model(Name, query):
    client = Client(
        host='http://localhost:11434',
    )

    response = client.chat(model=Name, messages=[{
        'role': 'user',
        'content': query,
    },])

    print(response['message']['content']) 

