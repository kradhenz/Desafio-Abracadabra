const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Crear un servidor con Express en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// 2. Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static(path.join(__dirname, 'assets')));

// 3. Crear un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', 'Ignacia','Javier', 'Brian'];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// 4. Middleware para validar si el usuario existe en el arreglo
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
});

// Ruta que será protegida por el middleware anterior
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.send(`¡Bienvenido al juego, ${req.params.usuario}!`);
});

// 5. Ruta /abracadabra/conejo/:n para validar número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = parseInt(req.params.n, 10);
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1; // Genera un número aleatorio entre 1 y 4

    if (numero === numeroAleatorio) {
        res.sendFile(path.join(__dirname, 'assets', 'conejo.jpeg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpeg'));
    }
});

// 6. Ruta genérica para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).send('Esta página no existe...');
});
