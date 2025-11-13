import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

import pytest
from src.models import MODELS
from src.llm import query_model

test_case = [
    (MODELS.DEEPSEEK, "What is the meaning of life"),
    (MODELS.GEMMA, "What is the meaning of life"),
    (MODELS.GRANITE, "What is the meaning of life"), 
    (MODELS.LLAMA, "What is the meaning of life"),
    (MODELS.PHI, "What  is the meaning of life")
]

def canary_test():
    assert True

@pytest.mark.parametrize("model, query", test_case)
def test_model(model, query):
    result = query_model(model, query)

    assert result != None