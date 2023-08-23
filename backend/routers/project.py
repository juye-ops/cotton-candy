from fastapi import APIRouter
from pydantic import BaseModel
from database import *
from utils import iac, dind

router = APIRouter(
    prefix="/project",
)

class Create(BaseModel):
    user_name: str
    name: str
    description: str

class Edit(BaseModel):
    old_name: str
    new_name: str
    description: str


@router.get("/list/")
def _list():
    project_list = ProjectDB.get_list()
    return project_list


@router.post("/create/")
def _create(info: Create):
    info = info.dict()

    project_name = info["name"]
    project_desc = info["description"]

    net_info = dind.Network.create(info["name"])

    ProjectDB.create(project_name, project_desc, net_info['subnet'])

    return 200

@router.post("/edit/")
def _edit(res: Edit):
    res = res.dict()

    old_name = res["old_name"]
    new_name = res["new_name"]
    project_desc = res["desc"]
    
    container_list = ProjectDB.get_containers(old_name)

    dind.Network.disconnect_all(res["old_name"])
    dind.Network.remove(res["old_name"])
    net_info = dind.Network.create(res["new_name"])
    dind.Network.connect_containers(new_name, container_list)
    print(net_info, flush=True)
    ProjectDB.edit(old_name, new_name, project_desc, net_info['subnet'])
    for c in container_list:
        container_ip = dind.Container.get_info(c['name'])["NetworkSettings"]["Networks"][new_name]["IPAddress"]
        print(container_ip, flush=True)
        ContainerDB.update_ip(c["name"], container_ip)


    return 200

@router.delete("/remove/")
def _remove(name: str):
    container_list = ProjectDB.get_containers(name)

    for c in container_list:
        dind.Container.remove(c["name"])
    
    dind.Network.remove(name)

    ProjectDB.remove(name)