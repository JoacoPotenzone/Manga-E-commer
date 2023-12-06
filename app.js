const express = require('express');
const { Server } = require('socket.io')
const ProductManager = require('./src/manager/productManager.js')
const handlebars = require('express-handlebars')
const productsRouter = require('./src/routes/products.router.js');
const productsRouter = require('./src/routes/products.router.js')
const cartsRouter = require('./src/routes/cart.router.js')
const viewsRouter = require('./src/routes/views.router.js')


const app = express();
const httpServer = require('http').Server(server)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const port = 8080
const productManager = new ProductManager('./src/data/products.json')

app.engine('hbs', handlebars.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
app.use('/views', viewsRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error del servidor')
})

io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData)
            const updatedProducts = await productManager.getProducts()
            io.emit('updateProducts', updatedProducts)
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId)
            const updatedProducts = await productManager.getProducts()
            io.emit('updateProducts', updatedProducts)
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})

httpServer.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})