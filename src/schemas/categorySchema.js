import joi from 'joi'


const categorySchema = joi.object({
	name: joi.string().min(2).max(255).required(),
}).length(1)


export {
	categorySchema,
}
