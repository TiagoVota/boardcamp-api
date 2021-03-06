import * as categoryRepository from '../repositories/categoryRepository.js'
import * as gameRepository from '../repositories/gameRepository.js'

import * as gameSchema from '../schemas/gameSchema.js'

import { validationErrors } from '../validations/handleValidation.js'
import { boolStrToBool } from '../utils/stringManipulator.js'

import ConflictAttributeError from '../errors/ConflictAttributeError.js'
import InexistentIdError from '../errors/InexistentIdError.js'
import SchemaError from '../errors/SchemaError.js'


const listGames = async ({ name, limit, offset, order, desc }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { name, limit, offset, order, desc },
		objectValidation: gameSchema.gameQuerySchema
	})

	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	
	const games = await gameRepository.findGames({
		name: name || '',
		limit,
		offset,
		order,
		isDesc: boolStrToBool(desc),
	})

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
	if (existentGame) throw new ConflictAttributeError({
		value: name,
		atribute: 'name',
		table: 'games',
	})

	const existentCategory = await categoryRepository.findCategoryById({
		id: categoryId
	})
	if (existentCategory === null) throw new InexistentIdError({
		id: categoryId,
		table: 'categories'
	})

	const game = await gameRepository.insertGame(gameInfo)

	return game
}


export {
	listGames,
	createGame,
}
