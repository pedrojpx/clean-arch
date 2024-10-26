import EventInterface from "../../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = eventData
        this.dataTimeOcurred = new Date()
    }
}