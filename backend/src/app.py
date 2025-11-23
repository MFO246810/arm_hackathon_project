from flask import Flask, request, jsonify
from llm import query_model
from models import MODELS
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST"], "allow_headers": ["Content-Type"]}})

url = url = "http://host.docker.internal:11434"

@app.route("/api/call", methods=["POST"])
def Model_Call():
    if request.is_json:
        data = request.get_json()
        model = data.get('model')
        user_query = data.get('query')
        print("Starting query processing .... ")
        result = query_model(model, user_query, url)
        print("Finishing query process .... ")

        return jsonify({"Message": "Sucess" ,
                        "Response": result
                        }), 200
    else:
        return jsonify({"Response": "Request must be JSON", 
                        "Message": "Failure"
                        }), 400
    
@app.route("/api/list", methods=["GET"])
def Model_List():

    Models_List = [
        MODELS.DEEPSEEK.value,
        MODELS.GEMMA.value,
        MODELS.GRANITE.value,
        MODELS.LLAMA.value,
        MODELS.PHI.value
    ]

    return jsonify({"Response": Models_List, "Message": "Sucess"}), 200
    

if __name__ == '__main__':  
   app.run(host="0.0.0.0", port=5000)