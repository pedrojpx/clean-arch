import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private repo: CustomerRepositoryInterface
    constructor(repo: CustomerRepositoryInterface) {
        this.repo = repo
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const c = await this.repo.find(input.id)
        c.changeName(input.name)
        c.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))

        await this.repo.update(c)

        return {
            id: c.id,
            name: c.name,
            address: {
                street: c.address.street,
                number: c.address.number,
                zip: c.address.zip,
                city: c.address.city
            }
        }
    }
}