export interface InputListProductsDto {}

export interface OutputListProductsDto {
    products: product[]
}

type product = {
    id: string,
    name: string,
    price: number
}