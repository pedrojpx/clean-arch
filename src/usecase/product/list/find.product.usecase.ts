import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto, OutputListProductsDto } from "./find.product.dto";

export default class ListProductUsecase {
    private repo: ProductRepositoryInterface
    constructor(repo: ProductRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
        const p = await this.repo.findAll()

        return {
            products: p.map((item) => {return {id: item.id, name: item.name, price: item.price}})
        }
    }
}