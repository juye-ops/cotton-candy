from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

import os

import docker

router = APIRouter(
    prefix="/docker",
)

class Container(BaseModel):
    class Build(BaseModel):
        class Oper(BaseModel):
            name: str
            version: str

        class App(BaseModel):
            name: str
            version: str
        os: Oper
        apps: List[Oper]
    

    class Run(BaseModel):
        ports: list
        environments: Dict[str, str]

    project: str
    build: Build
    run: Run


app_installer ={
    "python": lambda ver: [f"RUN apt install python{ver} -y"],
    "node": lambda ver: [f"RUN curl -fsSL https://deb.nodesource.com/setup_{ver}.x | bash -", "RUN apt install -y nodejs"]
}


@router.get("/access")
def access():
    global client
    client = docker.DockerClient(base_url="tcp://docker:2375")
    return "Certified Authorization"

@router.post("/build")
def build(config: Container):
    global client

    config = config.dict()
    print(config)
    build_config = config['build']
    run_config = config['run']

    project_name = config['project']
    project_os = build_config['os']
    project_apps = build_config['apps']

    os.makedirs(f"projects/{project_name}", exist_ok=True)


    # Create Dockerfile
    f = open(f"projects/{project_name}/Dockerfile", "w")

    f.write(f"FROM {project_os['name']}:{project_os['version']}\n")
    f.write("\n")
    f.write("RUN apt update\n")
    f.write("RUN apt install curl  -y\n")
    f.write("RUN curl -fsSL https://code-server.dev/install.sh | sh\n")
    f.write("\n")
    for app in project_apps:
        app_name = app['name']
        app_version = app['version']
        for cmd in app_installer[app_name](app_version):
            f.write(f"{cmd}\n")
    f.write("\n")
    f.write("CMD [\"code-server\", \"--bind-addr=0.0.0.0\", \"--port=8080\", \"--auth=none\"]")
    f.close()


    # build dockerfile
    client.images.build(path=f"projects/{project_name}", dockerfile=f"Dockerfile", tag=project_name)

    # # run container
    ports = {}
    for p in run_config['ports']:
        ports[p] = p
    client.containers.run(image=project_name, ports=ports, environment=run_config['environments'], detach=True)


    return "dockerfile created"