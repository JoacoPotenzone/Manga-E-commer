const fs = require('fs');

class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }
    
    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await this.readProducts();
        const newProduct = {
          id: this.getNextId(products),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
    
        products.push(newProduct);
        await this.saveProducts(products);
    
        return newProduct;
      }
      async saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      }
    
      getNextId(products) {
        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
      }
    
      async getProducts() {
        return await this.readProducts();
      }
    
      async readProducts() {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          return JSON.parse(data) || [];
        } catch (error) {
          return [];
        }
      }
    
    
      async getProductById(id) {
        const products = await this.readProducts();
        return products.find(product => product.id === id);
      }
    
      async updateProduct(id, updatedFields) {
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
          products[index] = { ...products[index], ...updatedFields };
          await this.saveProducts(products);
          return products[index];
        }
        return null;
      }
    
      async deleteProduct(id) {
        const products = await this.readProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        await this.saveProducts(filteredProducts);
        return filteredProducts;
      }
    }

module.exports = ProductManager;