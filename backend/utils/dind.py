from utils import docker_cli

def build(project_name):
    # build dockerfile
    docker_cli.images.build(
        path=f"projects/{project_name}", 
        dockerfile=f"Dockerfile", 
        tag=project_name
    )

def run(project_name, project_ports, project_envs):
    # run container with configs of 'settings'
    docker_cli.containers.run(
        image=project_name, 
        name=project_name, 
        network="cotton-net",
        ports=project_ports, 
        environment=project_envs, 
        detach=True
    )
