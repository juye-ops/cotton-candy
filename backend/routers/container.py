import os
import requests
import json

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from database import *
from utils import iac, dind

router = APIRouter(
    prefix="/container",
)

@router.get("/platform/version/{app}")
def access(app):
    return PlatformDB.read({"name": app})


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
    config = config.dict()

    project_name = config['project']

    build_config = config['build']
    settings_config = config['settings']

    project_os = build_config['os']
    project_platforms = build_config['platforms']

    project_ports = settings_config['ports']
    project_environments = settings_config['environments']


    # create dockerfile
    iac.create(project_name, project_os, project_platforms)
    dind.build(project_name)
    dind.run(project_name, project_ports, project_environments)

    next_ip = f"172.24.1.{len(ContainerDB.read('Containers', 'infos'))+1}"
    ContainerDB.push({"name": project_name, "ip": "next_ip"})

    container_info = {
        "name": "webserver",
        "url": f"http://{next_ip}/"
    }

    requests.post("http://containers:28001/api/proxies", json=container_info)

    return 200