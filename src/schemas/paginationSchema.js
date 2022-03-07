import Joi from 'joi'


const paginationSchema = Joi.object({
	limit: Joi.number().integer().min(1),
	offset: Joi.number().integer().min(1),
})


export {
	paginationSchema,
}
