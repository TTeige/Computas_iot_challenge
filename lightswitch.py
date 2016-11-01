import requests
import BaseHTTPServer

HOST_NAME = "localhost"
PORT_NUMBER = 8080


class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_HEAD(s):
        s.send_response(200)
        s.send_header("Content-type", "text/xml")
        s.end_headers()

    def do_GET(s):
        """Respond to a GET request."""
        s.send_response(200)
        s.send_header("Content-type", "text/xml")
        s.end_headers()
        if "on" in s.path:
            requests.get('http://10.0.1.13:8083/ZAutomation/api/v1/devices/ZWayVDev_zway_5-0-37/command/on', data={}, auth=('admin', 'WelcometoCX01'))
        elif "off" in s.path:
            requests.get('http://10.0.1.13:8083/ZAutomation/api/v1/devices/ZWayVDev_zway_5-0-37/command/off', data={}, auth=('admin', 'WelcometoCX01'))

if __name__ == '__main__':
    server_class = BaseHTTPServer.HTTPServer
    print "serving"
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
