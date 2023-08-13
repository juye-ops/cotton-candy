import requests

from database import *


def add_proxy(container_name, container_ip):
    container_info = {"name": container_name, "ip": container_ip}

    requests.post("http://container:28001/api/proxies", json=container_info)
