# ¿Qué es NestJS?

NestJS es un framework para Node.js basado en TypeScript que promueve una arquitectura modular utilizando conceptos como módulos, controladores, servicios e inyección de dependencias.

## ¿Por qué lo elegimos?

- Escalable.
- Arquitectura limpia.
- Excelente integración con TypeORM.
- Facilita separar responsabilidades.

# ¿Qué hace main.ts en NestJS?

main.ts es el punto de entrada de la aplicación. Se encarga de crear la instancia de NestJS, aplicar configuraciones globales como validaciones o CORS y poner en marcha el servidor para recibir solicitudes HTTP.

# TypeORM

Hoy entendí que un ORM actúa como un intermediario entre el código de la aplicación y la base de datos. En lugar de escribir consultas SQL manualmente, se trabaja con clases y objetos de TypeScript, mientras que TypeORM traduce esas operaciones a SQL.

### Aprendizaje

La propiedad `type` indica a TypeORM qué motor de base de datos utilizará. Este valor determina el driver que empleará para establecer la conexión. En este proyecto se configuró `postgres` porque la base de datos elegida es PostgreSQL.

### Aprendizaje

La propiedad `host` indica dónde se encuentra el servidor de la base de datos. En este proyecto se obtiene desde `process.env.DB_HOST`, lo que permite cambiar la configuración entre distintos entornos sin modificar el código fuente.

### Aprendizaje

Las variables de entorno siempre se leen como cadenas de texto (`string`). Cuando una librería espera un tipo diferente, como `number` para el puerto de la base de datos, es necesario realizar la conversión utilizando `Number()`.

### Aprendizaje

El `username` y el `password` utilizados por TypeORM corresponden a las credenciales del servidor de PostgreSQL, no a los usuarios de la aplicación. PostgreSQL valida estas credenciales antes de permitir el acceso a la base de datos.

### Aprendizaje

Una Entity representa una tabla de la base de datos dentro del código mediante una clase de TypeScript. La opción `autoLoadEntities: true` permite que TypeORM registre automáticamente las entidades definidas en los módulos, evitando configurarlas manualmente en `AppModule`.

### Aprendizaje

La opción `synchronize: true` hace que TypeORM compare las entidades con la base de datos y cree o actualice las tablas automáticamente durante el desarrollo. Aunque agiliza el trabajo, no debe utilizarse en producción porque los cambios en el esquema deben controlarse mediante migraciones.

### Aprendizaje

El mensaje `Nest application successfully started` indica que la aplicación completó su proceso de inicialización. Como TypeORM intenta conectarse a PostgreSQL durante el arranque, si la aplicación inicia correctamente significa que la configuración de conexión es válida y la autenticación con la base de datos fue exitosa.

### Aprendizaje

En un monorepo, cada proyecto puede tener su propio `.gitignore` para ignorar los archivos específicos que genera (por ejemplo, `node_modules`, `dist` o `.env`). Además, el repositorio puede tener un `.gitignore` en la raíz con reglas generales que aplican a todo el proyecto, como archivos del sistema operativo o configuraciones personales del editor. Git combina las reglas de ambos archivos al decidir qué debe ignorar.

### Aprendizaje

Git no envía los archivos directamente desde el proyecto hacia un commit. Primero se agregan al **Staging Area** mediante `git add`, donde se seleccionan los cambios que formarán parte del siguiente commit. Solo después de ese paso se crea el commit con `git commit`.

# Entity vs DTO

Hoy entendí que una Entity y un DTO tienen responsabilidades diferentes.

La Entity representa cómo se almacena la información en la base de datos.

El DTO representa únicamente la información que el cliente tiene permitido enviar al backend.

Gracias a esta separación se evita que el usuario pueda modificar campos internos como:

- id
- status
- createdAt
- updatedAt

# Datos del negocio vs Datos de auditoría

Aprendí que startDate y endDate son datos del negocio porque los proporciona el usuario.

En cambio, createdAt y updatedAt son datos de auditoría y deben ser generados automáticamente por TypeORM.