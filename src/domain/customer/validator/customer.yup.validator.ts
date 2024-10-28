import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup"

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        
        try {

            yup
            .object()
            .shape({
                id: yup.string().required("id is required"),
                name: yup.string().required("name is required"),
                rewardPoints: yup.number().positive("invalid reward points value")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name
                },
                {
                    abortEarly: false //configs so that collects all errors before aborting
                }
            )

        } catch(errors) {

            const e = errors as yup.ValidationError
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            })

        }
    }
}