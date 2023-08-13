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
    desc: str


@router.get("/list/")
def project_list():
    project_list = ProjectDB.get_list()
    return project_list


@router.post("/create/")
def create_project(info: Create):
    info = info.dict()

    project_name = info["name"]
    project_desc = info["description"]

    net_info = dind.Network.create(info["name"])

    ProjectDB.create(project_name, project_desc, net_info['subnet'])

    return 200

@router.post("/edit/")
def create_project(res: Edit):
    res = res.dict()

    old_name = res["old_name"]
    new_name = res["new_name"]
    project_desc = res["desc"]
    
    container_list = ProjectDB.get_containers(old_name)

    dind.Network.disconnect_all(res["old_name"])
    dind.Network.remove(res["old_name"])
    net_info = dind.Network.create(res["new_name"])
    dind.Network.connect_containers(new_name, container_list)

    ProjectDB.update(old_name, new_name, project_desc, net_info['subnet'])

    return 200
