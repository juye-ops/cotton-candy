from fastapi import APIRouter

from database import *

router = APIRouter(
    prefix="/version",
)


@router.get("/framework/{app}")
def get_framework_version(app):
    return FrameworkDB.get_version(app)


@router.get("/framework/")
def get_framework_list():
    return FrameworkDB.get_list()


@router.get("/os/{app}")
def get_os_version(app):
    return OSDB.get_version(app)


@router.get("/os/")
def get_os_list():
    return OSDB.get_list()
