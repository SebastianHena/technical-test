## Flujo de una petición HTTP

Una solicitud HTTP sigue el siguiente recorrido:

1. main.ts inicia la aplicación.
2. AppModule registra los módulos y componentes.
3. El Controller recibe la petición HTTP.
4. El Service ejecuta la lógica de negocio.
5. Se devuelve la respuesta al cliente.

Esta separación facilita el mantenimiento, las pruebas y la escalabilidad de la aplicación.

------------------------------------------------------

NestJS utiliza inyección de dependencias para crear y suministrar automáticamente instancias de los servicios a los controladores. Esto evita crear objetos manualmente (new), facilita las pruebas y mantiene el código desacoplado.

------------------------------------------------------

# Que es un ORM(Object Relational Mapper)

Basicamente el ORM nos ayuda a que una clase se convierta en una tabla de la DB, sin esto, cada consulta tendramos que hacerla de manera manual

Paquete	         Función
@nestjs/typeorm	 Integra TypeORM con NestJS
typeorm	         El ORM
pg	             Driver para PostgreSQL