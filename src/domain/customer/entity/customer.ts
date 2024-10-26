import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    get id(): string {
        return this._id
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
            throw new Error("address is required to change address")
        }
        this._address = address;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }

        if (this._id.length === 0) {
            throw new Error("Id is required")
        }

        if (this.rewardPoints < 0) {
            throw new Error("invalid reward points value")
        }
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