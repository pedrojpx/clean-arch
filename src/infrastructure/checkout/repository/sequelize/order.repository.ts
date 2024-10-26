import { Sequelize } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
            
        },
        {
            include: [{model: OrderItemModel}],   
        })
    }    
    
    async find(id: string): Promise<Order> {
        let model
        try {
            model = await OrderModel.findOne({ where: {id: id}, rejectOnEmpty: true, include: [{model: OrderItemModel, as: 'items'}]})
        } catch (error) {
            throw new Error("Customer not found")
        }
        return this.modelToEntity(model)
    }
    
    async findAll(): Promise<Order[]> {
        const models = await OrderModel.findAll({include: [{model: OrderItemModel, as: "items"}]})
        return models.map((model) => this.modelToEntity(model))
    }

    private modelToEntity(model: OrderModel): Order {
        const items = model.items.map((model) => new OrderItem(model.id, model.name, model.price, model.product_id, model.quantity))
        const order = new Order(model.id, model.customer_id, items)
        return order
    }
    
    async update(entity: Order): Promise<void> {
        const seq = OrderModel.sequelize
        await seq.transaction(async(t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            })
            const items = entity.items.map(item => ( {
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
            }))
            await OrderItemModel.bulkCreate(items, { transaction: t })
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t}
            )
        })
    }
}