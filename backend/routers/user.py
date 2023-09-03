from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse

from database import *
from routers import UserAuth, UserOut
from utils.auth import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    check_access_token,
    check_refresh_token
)

router = APIRouter(
    prefix="/user",
)

@router.post("/signup")
def _signup(data: UserAuth):
    register_token = UserDB.get_register_token()[0]["token"]
    register_token = str(register_token, encoding="utf-8")
    
    if data.token != register_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    user = UserDB.get_user_by_username(data.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this ID already exists"
        )
    
    UserDB.insert_user(data.username, get_hashed_password(data.password))

@router.post('/signin', summary="Create access and refresh tokens for user")
def _signin(form_data: OAuth2PasswordRequestForm = Depends()):
    user = UserDB.get_user_by_username(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    user = user[0]
    hashed_pass = user['password']
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(user['username'])
    refresh_token = create_refresh_token(user['username'])
    
    UserDB.insert_refresh_token(user['username'], refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }

@router.get("/signout")
def _signout(payload: dict = Depends(check_access_token)):
    username = payload["sub"]
    UserDB.delete_refresh_token_by_username(username)


@router.get('/test', summary='Get details of currently logged in user', response_model=UserOut)
def _test(payload: dict = Depends(check_access_token)):
    user = UserDB.get_user_by_username(payload["sub"])[0]
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    return user

@router.get('/check/refresh')
def _check_rtoken(data = Depends(check_refresh_token)):
    payload = data["payload"]
    refresh_token = data["token"]
    target_token = UserDB.get_rtoken_by_username(payload["sub"])[0]["refresh_token"].decode("ascii")
    
    if refresh_token != target_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(payload["sub"])
    return access_token