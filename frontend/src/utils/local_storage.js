function Save_With_Expiry(key, value, ttl_ms=60 * 60 * 1000) {
    const now = Date.now();

    const item = {
        value: value,
        expiry: now + ttl_ms,
    };

    localStorage.setItem(key, JSON.stringify(item));
}


function Load_With_Expiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

function Save_Response(query, model, result) {
    let existing = Load_With_Expiry("Model_Responses") || [];

    existing.push({
        model_query: query,
        model_used: model,
        model_response: result,
        timestamp: Date.now()
    });

    Save_With_Expiry("Model_Responses", existing);
}

export {Save_With_Expiry, Load_With_Expiry, Save_Response}