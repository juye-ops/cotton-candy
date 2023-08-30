# On-Premiser
*On-Premiser*는 쉽고 보편적인 개발을 위한 웹 기반 Private 클라우드 서비스입니다.  
호스트 PC는 CSP(Cloud Solution Provider)로 작용하여 원격 앱 개발을 도모합니다.  

#### Docs 언어
- [English](./README.md)

# 특징
클라우드 서비스는 전문성을 요구하고, 해당 과정을 이해하기에 비교적 난이도를 요구합니다.  
*On-Premiser*는 개발 환경 세팅 과정을 최적화 하여 훨씬 쉽고 직관적으로 이용할 수 있습니다.  
UI/UX를 최적화하기 위한 과정은 다음과 같습니다.  
- 단일 명령행을 통한 Easy-to-build 지향
- 웹 UI 기반 서비스 제공
- 로드 밸런서를 통한 웹 포트 만을 요구
- 호스트가 제공하는 인증키를 통한 사용자 등록
- 사용자 별로 프로젝트 및 컨테이너 관리
- 프로젝트 별로 내부 네트워크 보유
- VSCode의 웹 버전 오픈소스인 Code-server를 통해 익숙한 IDE 제공
- 동일한 프로젝트 내부 컨테이너(Micro-service) 간 통신 허용

# 시스템 요구사항 [Recommend]
- Docker [23.04]

# 설계 (Docker compose)
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

# 명령 행
```bash
docker compose up
```