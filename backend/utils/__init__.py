import docker

docker_cli = docker.DockerClient(base_url="tcp://container:2375", timeout=None)

def create_register_token():
    import secrets
    token = secrets.token_hex(nbytes=16)
    stdout = f"""
    =====================================================
    Require below token for register USER
    
    {token}

    Save the token and fill it out when signing up
    =====================================================
    """
    print(stdout, flush=True)
    return token