import CreateProductUsecase from "./create.product.usecase"

const input = {
    name: "product 1",
    price: 10,
    type: "a"
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test create product use case", () => {
    
    it("should create a product", async() => {
        const repo = MockRepository()
        const usecase = new CreateProductUsecase(repo)
    
        const output = await usecase.execute(input)
    
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name, 
            price: input.price,
            type: input.type
        })
    })
    
    it("should not create a product if name is missing", async() => {
        const repo = MockRepository()
        const usecase = new CreateProductUsecase(repo)
        input.name = ""
    
        await expect(usecase.execute(input)).rejects.toThrow("name is required")
    })
   
    it("should not create a product if type is unsupported", async() => {
        const repo = MockRepository()
        const usecase = new CreateProductUsecase(repo)
        input.name = "name"
        input.type = "zzz"
    
        await expect(usecase.execute(input)).rejects.toThrow("Unsupported product type")
    })
    
})