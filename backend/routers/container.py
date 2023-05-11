import os

import docker
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from utils import database

router = APIRouter(
    prefix="/container",
)

@router.get("/platform/version/{app}")
def access(app):
    return database.read("images", "platform", {"name": app})