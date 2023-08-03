from utils import docker_cli


def build(container_name):
    # build dockerfile
    docker_cli.images.build(
        path=f"client/{container_name}",
        dockerfile=f"Dockerfile",
        tag=container_name,
    )


def run(container_name, project_name, container_ports, container_envs):
    # run container with configs of 'settings'
    docker_cli.containers.run(
        image=container_name,
        name=container_name,
        network=project_name,
        ports=container_ports,
        environment=container_envs,
        detach=True,
    )


def create_network(name, subnet, gateway):
    import docker

    ipam_pool = docker.types.IPAMPool(subnet=subnet, gateway=gateway)

    ipam_config = docker.types.IPAMConfig(pool_configs=[ipam_pool])

    docker_cli.networks.create(name=name, driver="bridge", ipam=ipam_config)
