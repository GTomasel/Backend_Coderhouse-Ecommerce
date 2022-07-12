# E-commerce Backend CoderHouse

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Twilio badget](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white)
![JS badget](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap badget](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Logo](https://i.ibb.co/KK1K1zF/1.png)

&nbsp;

# Presentación y uso

Este ecommerce para la entrega final del curso de Backend de [CoderHouse](https://www.coderhouse.com/), utiliza Nodejs y Express, y como base de datos MongoDB Atlas.
Se utilizaron diferentes capas en la estructura del proyecto para tener un código modularizado, se creó un DAO factory donde se pueden agregar nuevos métodos de persistencia fácilmente.
Al registrar un nuevo usuario se enviará un correo de notificación a un mail asignado en la variable de entorno "newSigupNotificationMail".

Se pueden agregar productos al carro lo cual lleva a una vista del mismo, donde se puede volver atrás para seguir agregando más productos, o se puede finalizar la compra lo cual vacía el carrito, envía un correo con el listado de productos comprados y un mensaje de whatsapp informando que se realizó un nuevo pedido.

&nbsp;

![Screenshot1](https://i.ibb.co/dm5B1Qv/1.jpg)
&nbsp;
![Screenshot2](https://i.ibb.co/tKpsdkL/2.jpg)
&nbsp;
![Screenshot3](https://i.ibb.co/pdMhnmn/4.jpg)
&nbsp;
![Screenshot4](https://i.ibb.co/tQgxjYp/5.jpg)
&nbsp;
![Screenshot5](https://i.ibb.co/CbNS3gM/33.jpg)
&nbsp;
![Screenshot6](https://i.ibb.co/K7rCNqs/10.jpg)
&nbsp;
![Screenshot7](https://i.ibb.co/JqY7tWK/1111.jpg)
&nbsp;
![Screenshot8](https://i.ibb.co/f2dRpbW/9.jpg)



&nbsp;

## Librerías utilizadas

- Express
- Express-session
- Express-Handlebars
- Mongoose
- Socket.io
- Passport
- Bcrypt
- Nodemailer
- Twilio
- Log4js
- Dotenv
- Artillery

&nbsp;

-Las credenciales del usuario son verificadas usando Passport Local y encriptadas con Bcrypt antes de ser almacenadas en MongoDB.

-Nodemailer y Twilio son los servicios utilizados para la mensajería.

-Se utilizó log4js para crear logs personalizados, donde los errores de mediana y alta gravedad se almacenan es los respectivos archivos error.log y warn.log, los log meramente informativos solo se generan cuando la variable de entorno NODE_ENV es 'DEV', de otro modo solo se generarán los de errores de mayor gravedad.

-Se implementó Socket.io para realizar un chat donde el usuario puede realizar consultas que serán respondidas por un usuario Administrador.

-El usuario de tipo Administrador puede agregar, actualizar y eliminar productos desde el frontend, y ver información avanzada del servidor.

&nbsp;

-En el directorio "utils" se encuentra el archivo config donde se puede configurar la persistencia preferida, si ejecutar el servidor en modo fork o cluster, el tiempo de expiración de la sesión y las credenciales de MongoDB, Nodemailer y Twilio.

-Para tener acceso a la vista de administrador se debe registrar un nuevo usuario y manualmente setear la variable "admin" del mismo a "true" en la base de datos.

&nbsp;

---

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GTomasel)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrieltomasel/)
