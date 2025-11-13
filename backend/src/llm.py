import ollama

def query_model(Name, query):
    ollama_client = ollama.Client(url="http://localhost:11434")
    response = ollama_client.chat(
        model=Name,
        messages=[{'role': 'user', 'content': query}]
    )
    return response['message']['content']

