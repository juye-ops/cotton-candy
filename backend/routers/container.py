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

class ContainerInfo(BaseModel):
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
def build(config: ContainerInfo):
    config = config.dict()

    container_name = config['project']

    build_config = config['build']
    settings_config = config['settings']

    container_os = build_config['os']
    container_platforms = build_config['platforms']

    container_ports = settings_config['ports']
    container_envs = settings_config['environments']

    container_ports = {p: p for p in container_ports}

    # create dockerfile
    iac.create(container_name, container_os, container_platforms)
    dind.build(container_name)
    dind.run(container_name, container_ports, container_envs)

    next_ip = f"172.24.1.{len(ContainerDB.read())+1}"
    container_info = {
        "name": container_name,
        "ip": next_ip
    }

    # ContainerDB.push(container_info.copy())
    requests.post("http://container:28001/api/proxies", json=container_info)

    return 200