from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from database import *
from utils import iac, dind, ide

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
        frameworks: List[OperSys]

    class Settings(BaseModel):
        ports: list
        environments: Dict[str, str]

    name: str
    project: str
    description: str
    gpu: bool
    build: Build
    settings: Settings


@router.get("/list/")
def container_list(project: str):
    container_list = ContainerDB.get_list(project)
    return container_list


@router.post("/create")
def build(config: ContainerInfo):
    config = config.dict()

    container_name = config["name"]
    container_project = config["project"]
    container_desc = config["description"]
    container_gpu = config["gpu"]

    build_config = config["build"]
    settings_config = config["settings"]

    container_os = build_config["os"]
    container_frameworks = build_config["frameworks"]

    container_ports = settings_config["ports"]
    container_envs = settings_config["environments"]

    container_ports = {p: p for p in container_ports}

    # create dockerfile
    iac.create(container_name, container_os, container_frameworks)
    dind.build(container_name)
    dind.run(container_name, container_project, container_ports, container_envs)

    # Insert database
    ContainerDB.create(
        container_name,
        container_project,
        container_desc,
        container_gpu,
        container_ports,
        container_envs,
        container_os,
        container_frameworks,
    )

    # add ide proxy
    subnet = ProjectDB.get_subnet(container_project)
    ide.add_proxy(container_name, subnet)

    return 200
