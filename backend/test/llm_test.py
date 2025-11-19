import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

import pytest
from models import MODELS
from llm import query_model

test_case = [
    (MODELS.DEEPSEEK.value, "What is the meaning of life"),
    (MODELS.GEMMA.value, "What is the meaning of life"),
    (MODELS.GRANITE.value, "What is the meaning of life"), 
    (MODELS.LLAMA.value, "What is the meaning of life"),
    (MODELS.PHI.value, "What  is the meaning of life")
]

def canary_test():
    assert True

@pytest.mark.parametrize("model, query", test_case)
def test_model(model, query):
    result = query_model(model, query)

    assert result != None