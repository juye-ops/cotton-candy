from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/user",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)

@router.get("/login")
def login():
    pass