import json
from unittest.mock import patch
from src.app import app

def test_api_success():
    """Test when valid JSON is provided and query_model returns a value."""
    client = app.test_client()

    with patch("src.app.query_model") as mock_query:
        mock_query.return_value = "mocked response"

        response = client.get(
            "/api",
            data=json.dumps({"model": "qwen", "query": "Hello"}),
            content_type="application/json"
        )

        assert response.status_code == 200
        body = response.get_json()

        assert body["Message"] == "Sucess"
        assert body["Response"] == "mocked response"
        mock_query.assert_called_once_with("qwen", "Hello")


def test_api_not_json():
    """Test when the request body is not JSON."""
    client = app.test_client()

    response = client.get("/api", data="not json")

    assert response.status_code == 400
    body = response.get_json()

    assert body["Message"] == "Failure"
    assert body["Response"] == "Request must be JSON"
