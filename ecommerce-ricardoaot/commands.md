## NEST commands
nest generate module categories/categories --flat
nest generate controller categories/categories --flat --no-spec
nest generate service categories/categories --flat --no-spec
nest generate module orders/orders --flat
nest generate controller orders/orders --flat --no-spec
nest generate service orders/orders --flat --no-spec

npm run migration:create src/migrations/migracionTest


### Para que es --flat
--flat: Esta opción indica que el controlador se debe crear en un solo nivel de directorio en lugar de en una estructura de carpetas. Por ejemplo, sin --flat, el comando podría generar una estructura de carpetas que incluya un directorio para el controlador. Con --flat, el controlador se creará directamente en la carpeta actual.

### Para que es --no-spec
--no-spec: Esta opción le dice a la CLI que no genere archivos de prueba (spec) para el controlador. Si no incluyes esta opción, NestJS generaría archivos de prueba (especificaciones) junto con el controlador para que puedas empezar a escribir pruebas de inmediato.