import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import CreateProductUsecase from "./create.product.usecase"

describe("integration test create product use case", () => {

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

    it("should create a product", async() => {
        const repo = new ProductRepository()
        const prod = new Product("123", "product", 123)
        await repo.create(prod)

        const usecase = new CreateProductUsecase(repo)
        const input = {name: prod.name, price: prod.price, type: "a"}
        const output = await usecase.execute(input)
        
        expect(output.name).toBe(prod.name)
        expect(output.price).toBe(prod.price)
        expect(output.type).toBe("a")

    })


})