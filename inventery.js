const fs = require('fs');
const prompt = require('prompt-sync')();
const Product = require('./product');
const filePath = './stock manager/inventory.json';

class Inventory {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        return [];
    }

    saveProducts() {
        fs.writeFileSync(filePath, JSON.stringify(this.products, null, 4));
    }

    showMainMenu() {
        console.log(`\n------------- Main Menu -------------`);
        console.log(`1. Add a Product`);
        console.log(`2. Display All Products`);
        console.log(`3. Modify a Product`);
        console.log(`4. Delete a Product`);
        console.log(`0. Quit`);
        console.log(`--------------------------------------`);
    }

    showModifyMenu() {
        console.log(`\nWhat would you like to modify?`);
        console.log(`1. Name`);
        console.log(`2. Description`);
        console.log(`3. Quantity`);
        console.log(`4. Price`);
        console.log(`0. Go Back`);
    }

    showProductDetails(index) {
        const product = this.products[index];
        console.log(`\nProduct ${index + 1}:`);
        console.log(`Name: ${product.name}`);
        console.log(`Description: ${product.description}`);
        console.log(`Quantity: ${product.quantity}`);
        console.log(`Price: ${product.price}`);
    }

    displayAllProducts() {
        if (this.products.length === 0) {
            console.log(`\nNo products available!`);
        } else {
            this.products.forEach((_, index) => this.showProductDetails(index));
        }
    }

    addProducts() {
        console.log(`\nAdding Product ${this.products.length + 1}`);

        const name = prompt('Enter product name: ');
        const description = prompt('Enter product description: ');

        let quantity;
        do {
            quantity = parseInt(prompt('Enter product quantity: '), 10);
            if (isNaN(quantity)) {
                console.log('Please enter a valid number for quantity.');
            }
        } while (isNaN(quantity));

        let price;
        do {
            price = parseFloat(prompt('Enter product price: '));
            if (isNaN(price)) console.log('Please enter a valid number for price.');
        } while (isNaN(price));

        this.products.push(new Product(name, description, quantity, price));

        this.saveProducts();
        console.log('Product added successfully!');
    }

    modifyProduct() {
        if (this.products.length === 0) {
            console.log(`\nNo products available to modify!`);
            return;
        }

        this.displayAllProducts();
        const productIndex = parseInt(prompt('Select a product number to modify (0 to cancel): '), 10) - 1;

        if (productIndex === -1) {
            return; // Exit without showing an error
        }

        if (productIndex < 0 || productIndex >= this.products.length) {
            console.log('⚠️ Product not found.');
            return;
        }

        let option;
        do {
            this.showProductDetails(productIndex);
            this.showModifyMenu();

            option = parseInt(prompt('Enter your choice: '), 10);
            const product = this.products[productIndex];

            switch (option) {
                case 1:
                    const newName = prompt('Enter new name (leave blank to keep current): ');
                    if (newName) product.name = newName;
                    break;
                case 2:
                    const newDescription = prompt('Enter new description (leave blank to keep current): ');
                    if (newDescription) product.description = newDescription;
                    break;
                case 3:
                    let newQuantity;
                    do {
                        newQuantity = parseInt(prompt('Enter new quantity: '), 10);
                        if (isNaN(newQuantity)) console.log('Invalid quantity.');
                    } while (isNaN(newQuantity));
                    product.quantity = newQuantity;
                    break;
                case 4:
                    let newPrice;
                    do {
                        newPrice = parseFloat(prompt('Enter new price: '));
                        if (isNaN(newPrice)) console.log('Invalid price.');
                    } while (isNaN(newPrice));
                    product.price = newPrice;
                    break;
                case 0:
                    break;
                default:
                    console.log('Invalid choice.');
                }
                this.saveProducts();
            } while (option !== 0);
        console.log('🔄 Product updated successfully!');
    }

    deleteProduct() {
        if (this.products.length === 0) {
            console.log(`\nNo products available to delete!`);
            return;
        }

        this.displayAllProducts();
        const productIndex = parseInt(prompt('Select a product number to delete (0 to cancel): '), 10) - 1;

        if (productIndex === -1) {
            return; // Exit without showing an error
        }
        if (productIndex < 0 || productIndex >= this.products.length) {
            console.log('Invalid product selection.');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
        console.log('Product deleted successfully!');
    }
}

module.exports = Inventory;
