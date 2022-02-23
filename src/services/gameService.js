import * as gameRepository from '../repositories/gameRepository.js'

import * as gameSchema from '../schemas/gameSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'
import ConflictAttributeError from '../errors/ConflictAttributeError.js'


const listGames = async ({ name }) => {
	console.log({ name })
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { name },
		objectValidation: gameSchema.gameQuerySchema
	})

	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	
	const games = await gameRepository.findGames({ name })

	return games
}


// const createCategory = async ({ categoryInfo }) => {
// 	const categoryErrors = validationErrors({
// 		objectToValid: categoryInfo,
// 		objectValidation: gameSchema.gameSchema
// 	})

// 	if (categoryErrors) throw new SchemaError(categoryErrors)
// 	const { name } = categoryInfo

// 	const existentCategory = await gameRepository.findCategoryByName({ name })
// 	if (existentCategory) throw new ConflictAttributeError({ name, type: 'category' })

// 	const result = await gameRepository.insertCategory({ name })

// 	return result
// }


export {
	listGames,
	// createCategory,
}
