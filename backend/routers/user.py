from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/user",
)

@router.get("/login")
def login():
    pass