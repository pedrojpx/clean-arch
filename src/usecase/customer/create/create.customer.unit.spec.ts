import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "john",
    address: {
        street: "street",
        number: 123,
        zip: "zip",
        city: "city"
    },
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test create customer use case", () => {

    it("should create a customer", async() => {
        const repo = MockRepository()
        const usecase = new CreateCustomerUseCase(repo)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        })
    })
    
    it("show throw error when name is missing", async() => {
        const repo = MockRepository()
        const usecase = new CreateCustomerUseCase(repo)
        input.name = ""

        await expect(usecase.execute(input)).rejects.toThrow("customer: name is required")
        
    })
    
    it("show throw error when street is missing", async() => {
        const repo = MockRepository()
        const usecase = new CreateCustomerUseCase(repo)
        input.address.street = ""

        await expect(usecase.execute(input)).rejects.toThrow("Street is required")
        
    })
})