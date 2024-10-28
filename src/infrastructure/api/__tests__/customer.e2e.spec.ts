import {app, sequelize} from "../express"
import request from "supertest"
describe("E2E test for customer", () => {

    beforeEach(async() => {
        await sequelize.sync({force: true})
    })

    afterAll(async() => {
        await sequelize.close()
    })

    it("should create a customer", async() => {
        const resp = await request(app)
            .post("/customer")
            .send({
                name: "pedro",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "zip"
                }
            })

        expect(resp.status).toBe(200)
        expect(resp.body.name).toBe("pedro")
        expect(resp.body.address.street).toBe("street")
        expect(resp.body.address.city).toBe("city")
        expect(resp.body.address.number).toBe(123)
        expect(resp.body.address.zip).toBe("zip")
    })
    
    it("should not create a customer", async() => {
        const resp = await request(app)
        .post("/customer")
        .send({
            name: "pedro",
        })
        
        expect(resp.status).toBe(500)
    })
    
    it("should list all customers", async() => {
        const resp = await request(app)
            .post("/customer")
            .send({
                name: "pedro",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "zip"
                }
            })
        expect(resp.status).toBe(200)
        
        const resp2 = await request(app)
            .post("/customer")
            .send({
                name: "dani b",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "zip"
                }
            })
        expect(resp2.status).toBe(200)
        
        const list = await request(app).get("/customer").send()
        expect(list.status).toBe(200)
        expect(list.body.customers.length).toBe(2)
        const c1 = list.body.customers[0]
        expect(c1.name).toBe("pedro")
        expect(c1.address.street).toBe("street")
        expect(c1.address.city).toBe("city")
        expect(c1.address.number).toBe(123)
        expect(c1.address.zip).toBe("zip")
        const c2 = list.body.customers[1]
        expect(c2.name).toBe("dani b")
        expect(c2.address.street).toBe("street")
        expect(c2.address.city).toBe("city")
        expect(c2.address.number).toBe(123)
        expect(c2.address.zip).toBe("zip")

        const xmlList = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send()

        expect(xmlList.status).toBe(200)
        expect(xmlList.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(xmlList.text).toContain(`<customers>`)
        expect(xmlList.text).toContain(`<customer>`)
        expect(xmlList.text).toContain(`<name>pedro</name>`)
        expect(xmlList.text).toContain(`<address>`)
        //etc, etc... aqui poderia vir vários outros expect checando mais pedaços do texto para garantir que o xml está correto

    })

})