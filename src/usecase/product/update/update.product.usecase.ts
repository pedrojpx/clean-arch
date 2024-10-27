import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";

export default class UpdateProductUseCase {
    private repo: ProductRepositoryInterface
    constructor(repo: ProductRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputUpdateProduct): Promise<OutputUpdateProduct> {
        const p = await this.repo.find(input.id)
        p.changeName(input.name)
        p.changePrice(input.price)

        await this.repo.update(p)

        return {
            id: p.id,
            name: p.name,
            price: p.price
        }
    }
}