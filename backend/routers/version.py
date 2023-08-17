from fastapi import APIRouter

from database import *

router = APIRouter(
    prefix="/version",
)


@router.get("/framework/{app}")
def get_framework_version(app):
    data = FrameworkDB.get_version(app)
    ret = [x["version"] for x in data]
    return ret


@router.get("/framework/")
def get_framework_list():
    return FrameworkDB.get_list()


@router.get("/os/{app}")
def get_os_version(app):
    data = OSDB.get_version(app)
    ret = [x["version"] for x in data]
    return ret


@router.get("/os/")
def get_os_list():
    data = OSDB.get_list()
    ret = [x["name"] for x in data]
    
    return ret
