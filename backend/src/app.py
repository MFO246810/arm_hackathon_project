from flask import Flask, request, jsonify, Response, stream_with_context, send_from_directory, abort
from src.utils.InitDB import initialize_database
from src.utils.database import SessionLocal
from src.DBmodels.models import QueryData
from werkzeug.utils import safe_join
from src.llm import query_model
from src.models import MODELS
from flask_cors import CORS
from src.measure_usage import ModelPerformanceTracker
import time
import json
import os
import datetime


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST"], "allow_headers": ["Content-Type"]}})
initialize_database()
Data_Dir = os.path.abspath("Data")
os.makedirs(Data_Dir, exist_ok=True)

app.config['Data_Dir'] = Data_Dir

url = url = "http://host.docker.internal:11434"

@app.route("/api/call", methods=["POST"])
def Model_Call():
    if request.is_json:
        data = request.get_json()
        model = data.get('model')
        user_query = data.get('query')
        print("Starting query processing .... ")

        db = SessionLocal()
        Start_time = datetime.utcnow()
        tracker = ModelPerformanceTracker()
        tracker.start()

        ttft_start = time.perf_counter()
        ttft = None

        def generate():
            nonlocal ttft
            for token in query_model(model, user_query, url):

                tracker.sample()

                if ttft is None and token and token.strip() != "":
                    ttft = time.perf_counter() - ttft_start
                
                yield token

            tracker.stop()

            perf = tracker.summary()
            perf["ttft"] = ttft
            print("MODEL PERFORMANCE REPORT:")
        
            with open("Data/output.json", 'w') as json_file:
                json.dump(perf, json_file, indent=4)

            print("Saved to output.json")

            Query_Data  = QueryData(
                Model_Name = model,
                User_Query = user_query,
                Query_Time = Start_time,
                Response_Time = datetime.utcnow(),
                TTFT = ttft,
                Total_Time = perf["total_inference_time"],
                CPU_Usage = perf["cpu_avg"],
                CPU_Peak = perf["cpu_peak"],
                RAM_Peak = perf["mem_peak"],
                Disk_Read = perf["disk_read_total"],
                Disk_Write = perf["disk_write_total"],
                Success = True,
                Error_Message = None,
            )

            db.add(Query_Data)
            db.commit()
            db.close()

            print("Saved to DB")

        return Response(stream_with_context(generate()), mimetype="text/plain")
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
        MODELS.PHI.value,
        MODELS.MISTRAL.value
    ]

    return jsonify({"Response": Models_List, "Message": "Sucess"}), 200

@app.route("/api/results", methods=["GET"])
def get_results(): 
    path = safe_join(Data_Dir, "output.json")
    if not path or not os.path.isfile(path):
        abort(404)
    directory = os.path.dirname(path)
    name = os.path.basename(path)
    return send_from_directory(directory, name, as_attachment=True)

@app.route("/api/model_data", methods=["GET"])
def get_DB_data():
    
    db = SessionLocal()

    results = db.execute(select(QueryData)).scalars().all()

    db.close()

    return jsonify({"Response": results, "Message": "Sucess"}), 200

if __name__ == '__main__':  
   app.run(host="0.0.0.0", port=5000)