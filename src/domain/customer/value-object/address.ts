export default class Address{
    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._city = city
        this._number = number
        this._street = street
        this._zip = zip

        this.validate()
    }

    get city(): string {
        return this._city
    }

    get number(): number {
        return this._number
    }

    get street(): string {
        return this._street
    }

    get zip(): string {
        return this._zip
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required")
        }
        if (this._number === 0) {
            throw new Error("Number is required")
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required")
        }
        if (this._city.length === 0) {
            throw new Error("City is required")
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} - ${this._city}`
    }
}