import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "./customer.repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import CustomerModel from "./customer.model"

describe("Product repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        sequilize.addModels([CustomerModel])
        await sequilize.sync();
    })

    afterEach(async() => {
        await sequilize.close()
    })

    it("should create a customer", async () => {
        const repo = new CustomerRepository
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)

        await repo.create(customer)

        const model = await CustomerModel.findOne({ where: {id: "123"}})

        expect(model.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            streetNumber: address.number,
            zip: address.zip,
            city: address.city
        })
    })
    
    it("should update a customer", async () => {
        const repo = new CustomerRepository
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        
        await repo.create(customer)
        
        customer.changeName("Pedro")
        const address2 = new Address("Street 2", 2, "zipcode 2", "city 2")
        customer.changeAddress(address2)
        
        await repo.update(customer)
        
        const model = await CustomerModel.findOne({ where: {id: "123"}})

        expect(model.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address2.street,
            streetNumber: address2.number,
            zip: address2.zip,
            city: address2.city
        })
    })
    
    it("should find a customer", async () => {
        const repo = new CustomerRepository
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        
        await repo.create(customer)

        const foundByRepo = await repo.find("123")
        
        expect(customer).toStrictEqual(foundByRepo)
    })

    it("should throw error if customer not found", async() => {
        const repo = new CustomerRepository
        expect(async() => {
            await repo.find("AAAAAA")
        }).rejects.toThrow("Customer not found")
    })
    
    it("should find all customers", async () => {
        const repo = new CustomerRepository

        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await repo.create(customer)

        const customer2 = new Customer("12", "Customer 2")
        const address2 = new Address("Street 2", 2, "zipcode 2", "city 2")
        customer2.changeAddress(address2)
        await repo.create(customer2)

        const customer3 = new Customer("1231", "Customer 3")
        const address3 = new Address("Street 3", 3, "zipcode 3", "city 3")
        customer3.changeAddress(address3)
        await repo.create(customer3)


        const found = await repo.findAll()
        const items = [customer, customer2, customer3]

        expect(items).toEqual(found)
        
    })
    
    
})