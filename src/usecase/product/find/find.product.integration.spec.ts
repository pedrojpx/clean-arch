import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import FindProductUsecase from "./find.product.usecase"

describe("Integration Test find customer use case", () => {

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

    it("should find a customer", async () => {
        const repo = new ProductRepository()
        const prod = new Product("123", "product", 123)
        await repo.create(prod)

        const usecase = new FindProductUsecase(repo)
        const input = {id: "123"}
        const output = await usecase.execute(input)
        const expected = {
            id: "123",
            name: "product",
            price:123
        }

        expect(output).toEqual(expected)

    })
})