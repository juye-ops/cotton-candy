from fastapi import APIRouter, Depends

from database import *
from routers import ProjectCreate, ProjectEdit
from utils import dind, ide
from utils.auth import check_access_token

router = APIRouter(
    prefix="/project",
)


@router.get("/list")
def _list():
    return ProjectDB.get_projects()

@router.get("/info")
def _info(name, payload: dict = Depends(check_access_token)):
    return ProjectDB.get_info_by_name(name)[0]

@router.get("/len")
def _len(name, payload: dict = Depends(check_access_token)):
    return ProjectDB.get_number_of_containers_by_name(name)[0]["count(*)"]


@router.post("/create")
def _create(info: ProjectCreate, payload: dict = Depends(check_access_token)):
    info = info.dict()

    project_name = info["name"]
    project_desc = info["description"]

    net_info = dind.Network.create(info["name"])

    ProjectDB.insert_project(project_name, project_desc, net_info["subnet"])

    return 200

@router.post("/edit")
def _edit(res: ProjectEdit, payload: dict = Depends(check_access_token)):
    res = res.dict()

    old_name = res["old_name"]
    new_name = res["new_name"]
    project_desc = res["description"]
    
    container_list = ProjectDB.get_containers_by_name(old_name)

    dind.Network.disconnect_all(res["old_name"])
    dind.Network.remove(res["old_name"])
    net_info = dind.Network.create(res["new_name"])
    dind.Network.connect_containers(new_name, container_list)
    
    ProjectDB.update_project_by_name(old_name, new_name, project_desc, net_info["subnet"])
    for c in container_list:
        container_ip = dind.Container.get_info(c["name"])["NetworkSettings"]["Networks"][new_name]["IPAddress"]
        ContainerDB.update_ip_by_name(c["name"], container_ip)

    return 200

@router.delete("/remove")
def _remove(name: str, payload: dict = Depends(check_access_token)):
    container_list = ProjectDB.get_containers_by_name(name)

    for c in container_list:
        dind.Container.remove(c["name"])
        ide.rm_proxy(name)

    dind.Network.remove(name)

    ProjectDB.delete_by_name(name)
