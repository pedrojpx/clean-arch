//this one is blank now but could contain data that refers to pagination or filtering
export interface InputListCustomerDto {}

type Customer = {
    id: string,
    name: string,
    address: {
        street: string,
        number: number,
        zip: string,
        city: string
    }
}

export interface OutputListCustomerDto {
    customers: Customer[]
}