# Agenda de Contactos

API REST para la gestión de contactos desarrollada con **Node.js, Express y PostgreSQL**, utilizando una arquitectura por capas y pruebas automatizadas.

## Tecnologías

* Node.js
* Express
* PostgreSQL
* Jest
* Supertest
* Docker
* Docker Compose

## Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Capas

* **Controllers:** reciben las peticiones HTTP y generan las respuestas.
* **Services:** contienen las reglas de negocio y validaciones.
* **Repositories:** gestionan el acceso a PostgreSQL.
* **Routes:** definen los endpoints de la API.
* **Config:** contiene la configuración de la conexión a la base de datos.

## Funcionalidades

La API permite:

* Crear contactos.
* Consultar todos los contactos.
* Consultar un contacto por ID.
* Actualizar contactos.
* Eliminar contactos.
* Validar nombre, correo y teléfono.
* Evitar contactos duplicados por nombre.

## Endpoints

| Método | Endpoint         | Descripción                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/contactos`     | Obtener todos los contactos |
| GET    | `/contactos/:id` | Obtener un contacto         |
| POST   | `/contactos`     | Crear un contacto           |
| PUT    | `/contactos/:id` | Actualizar un contacto      |
| DELETE | `/contactos/:id` | Eliminar un contacto        |

## Ejecución con Docker

El proyecto utiliza Docker Compose para ejecutar la API y PostgreSQL.

Para iniciar los servicios:

```bash
docker compose up -d --build
```

La API queda disponible en:

```text
http://localhost:3000
```

## Pruebas automatizadas

El proyecto cuenta con pruebas unitarias y de integración.

Para ejecutar todas las pruebas:

```bash
npm test
```

El comando inicia automáticamente los servicios mediante Docker y ejecuta Jest dentro del contenedor.

Resultado actual:

```text
Test Suites: 5 passed, 5 total
Tests:       45 passed, 45 total
```

### Cobertura

El proyecto alcanza:

```text
Statements: 100%
Branches:   100%
Functions:  100%
Lines:      100%
```

Las pruebas incluyen:

* Controllers
* Services
* Repositories
* Configuración de base de datos
* Integración con PostgreSQL
* Validaciones
* Casos exitosos
* Manejo de errores

## Estructura del proyecto

```text
agenda-contactos/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── contactoController.js
│   ├── repositories/
│   │   └── contactoRepository.js
│   ├── routes/
│   │   └── contactoRoutes.js
│   ├── services/
│   │   └── contactoService.js
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── config/
│   ├── controllers/
│   ├── repositories/
│   ├── services/
│   └── integration/
│
├── database.sql
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
└── README.md
```

## Objetivo

El proyecto fue desarrollado como parte de una práctica de **Verificación y Validación de Software**, enfocándose en la implementación de pruebas automatizadas, pruebas de integración y medición de cobertura de código.

---

**Proyecto:** Agenda de Contactos
**Tecnologías principales:** Node.js · Express · PostgreSQL · Jest · Docker
