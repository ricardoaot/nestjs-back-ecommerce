``` bash
npm run build           # Compilar codigo en carpeta dist
npm run migration:generate src/migrations/initial #Se crea el sql de migración inicial
npm run build           # Compilar y pasar el archivo de migración a dist
npm run migration:run   # Ejecución del archivo de migración sql