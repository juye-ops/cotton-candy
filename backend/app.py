import uvicorn
from fastapi import FastAPI

from routers import container, project, version

app = FastAPI()
app.include_router(container.router)
app.include_router(project.router)
app.include_router(version.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, access_log=False)
