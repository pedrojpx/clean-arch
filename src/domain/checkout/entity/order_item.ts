export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name : string; //we are simplifying things here... name and price could be an id reference to a Product aggregate
    private _price: number;
    private _quantity: number;

    constructor(id: string, name:string, price:number, productId: string, quantity: number) {
        this._id = id
        this._name = name
        this._price = price
        this._productId = productId
        this._quantity = quantity
    }

    get id(): string {
        return this._id
    }
    
    get productId(): string {
        return this._productId
    }
    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    orderItemTotal(): number {
        return this._price * this._quantity
    }

    get quantity(): number {
        return this._quantity
    }
}