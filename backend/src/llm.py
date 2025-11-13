import ollama

def query_model(Name, query):
    response = ollama.chat(
        model=Name,
        messages=[{'role': 'user', 'content': query}]
    )
    return response['message']['content']

