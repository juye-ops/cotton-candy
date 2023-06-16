import os
import requests
import json

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from utils.container import IaC, Docker
from utils import database

router = APIRouter(
    prefix="/docker",
)

docker_cli = Docker.preprocess()

class Container(BaseModel):
    class Build(BaseModel):
        class OperSys(BaseModel):
            name: str
            version: str

        class Platform(BaseModel):
            name: str
            version: str
        os: OperSys
        platforms: List[OperSys]
    

    class Settings(BaseModel):
        ports: list
        environments: Dict[str, str]

    project: str
    description: str
    gpu: bool
    build: Build
    settings: Settings

@router.post("/build")
def build(config: Container):
    global docker_cli
    config = config.dict()

    project_name = config['project']

    build_config = config['build']
    settings_config = config['settings']

    project_os = build_config['os']
    project_pfs = build_config['platforms']

    project_ports = settings_config['ports']
    project_environments = settings_config['environments']


    # create dockerfile
    IaC.create(project_name, project_os, project_pfs)

    # build dockerfile
    docker_cli.images.build(path=f"projects/{project_name}", dockerfile=f"Dockerfile", tag=project_name)

    # run container with configs of 'settings'
    ports = {}
    for p in project_ports:
        ports[p] = p

    docker_cli.containers.run(
        image=project_name, 
        name=project_name, 
        network="cotton-net",
        ports=ports, 
        environment=project_environments, 
        detach=True)

    next_ip = f"172.24.1.{len(database.read('Containers', 'infos'))+1}"
    database.push("Containers", "infos", {"name": project_name, "ip": "next_ip"})

    container_info = {
        "name": "webserver",
        "url": f"http://{next_ip}/"
    }

    requests.post("http://containers:28001/api/proxies", json=container_info)

    return 200