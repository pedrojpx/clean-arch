import Product from "./product"


describe("Product unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {

            const product = new Product("", "Product 1", 100)

        }).toThrow("product: id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {

            const product = new Product("123", "", 100)

        }).toThrow("product: name is required")
    })

    it("should throw error when price value is invalid", () => {
        expect(() => {

            const product = new Product("123", "Product 1", -1)

        }).toThrow("product: invalid price value")
    })
    
    it("should throw error when id and name are missing and price value is invalid", () => {
        expect(() => {

            const product = new Product("", "", -1)

        }).toThrow("product: id is required,product: name is required,product: invalid price value")
    })

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100)
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2")
    })

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100)
        product.changePrice(200)
        expect(product.price).toBe(200)
    })

})  