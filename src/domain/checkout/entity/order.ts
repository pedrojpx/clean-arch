import OrderItem from "./order_item";
export default class Order {
    private _id: string;
    private _customerId: string; //customer is a different aggregate, therefore it uses an Id reference
    private _items: OrderItem[] = []; //OrderItem is part of the same aggregate, so it uses a reference to the entity directly
    private _total: number; //OrderItem is part of the same aggregate, so it uses a reference to the entity directly


	constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.total()
        this.validate()
	}

    get id(): string {
        return this._id
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }

        if (this._customerId.length === 0) {
            throw new Error("customerId is required")
        }

        if (this._items.length === 0) {
            throw new Error("item quantity must be greater than 0")
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("invalid order item quantity value")
        }
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
    }

}