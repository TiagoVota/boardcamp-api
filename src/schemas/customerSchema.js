import Joi from 'joi'


const customerQuerySchema = Joi.object({
	cpf: Joi.string().trim().alphanum().min(0).max(11),
})

const customerIdSchema = Joi.object({
	customerId: Joi.number().integer().min(1).required(),
})

const customerSchema = Joi.object({
	name: Joi.string().trim().min(2).max(255).required(),
	image: Joi.string().trim().required(),
	stockTotal: Joi.number().integer().min(1).required(),
	categoryId: Joi.number().integer().min(1).required(),
	pricePerDay: Joi.number().integer().min(1).required(),
})


export {
	customerQuerySchema,
	customerIdSchema,
	customerSchema,
}
