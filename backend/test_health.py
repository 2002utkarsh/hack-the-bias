import requests
try:
    r = requests.get("http://127.0.0.1:5000/")
    print(f"Status Code: {r.status_code}")
    print(f"Response: {r.json()}")
except Exception as e:
    print(f"FAILED: {e}")
