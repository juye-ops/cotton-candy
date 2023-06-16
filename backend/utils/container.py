import os
import docker

pf_installer ={
    "python": lambda ver: [f"RUN apt install python{ver} -y"],
    "node": lambda ver: [f"RUN curl -fsSL https://deb.nodesource.com/setup_{ver}.x | bash -", "RUN apt install -y nodejs"]
}


class Docker:
    def preprocess():
        while True:
            try:
                docker_cli = docker.DockerClient(base_url="tcp://containers:2375")
                break

            except:
                pass

        ipam_pool = docker.types.IPAMPool(
            subnet='172.24.1.0/24',
            gateway='172.24.1.254'
        )
        ipam_config = docker.types.IPAMConfig(
            pool_configs=[ipam_pool]
        )
        docker_cli.networks.create(
            "cotton-net",
            driver="bridge",
            ipam=ipam_config
        )

        return docker_cli

class IaC:
    def create(project_name: str, project_os: str, project_pfs: str) -> None:
        os.makedirs(f"projects/{project_name}", exist_ok=True)


        # Create Dockerfile
        f = open(f"projects/{project_name}/Dockerfile", "w")

        f.write(f"FROM {project_os['name']}:{project_os['version']}\n")
        f.write("\n")
        f.write("RUN apt update\n")
        f.write("RUN apt install curl  -y\n")
        f.write("RUN curl -fsSL https://code-server.dev/install.sh | sh\n")
        f.write("\n")
        for app in project_pfs:
            app_name = app['name']
            app_version = app['version']
            for cmd in pf_installer[app_name](app_version):
                f.write(f"{cmd}\n")
        f.write("\n")
        f.write("CMD [\"code-server\", \"--bind-addr=0.0.0.0\", \"--port=80\", \"--auth=none\"]")
        f.close()