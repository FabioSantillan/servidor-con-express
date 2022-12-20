const express = require ('express');
const contenedor = require ('./contenedor');
const app = express ();
const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`server listening on PORT ${PORT}`); 
});

server.on('error', err => console.log(`error: ${err}`));

const productos = new contenedor ('products.txt')

app.get('/productos', async (req,res) => {
    const products = await products.getAll();
    res.send(products);
});

app.get('/productorandom', async (req,res) => {
    const products = await products.getAll();
    let numeroRandom = Math.floor(Math.random() * productos.length);
    res.send(productos[numeroRandom]);
});
