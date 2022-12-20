const fs = require ('fs');

class contenedor {
    constructor (file) {
        this.file = file;
    }
}

writefile = async data => {
    try {
        await fs.promises.writeFile(
            this.file, JSON.stringify(data,null,2)
        )
    } catch(err) {
        console.log (`error: ${err}`);
    }
} 

getAll = async() => {
    try {
        const productos = await fs.promises.readFile (this.file, 'utf-8');
        return JSON.parse(productos);
    } catch(err) {
        if(err.message.includes('no such file or directory')) return [];
        console.log (`error: ${err}`);
    }
}

save = async obj => {
    let productos = this.getAll();
    try{
        let newId;
        productos.length === 0 ? newId = 1 : newId = productos [productos.length-1].id + 1;
        let newObj = {...Obj, id: newId};
        productos.push(newObj);
        await this.writeFile(productos);
        return newObj.id;
    } catch(err) {
        console.log (`error: ${err}`);
    }
}

getById = async id => {
    let productos = await this.getAll();
    try{
        productos = productos.filter(producto=> producto.id != id);
        await this.writeFile(productos);
    } catch(err) {
        console.log (`error: ${err}`);
    }
}

deleteById = async id => {
    let productos = await this.getAll();
    try{
        productos = productos.filter(producto => producto.id != id);
        await this.writeFile(productos);
    } catch(err) {
        console.log (`error: ${err}`);
    }
}

deleteAll = async() => {
    this.writeFile([]);
}

module.exports = contenedor;