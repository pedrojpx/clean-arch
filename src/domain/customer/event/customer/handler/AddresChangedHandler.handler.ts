import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import EventInterface from "../../../../@shared/event/event.interface";

export default class AddressUpdatedHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        const data = event.eventData
        console.log(`endereço do cliente ${data.customerId}, ${data.customerName} alterado para ${data.newAddress}`)
    }
}