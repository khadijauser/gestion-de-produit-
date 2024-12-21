class Product{
    constructor(name,description,quantity,price){
        this.id = date.now();
        this.name=name;
        this.description=description;
        this.quantity=quantity;
        this.price=price;
    }
}
module.exports=Product;
