from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from database import *
from utils import iac, dind, ide

router = APIRouter(
    prefix="/container",
)


class Create(BaseModel):
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


class Edit(BaseModel):
    class Settings(BaseModel):
        ports: list
        environments: Dict[str, str]

    old_name: str
    new_name: str
    project: str
    description: str
    gpu: bool
    settings: Settings


@router.get("/list")
def _list(project: str):
    container_list = ContainerDB.get_list(project)
    return container_list


@router.post("/create")
def _create(config: Create):
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
    dind.Container.build(container_name)
    dind.Container.run(
        container_name, container_project, container_ports, container_envs
    )

    container_ip = dind.Container.get_info(container_name)["NetworkSettings"]["Networks"][container_project]["IPAddress"]  # Get IP Address

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
        container_ip,
    )

    # add ide proxy
    ide.add_proxy(container_name, container_ip)

    return 200


@router.post("/edit")
def _edit(config: Edit):
    config = config.dict()

    old_name = config["old_name"]
    new_name = config["new_name"]
    container_project = config["project"]
    container_desc = config["description"]
    container_gpu = config["gpu"]

    settings_config = config["settings"]

    container_ports = settings_config["ports"]
    container_envs = settings_config["environments"]

    container_ports = {p: p for p in container_ports}

    dind.Container.edit(
        old_name, new_name, container_project, container_ports, container_envs
    )

    # Insert database
    ContainerDB.edit(
        old_name,
        new_name,
        container_desc,
        container_gpu,
        container_ports,
        container_envs,
    )

    return 200


@router.delete("/remove")
def _remove(name: str):
    dind.Container.remove(name)
    ContainerDB.remove(name)
    return 200
