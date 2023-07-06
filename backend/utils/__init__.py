import docker

def connect_docker():
    while True:
        try:
            docker_cli = docker.DockerClient(base_url="tcp://container:2375")
            break
        except:
            pass
    
    ipam_pool = docker.types.IPAMPool(
        subnet='172.24.1.0/24',
        gateway='172.24.1.254'
    )

    # dind network will be moved to when creating project later..
    ipam_config = docker.types.IPAMConfig(
        pool_configs=[ipam_pool]
    )
    docker_cli.networks.create(
        "cotton-net",
        driver="bridge",
        ipam=ipam_config
    )

    return docker_cli

docker_cli = connect_docker()