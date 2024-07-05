``` bash
npm run build           # Compilar codigo en carpeta dist
npm run migration:create src/migrations/created #Se crea el sql de migración inicial sin datos
npm run migration:generate src/migrations/initial #Se crea el sql de migración inicial
npm run build           # Compilar y pasar el archivo de migración a dist
npm run migration:run   # Ejecución del archivo de migración sql



## Git commands
 git push origin --force  
 git commit --amend -m "L9 - Role validation by JWT, Guard and Decorator implementation"



## L11 - OPEN API 
npm install --save @nestjs/swagger
# nest-cli.json modification
# main.ts modification