import uvicorn
import docker

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def processes():
    pass

@app.get("/access")
def processes():
    global client
    client = docker.DockerClient(base_url="tcp://docker:2375")


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True, access_log=False)