from fastapi import APIRouter, Depends

from database import *
from routers import ProjectCreate, ProjectEdit
from utils import dind, ide
from utils.auth import check_access_token

router = APIRouter(
    prefix="/project",
)


@router.get("/list")
def _list(payload: dict = Depends(check_access_token)):
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    return ProjectDB.get_projects_by_user_id(user_id)

@router.get("/info")
def _info(name: str, payload: dict = Depends(check_access_token)):
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, name)[0]["id"]
    return ProjectDB.get_info_by_id(project_id)[0]

@router.get("/len")
def _len(name, payload: dict = Depends(check_access_token)):
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, name)[0]["id"]
    return ProjectDB.get_number_of_containers_by_id(project_id)[0]["count(*)"]


@router.post("/create")
def _create(info: ProjectCreate, payload: dict = Depends(check_access_token)):
    project_name = info.name
    project_desc = info.description

    net_info = dind.Network.create(info.name)

    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    ProjectDB.insert_project(user_id, project_name, project_desc, net_info["subnet"])

    return 200

@router.post("/edit")
def _edit(res: ProjectEdit, payload: dict = Depends(check_access_token)):
    old_name = res.old_name
    new_name = res.new_name
    project_desc = res.description
    
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, old_name)[0]["id"]
    container_list = ProjectDB.get_containers_by_id(project_id)

    dind.Network.disconnect_all(old_name)
    dind.Network.remove(old_name)
    net_info = dind.Network.create(new_name)
    dind.Network.connect_containers(new_name, container_list)
    
    ProjectDB.update_project_by_id(project_id, new_name, project_desc, net_info["subnet"])
    for c in container_list:
        container_ip = dind.Container.info(c["name"])["NetworkSettings"]["Networks"][new_name]["IPAddress"]
        ContainerDB.update_ip_by_name(c["name"], container_ip)

    return 200

@router.delete("/remove")
def _remove(name: str, payload: dict = Depends(check_access_token)):
    user_id = UserDB.get_id_by_username(payload["sub"])[0]["id"]
    project_id = ProjectDB.get_id_by_name(user_id, name)[0]["id"]
    container_list = ProjectDB.get_containers_by_id(project_id)

    for c in container_list:
        dind.Container.remove(c["name"])
        ide.rm_proxy(name)

    dind.Network.remove(name)

    ProjectDB.delete_by_name(name)
