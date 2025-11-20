import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

import pytest
from models import MODELS
from llm import query_model

url = "http://localhost:11434"

test_case = [
    (MODELS.DEEPSEEK.value, "What is the meaning of life", url),
    (MODELS.GEMMA.value, "What is the meaning of life", url),
    (MODELS.GRANITE.value, "What is the meaning of life", url), 
    (MODELS.LLAMA.value, "What is the meaning of life", url),
    (MODELS.PHI.value, "What  is the meaning of life", url)
]

def canary_test():
    assert True

@pytest.mark.parametrize("model, query, url", test_case)
def test_model(model, query, url):
    result = query_model(model, query, url)

    assert result != None