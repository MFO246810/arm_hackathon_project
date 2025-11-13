import ollama

def query_model(Name, Query):
    response = ollama.chat(model=Name, messages=[
        {'content': Query}
    ])

    return response

