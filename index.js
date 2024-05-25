const express = require('express');
const app = express();
const port = 3000;

// 2. Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static('assets')); //middleware

// 3. Crear un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', 'Ignacia', 'Javier', 'Brian'];

app.get('/', (req, res) => {
    res.send('<center><h1>👋¡Bienvenido a la página de inicio!😁</h1></center>');
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// 4. Middleware para validar si el usuario existe en el arreglo
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next(); // si el usuario existe se ejecuta la función
    } else {
        // si el usuario no existe redirige a una imagen genérica
        res.sendFile(__dirname + '/assets/img/who.jpeg'); 
    }
});

// Ruta que será protegida por el middleware anterior
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 5. Ruta para validar número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const number = parseInt(req.params.n, 10); // caputrar el número desde la ruta
    const random = Math.floor(Math.random() * 4) + 1; // Random between 1 and 4

    if (number === random) {
        res.sendFile(__dirname + '/assets/img/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/img/voldemort.jpg');
    }
});

// 6. Ruta genérica para manejar rutas no definidas
app.get('*', (req, res) => {
    res.send('<center><h1>Esta página no existe...👻</h1></center>');
});

// 1. Crear un servidor con Express en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});