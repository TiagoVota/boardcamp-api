import Joi from 'joi'


const rentalQuerySchema = Joi.object({
	customerId: Joi.number().integer().min(1),
	gameId: Joi.number().integer().min(1),
})


export {
	rentalQuerySchema,
}
