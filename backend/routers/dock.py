from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

import os

import docker


router = APIRouter(
    prefix="/docker",
)

class Dockerfile(BaseModel):
    class Oper(BaseModel):
        name: str
        version: str

    class App(BaseModel):
        name: str
        version: str
    
    project: str
    os: Oper
    apps: List[Oper]


app_installer ={
    "python": lambda ver: f"apt install python{ver}",
    "node": lambda ver: f"curl -fsSL https://deb.nodesource.com/setup_{ver}.x | sudo -E bash - && apt install -y nodejs"
}


@router.get("/access")
def access():
    global client
    client = docker.DockerClient(base_url="tcp://172.22.0.2:2375")

@router.post("/build")
def build(config: Dockerfile):
    global client

    config = eval(config.json())

    project_name = config["project"]
    project_os = config["os"]
    project_apps = config["apps"]

    os.makedirs(f"projects/{project_name}", exist_ok=True)

    f = open(f"projects/{project_name}/Dockerfile", "w")

    # Create Dockerfile
    f.write(f"FROM {project_os['name']}:{project_os['version']}\n")
    f.write("\n")
    f.write("RUN apt update && apt install curl\n")
    f.write("RUN curl -fsSL https://code-server.dev/install.sh | sh\n")
    f.write("\n")
    for app in project_apps:
        app_name = app['name']
        app_version = app['version']
        f.write(f"RUN {app_installer[app_name](app_version)}\n")
    f.write("\n")
    f.write("CMD [\"code-server\", \"--bind-addr=0.0.0.0\", \"--port=8080\"]")
    ###################

    client.images.build(f"projects/{project_name}")

    return "dockerfile created"