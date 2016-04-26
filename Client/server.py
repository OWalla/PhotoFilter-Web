import http.server
import socketserver

PORT = 8001

Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
print("Access at http://localhost:8001/")
httpd.serve_forever()
