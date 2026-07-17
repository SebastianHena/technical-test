# Decisiones Técnicas

Este documento registra las decisiones técnicas tomadas durante el desarrollo de la prueba, junto con su justificación.

---

# Arquitectura

## DT-001 - Organización del repositorio

### Decisión
Se utilizó un único repositorio con las carpetas `backend`, `frontend` y `docs`.

### Justificación
La prueba técnica consiste en un único sistema compuesto por un backend, un frontend y documentación. Mantener todo dentro de un mismo repositorio facilita el desarrollo, el control de versiones y la revisión por parte del evaluador.

---

## DT-002 - Ubicación del proyecto

### Decisión
El proyecto se desarrolló en una carpeta local (`C:\dev\technical-test`) en lugar de una carpeta sincronizada con OneDrive.

### Justificación
Trabajar sobre una carpeta local evita conflictos de sincronización, mejora el rendimiento al manejar dependencias como `node_modules` y reduce posibles inconvenientes con Git y otras herramientas de desarrollo.

---

## DT-003 - Estructura inicial del proyecto

### Decisión
Se organizó el proyecto con la siguiente estructura:

```text
technical-test/
├── backend/
├── frontend/
└── docs/
```

### Justificación
Separar claramente el backend, frontend y documentación mejora la organización del proyecto y facilita su mantenimiento.

---

# Backend

## DT-004 - Framework Backend

### Decisión
Se seleccionó NestJS como framework para el desarrollo del backend.

### Justificación
NestJS proporciona una arquitectura modular basada en TypeScript, promueve buenas prácticas como la separación de responsabilidades y ofrece integración nativa con herramientas como TypeORM.

---

## DT-005 - Uso del CLI oficial de NestJS

### Decisión
Se utilizó el CLI oficial de NestJS para generar la estructura inicial del proyecto.

### Justificación
El CLI genera automáticamente una estructura siguiendo las convenciones oficiales del framework, reduciendo el tiempo de configuración inicial.

---

## DT-006 - Creación del proyecto dentro de la carpeta existente

### Decisión
Se utilizó el comando:

```bash
nest new .
```

### Justificación
Permite crear el proyecto directamente dentro de la carpeta `backend`, evitando generar una estructura duplicada (`backend/backend`).

---

## DT-007 - Generación automática del módulo Requests

### Decisión
Se utilizó el comando:

```bash
nest g resource requests
```

### Justificación
El generador crea automáticamente la estructura base de un recurso REST, permitiendo dedicar más tiempo a la lógica de negocio que a la configuración manual.

---

## DT-008 - API REST

### Decisión
El módulo `requests` fue generado como una API REST.

### Justificación
Los requisitos de la prueba se basan en operaciones CRUD sobre solicitudes, por lo que una API REST resulta la opción más adecuada.

---

## DT-009 - Generación automática del CRUD

### Decisión
Se permitió que NestJS generara el CRUD inicial.

### Justificación
El CRUD generado sirve como base para el desarrollo y posteriormente será adaptado a los requerimientos específicos de la prueba.

---

## DT-010 - Mantener la estructura oficial de NestJS

### Decisión
Se decidió mantener la estructura generada por el framework.

### Justificación
La estructura oficial es ampliamente utilizada por la comunidad, facilita la comprensión del proyecto y resulta suficiente para el alcance de esta prueba técnica.

---

## DT-011 - Separación de responsabilidades

### Decisión
Se adoptó una arquitectura basada en Controller, Service y Module.

### Justificación
Cada componente tiene una responsabilidad específica:

- Controller: recibe las solicitudes HTTP.
- Service: contiene la lógica de negocio.
- Module: organiza y registra los componentes.

Esta separación mejora la mantenibilidad, reutilización y escalabilidad del sistema.

---

## DT-012 - Inyección de Dependencias

### Decisión
Se utilizará el mecanismo de Dependency Injection proporcionado por NestJS.

### Justificación
La inyección de dependencias desacopla los componentes, evita crear instancias manualmente y facilita las pruebas unitarias y el mantenimiento del proyecto.

