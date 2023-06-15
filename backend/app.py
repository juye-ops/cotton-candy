import uvicorn
from fastapi import FastAPI

from routers import dind, container
from utils import database

app = FastAPI()
app.include_router(dind.router)
app.include_router(container.router)

if __name__ == "__main__":
    database.preprocess()

    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True, access_log=False)