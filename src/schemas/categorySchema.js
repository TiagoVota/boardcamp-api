import Joi from 'joi'


const categorySchema = Joi.object({
	name: Joi.string().trim().min(2).max(255).required(),
}).length(1)


export {
	categorySchema,
}
