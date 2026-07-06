import urllib.request

try:
    response = urllib.request.urlopen('http://localhost:3000/api/propiedades')
    print("Status:", response.status)
    print("Body:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTPError Status:", e.code)
    print("HTTPError Body:", e.read().decode('utf-8'))
except Exception as e:
    print("Exception:", e)
