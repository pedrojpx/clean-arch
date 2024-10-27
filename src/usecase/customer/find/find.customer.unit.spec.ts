import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer("123", "pedro")
const address = new Address("street", 123, "zip", "city")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit Test find customer use case", () => {

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

    it("should find a customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)
        const input = {id: "123"}
        const output = await usecase.execute(input)
        const expected = {
            id: "123",
            name: "pedro",
            address: {
                street: "street",
                city: "city",
                number: 123,
                zip: "zip"
            }
        }

        expect(output).toEqual(expected)

    })
    
    it("should not find a customer", async () => {
        const customerRepository = MockRepository()
        customerRepository.find.mockImplementation(() => {
            throw new Error("customer not found")
        })
        const usecase = new FindCustomerUseCase(customerRepository)
        const input = {id: "123"}
    
        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("customer not found")
    
    })
})