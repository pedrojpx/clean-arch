import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../customer/repository/sequelize/customer.model"
import { customerRoute } from "./routes/customer.route"
import { productRoute } from "./routes/products.route"
import ProductModel from "../product/product.model"

export const app: Express = express()
app.use(express.json())
app.use("/customer", customerRoute)
app.use("/product", productRoute)

export let sequelize: Sequelize

async function setUpDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
    })
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync()
}

setUpDb()