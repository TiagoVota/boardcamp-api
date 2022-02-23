import * as categoryRepository from '../repositories/categoryRepository.js'
import * as gameRepository from '../repositories/gameRepository.js'

import * as gameSchema from '../schemas/gameSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import ConflictAttributeError from '../errors/ConflictAttributeError.js'
import InexistentIdError from '../errors/InexistentIdError.js'
import SchemaError from '../errors/SchemaError.js'


const listGames = async ({ name }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { name },
		objectValidation: gameSchema.gameQuerySchema
	})

	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	
	const games = await gameRepository.findGames({ name: name || '' })

	return games
}


const createGame = async ({ gameInfo }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: gameInfo,
		objectValidation: gameSchema.gameSchema
	})

	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	const { name, categoryId } = gameInfo
	
	const existentGame = await gameRepository.findGameByName({ name })
	if (existentGame) throw new ConflictAttributeError({ name, type: 'games' })

	const existentCategory = await categoryRepository
		.findCategoryById({ id: categoryId })
	if (existentCategory === null) throw new InexistentIdError({
		id: categoryId,
		type: 'category'
	})

	const game = await gameRepository.insertGame(gameInfo)

	return game
}


export {
	listGames,
	createGame,
}
