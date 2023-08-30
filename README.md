# On-Premiser
Private cloud service fits you.  

*On-Premiser* is a web-based private cloud service designed for easy and universal deployment.  
The host PC can be run as CSP for you, so you can develop an app(or apps) remotely.  

#### Read docs in other languages
- [한국어](./README.ko-KR.md)

# Features
Several cloud services require some expertise, and this process may seem difficult.  
*On-Premiser* optimized processes for setting development environments.  
Many can use more easier and more intuitively.  
Here are some solutions how to offer a better UI/UX.
- Easy-to-build via a single command line
- Providing Web UI-based services
- Load balancer Requiring web port only
- Registering a user with an auth key provided by the host
- Managing projects and containers by user
- An internal network by project
- Familiar Web IDE via code-server, an open source of web-based VSCode
- Allow networking between containers inside the same project

# Requirements [Recommend]
- Docker [23.04]

# Built With (Docker compose)
### Load balancer
- Nginx

### Backend
- FastAPI

### Frontend
- React

### Container
- Docker
- FastAPI
- Nginx

### Database
- MySQL

# Command line
```bash
docker compose up
```