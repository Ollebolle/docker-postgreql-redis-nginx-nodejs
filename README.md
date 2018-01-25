# Docker / PostgreSQL / Redis / Nginx / NodeJS

This is a base project template for a REST API complete with database, reverse proxy, backend as well as some basic user authentication (register/login).

## How to use

### Prerequisites

* Docker
* Docker Compose

### Development

Run in project root:
```
docker-compose up --build
```

### Production

Place your ssl certificates in the ```nginx/ssl-certificates/``` directory.

Run in project root:
```
docker-compose -f docker-compose.production.yml up --build
```

## ToDo

* Add guide for implementing push notifications
* Clean up and fix event driven push notifications
* Add proper Express error handling
