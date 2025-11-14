from flask import Flask, request, jsonify
from src.llm import query_model

app = Flask(__name__)

@app.route("/api", methodS=["POST"])
def Model_Call():
    if request.is_json:
        data = request.get_json()
        model = data.get('model')
        user_query = data.get('query')
        result = query_model(model, user_query)

        return jsonify({"Message": "Sucess",
                        "Response": result
                        }), 200
    else:
        return jsonify({"Response": "Request must be JSON", 
                        "Message": "Failure"
                        }), 400
    

if __name__ == '__main__':  
   app.run()