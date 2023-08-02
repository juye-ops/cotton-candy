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

def create_network(name, subnet, gateway):
    import docker
    ipam_pool = docker.types.IPAMPool(
        subnet = subnet,
        gateway = gateway
    )

    ipam_config = docker.types.IPAMConfig(
        pool_configs=[ipam_pool]
    )

    docker_cli.networks.create(
        name=name,
        driver="bridge",
        ipam=ipam_config
    )
