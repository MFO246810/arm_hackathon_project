import json
from unittest.mock import patch
from src.app import app
from src.models import MODELS

def test_api_Model_Call_success():
    """Test when valid JSON is provided and query_model returns a value."""
    client = app.test_client()

    with patch("src.app.query_model") as mock_query:
        mock_query.return_value = "mocked response"

        response = client.post(
            "/api/call",
            data=json.dumps({"model": "qwen", "query": "Hello"}),
            content_type="application/json"
        )

        assert response.status_code == 200
        body = response.get_json()

        assert body["Message"] == "Sucess"
        assert body["Response"] == "mocked response"
        mock_query.assert_called_once_with("qwen", "Hello")


def test_api_Model_Call_not_json():
    """Test when the request body is not JSON."""
    client = app.test_client()

    response = client.post("/api/call", data="not json")

    assert response.status_code == 400
    body = response.get_json()

    assert body["Message"] == "Failure"
    assert body["Response"] == "Request must be JSON"

def test_api_List_Models_sucess():
    client = app.test_client()

    response = client.get("/api/list")

    Models_List = [
        MODELS.DEEPSEEK.value,
        MODELS.GEMMA.value,
        MODELS.GRANITE.value,
        MODELS.LLAMA.value,
        MODELS.PHI.value
    ]

    body = response.get_json()
    assert response.status_code == 200
    assert body["Response"] == Models_List
    assert body["Message"] == "Sucess"

