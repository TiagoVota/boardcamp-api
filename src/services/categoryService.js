import * as categoryRepository from '../repositories/categoryRepository.js'

import * as categorySchema from '../schemas/categorySchema.js'
import * as paginationSchema from '../schemas/paginationSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'
import ConflictAttributeError from '../errors/ConflictAttributeError.js'


const listCategories = async ({ limit, offset }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { limit, offset },
		objectValidation: paginationSchema.paginationSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const categories = await categoryRepository.findCategories({ limit, offset })

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
