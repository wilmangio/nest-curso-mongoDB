<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```

3. Tener instalado Nest CLI
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia ha __.env__

6. Llenar las variables de entorno definidas

7. Ejecutar el dev
```
yarn start:dev
```
8. Reconstruir la semilla con el siguiente endpoint
```
http://localhost:3000/api/v2/seed
```
## Stack usado
* MongoDB
* Nest