import AddressChangedEvent from "../../customer/event/customer/address-changed.event"
import CustomerCreatedEvent from "../../customer/event/customer/customer-created.event"
import CustomerCreatedHandler2 from "../../customer/event/customer/handler/CustomerCreatedHandler2.handler"
import CustomerCreatedHandler1 from "../../customer/event/customer/handler/CustomerCreatedHandler1.handler"
import ProductCreatedEvent from "../../product/event/product-created.event"
import EventDispatcher from "./event-dispatcher"
import AddressChangedHandler from "../../customer/event/customer/handler/AddresChangedHandler.handler"
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-product-is-created.handler"

describe("Basic domain events tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1) 
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler) 

    })

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler) 

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0) 

    })
    
    it("should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler) 

        eventDispatcher.unregisterAll()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined() 

    })

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventHandler = jest.spyOn(eventHandler, "handle") //jest will spy if "handle" method is called by eventHandler

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler) 

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "product description",
            price: 10.0,
            email: "yourproductwascreated@mail.com"
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })

})

describe("Domain events tests for customer aggregate", () => {
    it("should call the appropriate handlers upon notification of customer created event", () => {
        const dispatcher = new EventDispatcher()
        const handler = new CustomerCreatedHandler1()
        const spy = jest.spyOn(handler, "handle")
        const handler2 = new CustomerCreatedHandler2()
        const spy2 = jest.spyOn(handler2, "handle")

        dispatcher.register("CustomerCreatedEvent", handler)
        dispatcher.register("CustomerCreatedEvent", handler2)

        const event = new CustomerCreatedEvent({})

        dispatcher.notify(event)

        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
    }) 

    it("should call the appropriate handlers upon notification of address changed", () => {
        const dispatcher = new EventDispatcher()
        const handler = new AddressChangedHandler()
        const spy = jest.spyOn(handler, "handle")

        dispatcher.register("AddressChangedEvent", handler)

        const event = new AddressChangedEvent({
            customerId: "1",
            customerName: "pedro",
            newAddress: "rua nova, 99 - cidade nova"
        })

        dispatcher.notify(event)

        expect(spy).toHaveBeenCalled()
    }) 

})