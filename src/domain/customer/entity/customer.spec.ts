import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
    
    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "John")  
        }).toThrow("Id is required")
    
    })

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "")  
        }).toThrow("Name is required")
    
    })

    it("should change name", () => {

        //arrange
        const customer = new Customer("123", "John")
        
        //act
        customer.changeName("Jane")
        
        //assert
        expect(customer.name).toBe("Jane")
    
    })

    it("should activate customer", () => {

        //arrange
        const customer = new Customer("123", "John")
        const addres = new Address("Street 1", 123, "123440-910", "Ouro Preto")
        customer.address = addres
        
        //act
        customer.activate()
        
        //assert
        expect(customer.isActive()).toBe(true)
    
    })

    it("should deactivate customer", () => {

        //arrange
        const customer = new Customer("123", "John")
        
        //act
        customer.deactivate()
        
        //assert
        expect(customer.isActive()).toBe(false)
    
    })

    it("should throw eror when address is undefined when you activate a customer", () => {

        expect(() => {
            const customer = new Customer("123", "John")
            customer.activate()
        }).toThrow("Address is mandatory to activate a customer")
    
    })

})  