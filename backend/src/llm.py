from ollama import chat
from ollama import ChatResponse

def query_model(Name, query):
    response: ChatResponse = chat(model='gemma3', messages=[{
        'role': 'user',
        'content': 'Why is the sky blue?',
    },])
    
    return response['message']['content']

