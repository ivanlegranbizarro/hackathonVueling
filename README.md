# Bienvenidos a la Hackathon de Vueling

¡Aquí comienza la aventura! Esta es una API Rest creada para la Hackathon de Vueling, donde podrás planificar tus viajes por aire o por tierra con la ayuda de nuestro equipo de expertos. Ya sea que estés planeando una escapada rápida o un viaje a la aventura, tenemos todo lo que necesitas para hacer realidad tus sueños de viaje. ¡Agárrate a tus asientos y preparemos juntos el próximo gran viaje!

## Endpoints

| Endpoint             | Method | Description                                           |
|----------------------|--------|-------------------------------------------------------|
| /airtrip             | GET    | Obtiene todos los viajes en avión                     |
| /airtrip/:id         | PUT    | Actualiza un viaje en avión por su id                 |
| /airtrip/:id         | DELETE | Elimina un viaje en avión por su id                  |
| /airtrip             | POST   | Crea un nuevo viaje en avión                          |
| /landtrip            | GET    | Obtiene todos los viajes en tierra                    |
| /landtrip/:id        | PUT    | Actualiza un viaje en tierra por su id                |
| /landtrip/:id        | DELETE | Elimina un viaje en tierra por su id                 |
| /landtrip            | POST   | Crea un nuevo viaje en tierra                         |

## Para ejecutar el proyecto

1. Clona el repositorio
2. Ejecuta el comando `npm i` para instalar las dependencias
3. Configura la base de datos
4. Ejecuta el proyecto con `npm start` o `nodemon start`
