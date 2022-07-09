# E-commerce Backend CoderHouse

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Firebase badget](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Twilio badget](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white)
![JS badget](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap badget](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

![Logo](https://i.ibb.co/KK1K1zF/1.png)

&nbsp;

# Presentación y uso

Este ecommerce está realizado como parte de la 3er preentrega del curso de Backend de [CoderHouse](https://www.coderhouse.com/), utiliza Nodejs y Express, almacena la sesión (la cual expira en 10min) y los datos del usuario en Mongo Atlas, y los productos y carritos en Firebase.
Al registrar un nuevo usuario se enviará un correo de notificación a un mail asignado en la variable de entorno "newSigupNotificationMail".

Se pueden agregar productos al carro lo cual lleva a una vista del mismo, donde se puede volver atrás para seguir agregando más productos, o se puede finalizar la compra lo cual vacía el carrito, envía un correo con el listado de productos comprados y un mensaje de whatsapp informando que se realizó un nuevo pedido.

&nbsp;

![Screenshot1](https://i.ibb.co/HTyX16W/Screenshot-2022-05-17-191657.jpg)
&nbsp;
![Screenshot2](https://i.ibb.co/VpHF9M0/Screenshot-2022-05-17-191724.jpg)
&nbsp;
![Screenshot3](https://i.ibb.co/pQRFsNz/Screenshot-2022-05-17-191834.jpg)
&nbsp;
![Screenshot4](https://i.ibb.co/r4jKw6s/Screenshot-2022-05-17-192133.jpg)
&nbsp;
![Screenshot5](https://i.ibb.co/2k1JfwH/Screenshot-2022-05-17-193536.jpg)

&nbsp;

## Librerías utilizadas

* Express
* Express-session
* Express-Handlebars
* Mongoose
* Firebase-admin
* Passport
* Bcrypt
* Nodemailer
* Twilio
* Log4js
* Compression
* Dotenv


&nbsp;

-Las credenciales del usuario son verificadas usando Passport Local y encriptadas con Bcrypt antes de ser almacenadas en MongoDB.

-Nodemailer y Twilio son los servicios utilizados para la mensajería.

-Se utilizó log4js para crear logs personalizados, donde los errores de mediana y alta gravedad se almacenan es los respectivos archivos error.log y warn.log.

&nbsp;

---

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GTomasel)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrieltomasel/)