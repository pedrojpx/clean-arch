import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUsecase {
    private repo: ProductRepositoryInterface
    constructor(repo: ProductRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const p = ProductFactory.create(input.type, input.name, input.price)
        await this.repo.create(p)

        return {
            id: p.id,
            name: p.name,
            price: p.price,
            type: input.type
        }
    }
}