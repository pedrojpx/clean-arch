import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private repo: CustomerRepositoryInterface
    constructor(repo: CustomerRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const c = await this.repo.findAll()

        const output = c.map((item) => {
            return {
                id: item.id,
                name: item.name,
                address: {
                    street: item.address.street,
                    number: item.address.number,
                    city: item.address.city,
                    zip: item.address.zip,
                }
            }
        })

        return {
            customers: output
        }
    }
}