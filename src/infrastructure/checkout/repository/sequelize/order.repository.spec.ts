import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import OrderItemModel from "./order-item.model"
import OrderModel from "./order.model"
import ProductModel from "../../../product/product.model"
import ProductRepository from "../../../product/repository/sequelize/product.repository"
import Product from "../../../../domain/product/entity/product"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import Order from "../../../../domain/checkout/entity/order"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        sequilize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel])
        await sequilize.sync();
    })

    afterEach(async() => {
        await sequilize.close()
    })
    
    it("should create a new order", async() => {
        
        const customerRepo = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepo.create(customer)

        const prodRepo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await prodRepo.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem])
        const orderRepo = new OrderRepository()
        await orderRepo.create(order)

        const model = await OrderModel.findOne({ where: {id: order.id}, include: ["items"] })

        expect(model.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    order_id: "1",
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId
                }
            ]
        })
    })

    it("should find an order", async() => {
        const customerRepo = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepo.create(customer)

        const prodRepo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await prodRepo.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem])
        const orderRepo = new OrderRepository()
        await orderRepo.create(order)

        const foundByRepo = await orderRepo.find(order.id)

        expect(order).toStrictEqual(foundByRepo)
    })

    it("should find all orders", async() => {
        const customerRepo = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepo.create(customer)

        const prodRepo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await prodRepo.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem])
        const orderRepo = new OrderRepository()
        await orderRepo.create(order)


        const customer2 = new Customer("12", "Customer 2")
        const address2 = new Address("Street 2", 2, "zipcode 2", "city 2")
        customer2.changeAddress(address2)
        await customerRepo.create(customer2)

        const product2 = new Product("2", "product 2", 100)
        await prodRepo.create(product2)

        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 3)
        const order2 = new Order("2", customer2.id, [orderItem2])
        await orderRepo.create(order2)


        const customer3 = new Customer("1", "Customer 3")
        const address3 = new Address("Street 3", 3, "zipcode 3", "city 3")
        customer3.changeAddress(address3)
        await customerRepo.create(customer3)

        const product3 = new Product("3", "product 3", 100)
        await prodRepo.create(product3)

        const orderItem3 = new OrderItem("3", product3.name, product3.price, product3.id, 3)
        const order3 = new Order("3", customer3.id, [orderItem3])
        await orderRepo.create(order3)

        const foundByRepo = await orderRepo.findAll()

        expect([order,order2,order3]).toStrictEqual(foundByRepo)
    })

    it("should update an order", async() => {
        const customerRepo = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepo.create(customer)

        const prodRepo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await prodRepo.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem])
        const orderRepo = new OrderRepository()
        await orderRepo.create(order)
        
        const orderItem2 = new OrderItem("1", "new product name", 1123, product.id, 2)
        const orderItem3 = new OrderItem("2", "other item same product", 1123, product.id, 2)
        const alteredOrder = new Order(order.id, order.customerId, [orderItem2, orderItem3])
        await orderRepo.update(alteredOrder)

        const model = await OrderModel.findOne({ where: {id: order.id}, include: ["items"] })

        //eu sei que este não está passando. Não sei mais o que fazer para conseguir o update em cascada.
        //uma dica por favor?
        expect(model.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "123",
            total: alteredOrder.total(),
            items: [
                {
                    id: orderItem2.id,
                    order_id: "1",
                    name: "new product name",
                    price: 1123,
                    quantity: 2,
                    product_id: orderItem2.productId
                },
                {
                    id: orderItem3.id,
                    order_id: "1",
                    name: "other item same product",
                    price: 1123,
                    quantity: 2,
                    product_id: orderItem3.productId
                },
                
            ]
        })
    })
})