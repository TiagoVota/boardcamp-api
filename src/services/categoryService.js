import * as categoryRepository from '../repositories/categoryRepository.js'

import * as categorySchema from '../schemas/categorySchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'
import ConflictAttributeError from '../errors/ConflictAttributeError.js'


const listCategories = async () => {
	const categories = await categoryRepository.findCategories()

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
	if (existentCategory) throw new ConflictAttributeError({ name, type: 'category' })

	const result = await categoryRepository.insertCategory({ name })

	return result
}


export {
	listCategories,
	createCategory,
}
