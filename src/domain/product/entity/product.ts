import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import ProductValidatorFactory from "../factory/product.validator.factory"
import ProductInterface from "./product.interface"

export default class Product extends Entity implements ProductInterface {
    
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id
        this._name = name
        this._price = price
        this.validate()
    }

    get name(): string {
        return this._name
    }

    get id(): string {
        return this._id
    }

    get price(): number {
        return this._price
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }


    validate() {
        ProductValidatorFactory.create().validate(this)
        // if (this._id.length === 0) {
        //     this.notification.addError({context: "product", message: "id is required"})
        // }
        
        // if (this._name.length === 0) {
        //     this.notification.addError({context: "product", message: "name is required"})
        // }
        
        // if (this._price <= 0) {
        //     this.notification.addError({context: "product", message: "invalid price value"})
        // }

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }
}