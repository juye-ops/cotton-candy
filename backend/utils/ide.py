import requests

from database import *


def add_proxy(container_name, subnet):
    subnet = subnet.split(".")
    subnet[-1] = str(ContainerDB.get_len())

    container_ip = ".".join(subnet)

    container_info = {"name": container_name, "ip": container_ip}

    requests.post("http://container:28001/api/proxies", json=container_info)
