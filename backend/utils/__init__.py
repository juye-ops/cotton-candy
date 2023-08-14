import docker

docker_cli = docker.DockerClient(base_url="tcp://container:2375", timeout=None)
