import Product from "../entity/product";

export default class ProductService {

    //this is for an example... in a real situation this would likely be a call to an update routine in the databse
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice(product.price * percentage / 100 + product.price)
        })
    }

}