const { Router } = require('express')
const ProductManager = require('../manager/productManager')

const viewsRouter = Router()
const productManager = new ProductManager('./src/data/products.json')

viewsRouter.get('/', async (req, res) => {
    const prodList = await productManager.getProducts()
    res.render('home', { title: 'Listado de Productos', name: 'Usuario de Prueba', prodList })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const prodList = await productManager.getProducts()
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', name: 'Usuario de Prueba', prodList })
})

module.exports = viewsRouter