---

# Base de Datos

## DT-013 - PostgreSQL

### Decisión
Se seleccionó PostgreSQL como motor de base de datos.

### Justificación
PostgreSQL es una base de datos relacional robusta y ampliamente utilizada en aplicaciones empresariales. El dominio del problema se adapta naturalmente a un modelo relacional.

---

## DT-014 - Herramienta de administración

### Decisión
Se utilizó pgAdmin para administrar PostgreSQL durante el desarrollo.

### Justificación
Facilita la creación de bases de datos, la administración de tablas y la inspección de datos durante el desarrollo.

---

## DT-015 - TypeORM

### Decisión
Se utilizará TypeORM como ORM.

### Justificación
TypeORM permite mapear entidades de TypeScript a tablas de PostgreSQL, reduciendo la necesidad de escribir consultas SQL manualmente y ofreciendo integración oficial con NestJS.

---

## DT-022 - Carga automática de entidades

### Decisión

Se habilitó `autoLoadEntities: true` en la configuración de TypeORM.

### Justificación

Esta opción permite que las entidades registradas en los módulos se carguen automáticamente, reduciendo configuración manual y facilitando el mantenimiento del proyecto a medida que crece.

---

## DT-023 - Sincronización automática del esquema

### Decisión

Se habilitó `synchronize: true` durante el desarrollo.

### Justificación

Durante el desarrollo permite crear y actualizar automáticamente las tablas a partir de las entidades, acelerando la implementación y reduciendo la configuración manual. En un entorno de producción esta opción debe deshabilitarse y reemplazarse por migraciones para mantener un control seguro sobre los cambios en la base de datos.

---

## DT-024 - Validación temprana de la conexión a la base de datos

### Decisión

Se verificó la conexión con PostgreSQL inmediatamente después de configurar TypeORM, antes de comenzar a desarrollar la lógica de negocio.

### Justificación

Validar la infraestructura al inicio permite detectar errores de configuración de forma temprana y evita invertir tiempo desarrollando funcionalidades sobre una conexión que no funciona correctamente.

---



# Configuración

## DT-016 - Variables de entorno

### Decisión
La configuración sensible de la aplicación se almacenará en un archivo `.env`.

### Justificación
Permite separar la configuración del código fuente, facilita el cambio entre distintos entornos y evita exponer credenciales dentro del proyecto.

---

## DT-017 - ConfigModule

### Decisión
Se utilizará `@nestjs/config` para gestionar las variables de entorno.

### Justificación
Centraliza la configuración de la aplicación y proporciona un mecanismo consistente para acceder a las variables de entorno.

---

## DT-018 - Configuración de TypeORM

### Decisión
Se utilizará `TypeOrmModule.forRoot()` para configurar la conexión con PostgreSQL.

### Justificación
Para el alcance de esta prueba técnica, una configuración síncrona resulta suficiente y mantiene el proyecto sencillo. En proyectos de mayor complejidad podría utilizarse `forRootAsync()`.

---

# DT-020 - Configuración global del módulo de configuración

### Decisión

Se configuró ConfigModule como un módulo global mediante isGlobal: true.

### Justificación

Esto permite acceder a las variables de entorno desde cualquier módulo de la aplicación sin tener que importar ConfigModule repetidamente, reduciendo código duplicado y simplificando la configuración.

---

## DT-021 - Selección del motor de base de datos

### Decisión

Se configuró `type: 'postgres'` en TypeORM.

### Justificación

El proyecto utiliza PostgreSQL como motor de base de datos, por lo que TypeORM debe emplear el driver correspondiente para establecer la conexión correctamente.

---

# Documentación

## DT-019 - Documentación continua

### Decisión
La documentación técnica se desarrollará de forma paralela a la implementación.

### Justificación
Documentar las decisiones durante el desarrollo evita olvidar el razonamiento detrás de cada elección y facilita la elaboración del README final y la sustentación técnica del proyecto.