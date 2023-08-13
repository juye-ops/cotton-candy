import subprocess

import uvicorn

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 데이터 구조 초기화
proxies = {}

class ProxyRequest(BaseModel):
    name: str
    ip: str

@app.post('/api/proxies')
def add_proxy(proxy: ProxyRequest):
    proxies[proxy.name] = f"http://{proxy.ip}/"

    nginx_config_path = '/etc/nginx/nginx.conf'
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

            # 기타 설정 영역
        }}
    }}
    '''

    with open(nginx_config_path, 'w') as f:
        f.write(nginx_config)

    # Nginx server reload
    subprocess.run(['nginx', '-s', 'reload'])

    return {'message': 'Proxy added successfully'} 

# 서버 시작
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=28001)