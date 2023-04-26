import uvicorn
from routers import dock, user

from fastapi import FastAPI

app = FastAPI()
app.include_router(user.router)
app.include_router(dock.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True, access_log=False)