const ProductManager = require("./productManager");

const productManager = new ProductManager("./products.json");

await productManager.clearProducts();

console.log({ products: await productManager.getProducts() });
    await productManager.addProduct("Berserk", "Manga de fines de los años 80, Kentaro Miura, su creador creó no sólo un manga si no una forma distinta de ver el conocido 'camino del héroe'.", 5000, "https://m.media-amazon.com/images/I/91D07epNE9L._AC_UF1000,1000_QL80_.jpg", "ASKJF454", 10);
    await productManager.addProduct("Square Dress", "Step into timeless elegance with this vintage-inspired grey dress, perfect for special occasions and garden parties.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fdressgreysquare.webp?alt=media&token=e157a218-6e9f-4ac6-ab3a-10c555393cbe&_gl=1*e8tva*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MjA1MS40NC4wLjA.", "SD", 2);
console.log({ productsAfterInsert: await productManager.getProducts() });
try {
await productManager.addProduct("Jujutsu Kaisen 1", "La primer entrega de Jujutsu Kaisen (sin contar la precuela 'Jujutsu Kaisen 0') da inmersión a la historia de Itadori.", 2000, "https://static.wikia.nocookie.net/jujutsu-kaisen/images/0/0e/Volume_1.png/revision/latest?cb=20200905220554&path-prefix=es", "DKAS913", 18);
} catch (error) {
    console.log({ error: error.message });
}
try {
    await productManager.addProduct("Blue Jeans", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "SD", 3);
  } catch (error) {
    console.log({ error: error.message });
  }
  try {
    await productManager.getProductById(10);
  } catch (error) {
    console.log({ error: error.message });
  }
  console.log({ specificProduct: await productManager.getProductById(1) });
  try {
    const updatedProduct = await productManager.updateProduct(
      1,
      "Berserk 2",
      "El segundo tomo de Berserk, continua la oscura historia de Guts, leyendo este tomo.",
      6000,
      "https://images.cdn3.buscalibre.com/fit-in/360x360/10/0b/100b6af7afda64122010a104a88c5175.jpg",
      "KÑAS923",
      14
    );
    console.log({ updatedProduct });
    console.log({ updatedProduct: await productManager.getProductById(1) });
  } catch (error) {
    console.log({ error: error.message });
  }
  try {
    const deletedProduct = await productManager.deleteProduct(1);
    console.log({ deletedProduct });

    console.log({ productsAfterDelete: await productManager.getProducts() });
  } catch (error) {
    console.log({ error: error.message });
  }
  await productManager.clearProducts();


testProductManager()
  .then(() => console.log("Done"))
  .catch((error) => console.log(error));