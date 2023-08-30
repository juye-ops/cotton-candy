import uvicorn
# from fastapi import FastAPI

from routers import container, project, version, user

from fastapi import FastAPI

app = FastAPI()
app.router.redirect_slashes = False

app.include_router(container.router)
app.include_router(project.router)
app.include_router(version.router)
app.include_router(user.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000)
