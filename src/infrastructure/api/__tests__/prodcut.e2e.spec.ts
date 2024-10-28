import request from "supertest"
import {app, sequelize} from "../express"

describe("E2E test for product", () => {

    beforeEach(async() => {
        await sequelize.sync({force: true})
    })

    afterAll(async() => {
        await sequelize.close()
    })

    it("should create a product", async() => {
        const res = await request(app)
            .post("/product")
            .send({
                name: "product",
                price: 123,
                type: "a"
            })

        expect(res.status).toBe(200)
        expect(res.body.name).toBe("product")
        expect(res.body.price).toBe(123)
        expect(res.body.type).toBe("a")
    })
    
    it("should list all products", async() => {
        const res = await request(app)
            .post("/product")
            .send({
                name: "product",
                price: 123,
                type: "a"
            })
        expect(res.status).toBe(200)
        const res2 = await request(app)
            .post("/product")
            .send({
                name: "product2",
                price: 1232,
                type: "b"
            })
        expect(res2.status).toBe(200)

        const list = await request(app).get("/product").send()
        expect(list.status).toBe(200)
        expect(list.body.products.length).toBe(2)
        const p0 = list.body.products[0]
        expect(p0.name).toBe("product")
        expect(p0.price).toBe(123)
        const p1 = list.body.products[1]
        expect(p1.name).toBe("product2")
        expect(p1.price).toBe(1232 * 2) //because it is type "b"
    })
    

})