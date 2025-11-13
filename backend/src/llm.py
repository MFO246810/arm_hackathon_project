from ollama import chat
from ollama import ChatResponse

def query_model(Name, query):
    response: ChatResponse = chat(model=Name, messages=[{
        'role': 'user',
        'content': query,
    },])

    return response['message']['content']

