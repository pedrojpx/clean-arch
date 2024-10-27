import Product from "../../../domain/product/entity/product";
import FindCustomerUseCase from "../../customer/find/find.customer.usecase";
import FindProductUsecase from "./find.product.usecase";

const prod = new Product("123", "product", 123)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(prod)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit Test find customer use case", () => {
    it("should find a product", async () => {
        const repo = MockRepository()
        const usecase = new FindProductUsecase(repo)
        const input = {id: "123"}
        const output = await usecase.execute(input)
        const expected = {
            id: "123",
            name: "product",
            price: 123
        }

        expect(output).toEqual(expected)

    })
    
    it("should not find a product", async () => {
        const repo = MockRepository()
        repo.find.mockImplementation(() => {
            throw new Error("product not found")
        })
        const usecase = new FindProductUsecase(repo)
        const input = {id: "1231"}
    
        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("product not found")
    
    })
})