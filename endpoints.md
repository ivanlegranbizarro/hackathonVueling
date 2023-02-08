## Endpoints de la API

### Obtener viaje aéreo

Puedes obtener un viaje aéreo realizando una solicitud GET y especificando el parámetro de búsqueda en la URL.

Ejemplo:

`GET /airtrip?search=Londres` 

### Obtener viaje terrestre

Puedes obtener un viaje terrestre realizando una solicitud GET y especificando el parámetro de búsqueda en la URL.

Ejemplo:


`GET /landtrip?search=Londres` 

### Actualizar viaje aéreo

Puedes actualizar un viaje aéreo realizando una solicitud PUT y especificando el ID del viaje aéreo que deseas actualizar en la URL.

Ejemplo:


`PUT /airtrip/{id}` 

Además, debes incluir el cuerpo de la solicitud con los nuevos datos que deseas actualizar.

### Actualizar viaje terrestre

Puedes actualizar un viaje terrestre realizando una solicitud PUT y especificando el ID del viaje terrestre que deseas actualizar en la URL.

Ejemplo:


`PUT /landtrip/{id}` 

Además, debes incluir el cuerpo de la solicitud con los nuevos datos que deseas actualizar.