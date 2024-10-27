import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"

describe("Integration Test find product use case", () => {

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

    it("should update a product", async () => {
        const repo = new ProductRepository()
        const prod = new Product("123", "product", 123)
        await repo.create(prod)

        const usecase = new UpdateProductUseCase(repo)
        const input = {id: prod.id, name: "new product name", price: 123123}
        const output = await usecase.execute(input)

        expect(input).toEqual(output)

    })
})