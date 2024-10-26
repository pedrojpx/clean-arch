import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            streetNumber: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city
        })
    }    
    
    async find(id: string): Promise<Customer> {
        let model
        try {
            model = await CustomerModel.findOne({ where: {id: id}, rejectOnEmpty: true})
        } catch (error) {
            throw new Error("Customer not found")
        }
        return this.modelToEntity(model)
    }
    
    async findAll(): Promise<Customer[]> {
        const models = await CustomerModel.findAll()

        return models.map((model) => this.modelToEntity(model))
        
    }

    private modelToEntity(model: CustomerModel): Customer {
        const customer = new Customer(model.id, model.name)
        const address = new Address(model.street, model.streetNumber, model.zip, model.city)
        customer.changeAddress(address)
        return customer
    }
    
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
                street: entity.address.street,
                streetNumber: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
}