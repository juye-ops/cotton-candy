import requests


def add_proxy(container_name, container_ip):
    container_info = {"name": container_name, "ip": container_ip}

    requests.post("http://container:28001/proxies/add", json=container_info)

def rm_proxy(container_name):
    requests.delete(f"http://container:28001/proxies/remove?name={container_name}")

def edit_proxy(container_name):
    requests.post(f"http://container:28001/proxies/edit?name={container_name}")
