import Joi from 'joi'


const gameQuerySchema = Joi.object({
	name: Joi.string().trim().min(1).max(255)
})


export {
	gameQuerySchema,
}
