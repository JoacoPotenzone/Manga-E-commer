const express = require('express');
const ProductManager = require("./productManager");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.status(201).send("Welcome to Esto no es Moda!");
});


const productManager = new ProductManager("./src/products.json");

app.get("/products", async (req, res) => {
  console.log(await productManager.getProducts());
  let limit = req.query.limit;
  const returnProducts = await productManager.getProducts();
  if (limit) {
    res.status(200).json({ status: "ok", data: returnProducts.slice(0, limit) });
  } else {
    res.status(200).json({ status: "ok", data: returnProducts });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    res.status(200).json({ status: "ok", data: product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port http:/localhost:${PORT}`);
});