import subprocess

import uvicorn

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 데이터 구조 초기화
proxies = {}

class ProxyRequest(BaseModel):
    name: str
    url: str

@app.post('/api/proxies')
def add_proxy(proxy: ProxyRequest):
    proxies[proxy.name] = proxy.url

    # Nginx 설정 파일 업데이트 및 재로드
    update_nginx_config()

    return {'message': 'Proxy added successfully'} 

def update_nginx_config():
    nginx_config_path = '/etc/nginx/nginx.conf'
    proxy_config = ''

    for name, url in proxies.items():
        proxy_config += f'''
        location /{name}/ {{
            proxy_pass {url};
        }}
        '''

    nginx_config = f'''
    events {{}}
    http {{
        server {{
            listen 80;
            server_name localhost;

            {proxy_config}

            # 기타 설정 영역
        }}
    }}
    '''

    with open(nginx_config_path, 'w') as f:
        f.write(nginx_config)

    # Nginx 서버 리로드
    subprocess.run(['nginx', '-s', 'reload'])

# 서버 시작
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=28001)