from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from database import *
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

class UserAuth(BaseModel):
    username: str
    password: str

@router.post("/signup")
def _signup(data: UserAuth):
    user = UserDB.get(data.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this ID already exists"
        )
    
    UserDB.add(data.username, get_hashed_password(data.password))

@router.post('/signin', summary="Create access and refresh tokens for user")
def _signin(form_data: OAuth2PasswordRequestForm = Depends()):
    user = UserDB.get(form_data.username)
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
    
    UserDB.add_refresh_token(user['username'], refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }

@router.get("/signout")
def _signout(token_data: dict = Depends(check_access_token)):
    username = token_data.sub
    UserDB.delete_refresh_token(username)

class UserOut(BaseModel):
    username: str

class SystemUser(UserOut):
    password: str


@router.get('/test', summary='Get details of currently logged in user', response_model=UserOut)
def _test(token_data: dict = Depends(check_access_token)):
    user = UserDB.get(token_data.sub)[0]
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    return user

@router.get('/check/refresh')
def _check_rtoken(data = Depends(check_refresh_token)):
    token_data = data["payload"]
    refresh_token = data["token"]
    target_token = UserDB.get_rtoken_by_username(token_data.sub)[0]["refresh_token"].decode("ascii")
    
    if refresh_token != target_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(token_data.sub)
    return access_token