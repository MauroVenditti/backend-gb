# BackEnd

Aplicación realizada en NodeJS con Express, la misma consta de 4 endpoints para el manejo de productos. 

Endpoints:

  - [GET] '/products' <- Devuelve todos los productos
  - [GET] '/products/{id}' <- Devuelve el producto solicitado por el parametro ID
  - [PATCH] '/products/{id}' <- Habilita o Deshabilita el producto solicitado por el parametro ID
  - [POST] '/products'  <- Devuelve el/los productos encontrados por descripcion

### Instalación

Instalación de dependencias e iniciar aplicación.

```sh
$ cd backend
$ npm install 
$ npm start
```

### Librerías

Para la realización del proyecto se utilizó:

| Librería | Link |
| ------ | ------ |
| Express | https://material-ui.com/ |
| Underscore | https://github.com/davidcetinkaya/embla-carousel-react |
| Axios | https://github.com/axios/axios |
| Body-Parser | https://github.com/expressjs/body-parser |
| Cors | https://github.com/expressjs/cors |

