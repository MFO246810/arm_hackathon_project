from ollama import Client

def query_model(Name, query, url):
    client = Client(host=url)
    response = client.chat(model=Name, messages=[{
        'role': 'user',
        'content': query,
    },])

    return response['message']['content']

