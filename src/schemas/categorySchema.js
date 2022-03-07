import Joi from 'joi'


const categoryQuerySchema = Joi.object({
	limit: Joi.number().integer().min(1),
	offset: Joi.number().integer().min(1),
	order: Joi.string(),
	desc: Joi.boolean(),
})

const categorySchema = Joi.object({
	name: Joi.string().trim().min(2).max(255).required(),
}).length(1)


export {
	categoryQuerySchema,
	categorySchema,
}
