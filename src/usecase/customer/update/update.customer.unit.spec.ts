import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("john", new Address("street", 123, "zip", "city"))

const input = {
    id: customer.id,
    name: "new john",
    address: {
        street: "new street",
        number: 1234,
        zip: "new zip",
        city: "new city"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}

describe("unit test for customer update use case", () => {

    it("should update a customer", async () => {
        const repo = MockRepository()
        const usecase = new UpdateCustomerUseCase(repo)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})