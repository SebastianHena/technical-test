# Technical Test - Request Management System

## Descripción

Este proyecto corresponde al desarrollo de una prueba técnica Full Stack para la gestión de solicitudes utilizando una arquitectura desacoplada entre frontend y backend.

La solución permite administrar solicitudes, controlar su ciclo de vida mediante una máquina de estados y automatizar la expiración de solicitudes utilizando un workflow de n8n.

---

# Tecnologías utilizadas

## Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- class-validator

## Frontend

- Angular
- TypeScript
- Reactive Forms
- SCSS

## Automatización

- n8n

## Contenedores

- Docker
- Docker Compose

---

# Estructura del proyecto

```
technical-test/
│
├── backend/
├── frontend/
├── logic/
├── n8n/
├── docker-compose.yml
└── README.md
```

---

# Funcionalidades implementadas

## Backend

- CRUD completo de solicitudes.
- Validación mediante DTOs.
- Máquina de estados.
- Validación de transiciones.
- Validación de fechas.
- Manejo de errores.

## Frontend

- Visualización de solicitudes.
- Creación de solicitudes.
- Eliminación de solicitudes.
- Cambio de estado.
- Validaciones reactivas.
- Filtro por estado.
- Interfaz responsive.

## Automatización

Se implementó un workflow en n8n que consulta periódicamente las solicitudes y actualiza automáticamente al estado **EXPIRED** aquellas cuya fecha de finalización ya fue superada.

---

# Máquina de estados

```
SUBMITTED
│
├── IN_REVIEW
│      ├── APPROVED
│      ├── REJECTED
│      └── EXPIRED
│
└── EXPIRED
```

Transiciones permitidas:

- SUBMITTED → IN_REVIEW
- SUBMITTED → EXPIRED
- IN_REVIEW → APPROVED
- IN_REVIEW → REJECTED
- IN_REVIEW → EXPIRED

---

# Instalación

## Clonar el repositorio

```bash
git clone https://github.com/SebastianHena/technical-test.git
```

## Backend

```bash
cd backend
npm install
npm run start:dev
```

## Frontend

```bash
cd frontend
npm install
ng serve
```

## Docker

En caso de utilizar Docker:

```bash
docker compose up --build
```

---

# Validaciones implementadas

- Campos obligatorios.
- Validación de fechas.
- La fecha de finalización no puede ser menor que la fecha de inicio.
- Validación de cambios de estado.
- Validación de datos mediante DTOs.

---

# Reto lógico

La solución del reto lógico se encuentra en la carpeta:

```
logic/
```

El algoritmo implementado:

- Agrupa solicitudes por recurso.
- Ordena las solicitudes cronológicamente.
- Detecta todos los conflictos de fechas para un mismo recurso.
- Reduce comparaciones innecesarias aprovechando el ordenamiento.

---

# Decisiones técnicas

Durante el desarrollo se priorizaron las siguientes decisiones:

- Arquitectura desacoplada entre frontend y backend.
- PostgreSQL como base de datos relacional.
- Máquina de estados para controlar el ciclo de vida de las solicitudes.
- Reactive Forms para centralizar las validaciones del formulario.
- Automatización de procesos mediante n8n.
- Código modular y de fácil mantenimiento.

---

# Supuestos

Para el desarrollo se asumió que:

- Cada solicitud pertenece a un único recurso.
- Las fechas almacenadas son válidas.
- Las transiciones deben respetar la máquina de estados definida.
- La expiración automática de solicitudes es responsabilidad del workflow de n8n.

---

# Mejoras futuras

Con más tiempo podrían implementarse las siguientes mejoras:

- Autenticación y autorización mediante JWT.
- Documentación de la API con Swagger.
- Pruebas unitarias y de integración.
- Paginación y filtros desde el backend.
- Auditoría de cambios de estado.
- Notificaciones por correo electrónico.

---

# Autor

**Sebastián Henao Vanegas**

Prueba técnica Full Stack desarrollada como parte de un proceso de selección.