import ollama

def query_model(Name, Query):
    response = ollama.chat(model=Name, messages=[
        {'role': 'user', 'content': Query}
    ])

    return response

