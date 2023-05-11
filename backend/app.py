import uvicorn
from pymongo import MongoClient
from fastapi import FastAPI

from routers import dock, user
from utils import database

app = FastAPI()
app.include_router(user.router)
app.include_router(dock.router)

if __name__ == "__main__":
    client = MongoClient("mongodb://database:27017/")
    database.preprocess(client)

    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True, access_log=False)