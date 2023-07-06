from utils import docker_cli

def build(project_name):
    # build dockerfile
    docker_cli.images.build(path=f"projects/{project_name}", dockerfile=f"Dockerfile", tag=project_name)

def run(name, ports, environments):
    # run container with configs of 'settings'
    ports = {}
    for p in ports:
        ports[p] = p

    docker_cli.containers.run(
        image=name, 
        name=name, 
        network="cotton-net",
        ports=ports, 
        environment=environments, 
        detach=True)