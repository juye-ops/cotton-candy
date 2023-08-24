import uvicorn
# from fastapi import FastAPI

from routers import container, project, version

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.router.redirect_slashes = False

app.include_router(container.router)
app.include_router(project.router)
app.include_router(version.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000)
