import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const prod = ProductFactory.create("a", "product", 123)

const input = {
    id: prod.id,
    name: "new product name",
    price: 123123
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(prod)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("unit test for prod update use case", () => {

    it("should update a product", async() => {
        const repo = MockRepository()
        const usecase = new UpdateProductUseCase(repo)
        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })

})