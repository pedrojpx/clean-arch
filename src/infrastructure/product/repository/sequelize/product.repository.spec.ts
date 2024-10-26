import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../product.model"
import Product from "../../../../domain/product/entity/product"
import ProductService from "../../../../domain/product/service/product.service"
import ProductRepository from "./product.repository"

describe("Product repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        sequilize.addModels([ProductModel])
        await sequilize.sync();
    })

    afterEach(async() => {
        await sequilize.close()
    })

    it("should create a product", async () => {
        const repo = new ProductRepository()
        const product = new Product("1", "product 1", 100)

        await repo.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}})

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "product 1",
            price: 100
        })
    })
    
    it("should update a product", async () => {
        const repo = new ProductRepository()
        const product = new Product("1", "product 1", 100)

        await repo.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}})
        
        product.changeName("product 2")
        product.changePrice(1200)
        
        await repo.update(product)
        
        const productModel2 = await ProductModel.findOne({ where: {id: "1"}})

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "product 2",
            price: 1200
        })
    })
    
    it("should find a product", async () => {
        const repo = new ProductRepository()
        const product = new Product("1", "product 1", 100)

        await repo.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}})

        const foundByRepo = await repo.find("1")

        expect(productModel.toJSON()).toStrictEqual({
            id: foundByRepo.id,
            name: foundByRepo.name,
            price: foundByRepo.price
        })
        
    })
    
    it("should find all products", async () => {
        const repo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await repo.create(product)
        const product2 = new Product("2", "product 2", 200)
        await repo.create(product2)
        const product3 = new Product("3", "product 3", 300)
        await repo.create(product3)


        const found = await repo.findAll()
        const products = [product, product2, product3]

        expect(products).toEqual(found)
        
    })
    
    
})