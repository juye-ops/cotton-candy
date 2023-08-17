from fastapi import APIRouter

from database import *

router = APIRouter(
    prefix="/version",
)


@router.get("/framework/{app}")
def _framework_version(app):
    data = FrameworkDB.get_version(app)
    ret = [x["version"] for x in data]
    return ret


@router.get("/framework/")
def _framework_list():
    return FrameworkDB.get_list()


@router.get("/os/{app}")
def _os_version(app):
    data = OSDB.get_version(app)
    ret = [x["version"] for x in data]
    return ret


@router.get("/os/")
def _os_list():
    data = OSDB.get_list()
    ret = [x["name"] for x in data]

    return ret
