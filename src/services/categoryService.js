import * as categoryRepository from '../repositories/categoryRepository.js'

import * as categorySchema from '../schemas/categorySchema.js'

import { validationErrors } from '../validations/handleValidation.js'
import { boolStrToBool } from '../utils/stringManipulator.js'

import SchemaError from '../errors/SchemaError.js'
import ConflictAttributeError from '../errors/ConflictAttributeError.js'


const listCategories = async ({ limit, offset, order, desc }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { limit, offset, order, desc },
		objectValidation: categorySchema.categoryQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const categories = await categoryRepository.findCategories({
		limit,
		offset,
		order,
		isDesc: boolStrToBool(desc),
	})

	return categories
}


const createCategory = async ({ categoryInfo }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: categoryInfo,
		objectValidation: categorySchema.categorySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	const { name } = categoryInfo

	const existentCategory = await categoryRepository.findCategoryByName({ name })
	if (existentCategory) throw new ConflictAttributeError({
		value: name,
		atribute: 'name',
		table: 'category',
	})

	const category = await categoryRepository.insertCategory({ name })

	return category
}


export {
	listCategories,
	createCategory,
}
