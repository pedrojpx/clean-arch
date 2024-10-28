import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup"

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        
        try {

            yup
            .object()
            .shape({
                id: yup.string().required("id is required"),
                name: yup.string().required("name is required"),
                price: yup.number().min(0, "invalid price value")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                },
                {
                    abortEarly: false
                }
            )

        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product",
                    message: error
                })
            })
        }
    }
}