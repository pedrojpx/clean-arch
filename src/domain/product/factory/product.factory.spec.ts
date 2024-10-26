import ProductFactory from "./product.factory"

describe("Prodcut factory unit test", () => {

    it("should create a product type a", () => {

        const product = ProductFactory.create("a", "product a", 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("product a")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")

    })
    
    it("should create a product type b", () => {

        const product = ProductFactory.create("b", "product b", 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("product b")
        expect(product.price).toBe(2)
        expect(product.constructor.name).toBe("ProductB")

    })
    
    it("should throw error when product type not supported", () => {
        expect(() => ProductFactory.create("c", "product b", 1)).toThrow("Unsupported product type")
    })
})