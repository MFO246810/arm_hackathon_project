from ollama import Client

def query_model(Name, query, url):
    client = Client(host=url)
    stream = client.chat(model=Name, messages=[{
        'role': 'user',
        'content': query,
    },], stream=True)

    for chunk in stream:
        if "message" in chunk and "content" in chunk["message"]:
            message = chunk.get("message", {})
            text_chunk = message.get("content", "")

            if text_chunk is not None:
                yield text_chunk