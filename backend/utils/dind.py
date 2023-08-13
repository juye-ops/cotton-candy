from utils import docker_cli


class Container:
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

    def get_info(container_name):
        return docker_cli.api.inspect_container(container_name)

    def edit(old_name, new_name, project_name, container_ports, container_envs):
        container = docker_cli.containers.get(old_name)
        container.stop()
        container.commit(repository=new_name)
        container.remove()

        docker_cli.containers.run(
            image=new_name,
            name=new_name,
            network=project_name,
            ports=container_ports,
            environment=container_envs,
            detach=True,
        )

class Network:
    def create(name):
        net = docker_cli.networks.create(name=name, driver="bridge")
        info = {
            'subnet': net.attrs['IPAM']['Config'][0]['Subnet']
        }
        return info

    def remove(name):
        net = docker_cli.networks.get(name)
        net.remove()

    def connect_containers(project_name, containers):
        net = docker_cli.networks.get(project_name)

        for c in containers:
            net.connect(c['name'])

    def disconnect_all(project_name):
        net = docker_cli.networks.get(project_name)
        containers = net.containers
        for c in containers:
            net.disconnect(c.attrs['Id'])