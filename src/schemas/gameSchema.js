import Joi from 'joi'


const gameQuerySchema = Joi.object({
	name: Joi.string().trim().min(0).max(255),
	limit: Joi.number().integer().min(1),
	offset: Joi.number().integer().min(1),
	order: Joi.string(),
	desc: Joi.boolean(),
})

const gameSchema = Joi.object({
	name: Joi.string().trim().min(2).max(255).required(),
	image: Joi.string().trim().required(),
	stockTotal: Joi.number().integer().min(1).required(),
	categoryId: Joi.number().integer().min(1).required(),
	pricePerDay: Joi.number().integer().min(1).required(),
}).length(5)


export {
	gameQuerySchema,
	gameSchema,
}
