from ollama import Client

client = Client(host='http://host.docker.internal:11434')

def query_model(Name, query):
    response = client.chat(model=Name, messages=[{
        'role': 'user',
        'content': query,
    },])

    return response['message']['content']

