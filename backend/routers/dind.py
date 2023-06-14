import os

import docker
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from utils import iac

router = APIRouter(
    prefix="/docker",
)

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

@router.get("/access")
def access():
    global docker_cli
    docker_cli = docker.DockerClient(base_url="tcp://containers:2375")

    return 200

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
    iac.create(project_name, project_os, project_pfs)

    # build dockerfile
    docker_cli.images.build(path=f"projects/{project_name}", dockerfile=f"Dockerfile", tag=project_name)

    # run container with configs of 'settings'
    ports = {}
    for p in project_ports:
        ports[p] = p

    docker_cli.containers.run(image=project_name, ports=ports, environment=project_environments, detach=True)

    return 200