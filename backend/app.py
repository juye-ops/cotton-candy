import uvicorn

from fastapi import FastAPI

from routers import container, project, version, user
from utils import create_register_token
from database import add_token_into_database


app = FastAPI()
app.router.redirect_slashes = False

app.include_router(container.router)
app.include_router(project.router)
app.include_router(version.router)
app.include_router(user.router)

if __name__ == "__main__":
    token = create_register_token()
    add_token_into_database(token)
    uvicorn.run("app:app", host="0.0.0.0", port=5000)
