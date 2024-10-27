import Product from "../../../domain/product/entity/product";
import ListProductUsecase from "./find.product.usecase";

const prod = new Product("123", "product", 123)
const prod2 = new Product("1232", "product2", 1232)

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([prod, prod2])),
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit Test find customer use case", () => {
    it("should list all products", async () => {
        const repo = MockRepository()
        const usecase = new ListProductUsecase(repo)
        const output = await usecase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe("123")
        expect(output.products[0].name).toBe("product")
        expect(output.products[0].price).toBe(123)
        expect(output.products[1].id).toBe("1232")
        expect(output.products[1].name).toBe("product2")
        expect(output.products[1].price).toBe(1232)

    })
})