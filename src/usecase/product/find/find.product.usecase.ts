import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUsecase {
    private repo: ProductRepositoryInterface
    constructor(repo: ProductRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const p = await this.repo.find(input.id)

        return {
            id: p.id,
            name: p.name,
            price: p.price,
        }
    }
}