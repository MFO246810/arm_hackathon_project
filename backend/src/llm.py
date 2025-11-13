from ollama import Client

def query_model(Name, query):
    client = Client(
        host='http://localhost:11434',
        headers={'x-some-header': 'some-value'}
    )
    
    response = client.chat(model='gemma3', messages=[{
        'role': 'user',
        'content': 'Why is the sky blue?',
    },])

    print(response['message']['content']) 

