import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import ListProductUsecase from "./find.product.usecase"

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

    it("should find a product", async () => {
        const repo = new ProductRepository()
        const prod = new Product("123", "product", 123)
        const prod2 = new Product("1232", "product2", 1232)
        await repo.create(prod)
        await repo.create(prod2)

        const usecase = new ListProductUsecase(repo)
        const output = await usecase.execute({})

        expect(prod).toEqual({_id: output.products[0].id, _name: output.products[0].name, _price: output.products[0].price})
        expect(prod2).toEqual({_id: output.products[1].id, _name: output.products[1].name, _price: output.products[1].price})

    })
})