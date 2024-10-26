import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe("customer factory unit test", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("Customer da silva")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Customer da silva")
        expect(customer.address).toBeUndefined()
    })
    
    it("should create a customer with an address", () => {
        const address = new Address("street",123, "2342342", "Ouro Preto")
        let customer = CustomerFactory.createWithAddress("Customer da silva", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Customer da silva")
        expect(customer.address).toBe(address)
    })


})