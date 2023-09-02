from fastapi import APIRouter, Depends

from database import *
from routers import ContainerCreate, ContainerEdit
from utils import dind, iac, ide
from utils.auth import check_access_token


router = APIRouter(
    prefix="/container",
)

@router.get("/list")
def _list(project: str, payload: dict = Depends(check_access_token)):
    username = payload["sub"]
    user_id = UserDB.get_id_by_username(username)[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, project)[0]["id"]
    return ContainerDB.get_containers_by_project_id(project_id)

@router.get("/info")
def _info(project: str, name: str, payload: dict = Depends(check_access_token)):
    username = payload["sub"]
    user_id = UserDB.get_id_by_username(username)[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, project)[0]["id"]
    container_id = ContainerDB.get_id_by_name(project_id, name)[0]["id"]
    return ContainerDB.get_info_by_id(container_id)

@router.post("/create")
def _create(config: ContainerCreate, payload: dict = Depends(check_access_token)):
    container_name = config.name
    container_project = config.project
    container_desc = config.description
    container_gpu = config.gpu

    build_config = config.build
    settings_config = config.settings

    container_os = build_config.os
    container_frameworks = build_config.frameworks

    container_ports = settings_config.ports
    container_envs = settings_config.environments

    container_ports = {p: p for p in container_ports}

    # create dockerfile
    iac.create(container_name, container_os, container_frameworks)
    dind.Container.build(container_name)
    dind.Container.run(
        container_name, container_project, container_ports, container_envs
    )

    container_ip = dind.Container.info(container_name)["NetworkSettings"]["Networks"][container_project]["IPAddress"]  # Get IP Address
    
    # Insert database
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, container_project)[0]["id"]
    ContainerDB.insert_container(
        container_name,
        project_id,
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
def _edit(config: ContainerEdit, payload: dict = Depends(check_access_token)):
    old_name = config.old_name
    new_name = config.new_name
    container_project = config.project
    container_desc = config.description
    container_gpu = config.gpu

    settings_config = config.settings

    container_ports = settings_config.ports
    container_envs = settings_config.environments

    container_ports = {p: p for p in container_ports}

    dind.Container.edit(
        old_name, new_name, container_project, container_ports, container_envs
    )

    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, container_project)[0]["id"]
    container_id = ContainerDB.get_id_by_name(project_id, old_name)[0]["id"]

    # Insert database
    ContainerDB.update_container_by_id(
        container_id,
        new_name,
        container_desc,
        container_gpu,
        container_ports,
        container_envs,
    )

    return 200

@router.delete("/remove")
def _remove(name: str, payload: dict = Depends(check_access_token)):
    dind.Container.remove(name)
    ContainerDB.delete_by_name(name)
    ide.rm_proxy(name)
    return 200
