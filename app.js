const express = require('express');

const productsRouter = require('./src/routes/products.router.js');
const cartRouter = require('./src/routes/cart.router.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`)
})