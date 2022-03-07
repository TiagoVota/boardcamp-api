import Joi from 'joi'


const rentalQuerySchema = Joi.object({
	customerId: Joi.number().integer().min(1),
	gameId: Joi.number().integer().min(1),
	limit: Joi.number().integer().min(1),
	offset: Joi.number().integer().min(1),
	order: Joi.string(),
	desc: Joi.boolean(),
	status: Joi.string().trim().lowercase(),
	startDate: Joi.date().iso(),
	endDate: Joi.date().iso(),
})

const rentalMetricsQuerySchema = Joi.object({
	startDate: Joi.date().iso(),
	endDate: Joi.date().iso(),
})

const rentalSchema = Joi.object({
	customerId: Joi.number().integer().min(1).required(),
	gameId: Joi.number().integer().min(1).required(),
	daysRented: Joi.number().integer().min(1).required(),
}).length(3)

const rentalIdSchema = Joi.object({
	rentalId: Joi.number().integer().min(1).required(),
}).length(1)

export {
	rentalQuerySchema,
	rentalMetricsQuerySchema,
	rentalSchema,
	rentalIdSchema,
}
