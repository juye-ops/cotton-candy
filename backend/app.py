import uvicorn
# from fastapi import FastAPI

from routers import container, project, version

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    # "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app = FastAPI()
app.include_router(container.router)
app.include_router(project.router)
app.include_router(version.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, access_log=False)
