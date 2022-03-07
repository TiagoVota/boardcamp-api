import Joi from 'joi'

import { numericRegex } from '../factories/regexFactory.js'


const customerQuerySchema = Joi.object({
	cpf: Joi.string().trim().pattern(numericRegex(0, 11)),
	limit: Joi.number().integer().min(1),
	offset: Joi.number().integer().min(1),
	order: Joi.string(),
	desc: Joi.boolean(),
})

const customerIdSchema = Joi.object({
	customerId: Joi.number().integer().min(1).required(),
}).length(1)

const customerSchema = Joi.object({
	name: Joi.string().trim().min(2).max(255).required(),
	phone: Joi.string().trim().pattern(numericRegex(10, 11)).required(),
	cpf: Joi.string().trim().pattern(numericRegex(11)).required(),
	birthday: Joi.date().iso().required(),
}).length(4)


export {
	customerQuerySchema,
	customerIdSchema,
	customerSchema,
}
