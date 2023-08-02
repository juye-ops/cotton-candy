from fastapi import APIRouter
from pydantic import BaseModel
from database import *
from utils import iac, dind

router = APIRouter(
    prefix="/project",
)

class ProjectInfo(BaseModel):
    user_name: str
    name: str
    description: str

@router.post("/create/")
def create_project(info: ProjectInfo):
    info = info.dict()

    ip_range = ProjectDB.get_len() + 1
    subnet = f'172.16.{ip_range}.0/24'
    gateway = f'172.16.{ip_range}.254'

    ProjectDB.create(info, subnet)
    dind.create_network(info['name'], subnet, gateway)
    
    
    return 200