import Joi from 'joi'


const rentalQuerySchema = Joi.object({
	customerId: Joi.number().integer().min(1),
	gameId: Joi.number().integer().min(1),
})

const rentalSchema = Joi.object({
	customerId: Joi.number().integer().min(1).required(),
	gameId: Joi.number().integer().min(1).required(),
	daysRented: Joi.number().integer().min(1).required(),
}).length(3)


export {
	rentalQuerySchema,
	rentalSchema,
}
