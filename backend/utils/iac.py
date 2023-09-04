import os

pf_installer = {
    "python": lambda ver: [f"RUN apt-get install python{ver} -y"],
    "node": lambda ver: [
        f"RUN curl -fsSL https://deb.nodesource.com/setup_{ver}.x | bash -",
        "RUN apt-get install -y nodejs",
    ],
    "mysql": lambda ver:[f"RUN apt-get install mysql-server-{ver} -y"]
}


def create(project_name, project_os, project_pfs) -> None:
    os.makedirs(f"client/{project_name}", exist_ok=True)

    # Create Dockerfile
    f = open(f"client/{project_name}/Dockerfile", "w")

    f.write(f"FROM {project_os.name}:{project_os.version}\n")
    f.write("\n")
    f.write("RUN apt-get update\n")
    f.write("RUN apt-get install curl apt-transport-https -y\n")
    f.write("RUN curl -fsSL https://code-server.dev/install.sh | sh\n")
    f.write("\n")
    for app in project_pfs:
        app_name = app.name
        app_version = app.version
        for cmd in pf_installer[app_name](app_version):
            f.write(f"{cmd}\n")
    f.write("\n")
    f.write('CMD ["code-server", "--bind-addr=0.0.0.0", "--port=80", "--auth=none"]')
    f.close()
