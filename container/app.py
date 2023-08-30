import subprocess

import uvicorn

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 데이터 구조 초기화
proxies = {}
nginx_config_path = '/etc/nginx/nginx.conf'

class Add(BaseModel):
    name: str
    ip: str

class Edit(BaseModel):
    old_name: str
    new_name: str


def write_config():
    proxy_config = ''

    for name, url in proxies.items():
        proxy_config += f'''
        location /{name}/ {{
            proxy_pass {url};
            proxy_set_header Host $host;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            proxy_set_header Accept-Encoding gzip;
        }}
        '''

    nginx_config = f'''
    events {{}}
    http {{
        server {{
            listen 80;
            server_name container;

            {proxy_config}

        }}
    }}
    '''

    with open(nginx_config_path, 'w') as f:
        f.write(nginx_config)


@app.post('/proxies/add')
def add_proxy(proxy: Add):
    proxies[proxy.name] = f"http://{proxy.ip}/"

    write_config()

    # Nginx server reload
    subprocess.run(['nginx', '-s', 'reload'])

    return {'message': 'Proxy added successfully'} 

@app.post('/proxies/edit')
def add_proxy(names: Edit):
    proxies[names.new_name] = proxies[names.old_name]
    del proxies[names.old_name]

    write_config()

    # Nginx server reload
    subprocess.run(['nginx', '-s', 'reload'])

    return {'message': 'Proxy added successfully'} 

@app.delete('/proxies/remove')
def add_proxy(name):
    del proxies[name]
    
    write_config()

    # Nginx server reload
    subprocess.run(['nginx', '-s', 'reload'])

    return {'message': 'Proxy removed successfully'} 

# 서버 시작
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=28001)