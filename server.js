const Contenedor = require("./asdasd");
const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080;

//Rutas

app.get('/', (_req, res) =>{
    res.send('Esto funca')
});

app.get('/productos', async (_req, res) =>{
    const allProducts = await Contenedor.getAll();
    res.json(allProducts);
});

app.get('/productoRandom', async (_req, res) => {
    const allProducts = await Contenedor.getAll();
    const losId = allProducts.length;

    const numeroRandom = generarNumeroRandom(1, losId);
    const productoRandom = await Contenedor.getById(numeroRandom);

    res.json(productoRandom);
});


//Numero random
const generarNumeroRandom = (min, max) =>{
    return Math.floor((Math.random() * (max+1 -min)) +min);
}


const server = app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
})

server.on('error', (error) => console.log(error));