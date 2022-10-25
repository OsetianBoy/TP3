const fs = require('fs')

let products = []

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    //Guardar
    async save(newProduct){
        try{
            newProduct.id = products.length+1
            products.push(newProduct);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(products, null, "\t"));
            
        } catch(error) {
            console.log(`Error al guardar: ${error}`);
        }
    }

    

    //Obtego id
    async getById(id){
        try{
            let productos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let parseProducts = JSON.parse(productos)
            let searchId = parseProducts.find(element => element.id == id)

            if(searchId){
                return searchId
            } else {
                return null
            }

        }catch (error){
            console.log(`Error al leer archivo: ${error}`);
        }
    }

    //Obtener todos
    async getAll(){
        try {
            let productos = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            const parseProducts = JSON.parse(productos)
            return parseProducts
        } catch (error) {
            console.log(`Error al leer archivo: ${error}`)
        }
    }

    //Eliminar por Id
    async deleteById(id){
        try {
            let productos = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let parseProducts = JSON.parse(productos);
            const filterProducts = parseProducts.filter(element => element.id != id);
            
            await fs.promises.unlink(`./${this.nombreArchivo}`);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(filterProducts, null, "\t"));
            
            console.log(`Nuevo stock: `, filterProducts)
        } catch (error) {
            console.log(`Error al leer archivo: ${error}`)
        }
    }

    //Eliminar todos
    async deleteAll(){
        try {
            await fs.promises.unlink(`./${this.nombreArchivo}`)

            products = []
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(products, null, "\t"))
            console.log(`Productos eliminados: `, products)
        } catch (error) {
            console.log(`Error al eliminar archivo: ${error}`)
        }
    }
}


const archivo = new Contenedor("productos.txt")


//save(Object)

    archivo.save({
        title:"ASUS TUF Gaming AMD RX 6950 XT 16 Gb OC EDITION",
        price: 1181,
        thumbnail: "https://m.media-amazon.com/images/I/81Y+Zr51m4L._AC_SX522_.jpg"
    })
    
    archivo.save({
        title:"Gigabyte AORUS RTX 3080 Ti Master 12 GB GDDR6X",
        price: 1564,
        thumbnail: "https://m.media-amazon.com/images/I/517lkQvi+pS._AC_SX522_.jpg"
    })
    
    archivo.save({
        title:"MSI RX 6900 XT Gaming X Trio 16 Gb",
        price: 1343,
        thumbnail: "https://m.media-amazon.com/images/I/815a7kn-FDS._AC_SL1500_.jpg"
    })
    
    archivo.save({
        title:"ASUS ROG Strix NVIDIA GeForce RTX 3090 OC Edition 24GB GDDR6X",
        price: 2289,
        thumbnail: "https://m.media-amazon.com/images/I/81q6ZBQFsHL._AC_SX522_.jpg"
    })
    

// GetById
// archivo.getById(2).then( res =>{
//      console.log(res)
// })

// GetAll
// archivo.getAll().then( res =>{
//     console.log(res)
// } )

// DeleteById
// archivo.deleteById(1)


// DeleteAll
// archivo.deleteAll()

module.exports = Contenedor;