import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super()
        this._id = id;
        this._name = name;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get name(): string {
        return this._name
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    get address(): Address {
        return this._address
    }

    //diferently from a "get name", this denotes the intention for the function instead of simply "following protocol"
    changeName(name: string) {
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }
        this._name = name;
        this.validate();
    }
    
    changeAddress(address: Address) {
        if (address === undefined) {
            this.notification.addError({context: "customer", message: "address is required to change address"})
            throw new NotificationError(this.notification.getErrors());
        }
        this._address = address;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            this.notification.addError({context: "customer", message: "address is mandatory to activate a customer"})
            throw new NotificationError(this.notification.getErrors());
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    //the only way to change an address is to substitute the entire value object
    set address(address: Address) {
        this._address = address
    }

    isActive(): boolean {
        return this._active
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
        this.validate()
    }
}