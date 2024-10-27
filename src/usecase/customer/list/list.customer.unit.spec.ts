import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"

const c1 = CustomerFactory.createWithAddress("john", new Address("street", 123, "zip", "city"))
const c2 = CustomerFactory.createWithAddress("john 2", new Address("street 2", 1231, "zip2", "city2"))

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([c1,c2])),
        find: jest.fn(),
        update: jest.fn()
    }
}

describe("unit test for list customer use case", () => {

    it("should list aa customer", async () => {
        const repo = MockRepository()
        const usecase = new ListCustomerUseCase(repo)

        const output = await usecase.execute({})

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(c1.id)
        expect(output.customers[0].name).toBe(c1.name)
        expect(output.customers[0].address.street).toBe(c1.address.street)
        expect(output.customers[1].id).toBe(c2.id)
        expect(output.customers[1].name).toBe(c2.name)
        expect(output.customers[1].address.street).toBe(c2.address.street)
    })
})