from pydantic import BaseModel
from typing import List, Dict, Any

# Container models
class ContainerCreate(BaseModel):
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


class ContainerEdit(BaseModel):
    class Settings(BaseModel):
        ports: list
        environments: Dict[str, str]

    old_name: str
    new_name: str
    project: str
    description: str
    gpu: bool
    settings: Settings

# Project models
class ProjectCreate(BaseModel):
    name: str
    description: str


class ProjectEdit(BaseModel):
    old_name: str
    new_name: str
    description: str

# User models
class UserAuth(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    username: str