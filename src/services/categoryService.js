import * as categoryRepository from '../repositories/categoryRepository.js'
import * as categorySchema from '../schemas/categorySchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'
import ConflictAtributeError from '../errors/ConflictAtributeError.js'


const listCategories = async () => {
	const categories = await categoryRepository.findCategories()

	return categories
}


const createCategory = async ({ categoryInfo }) => {
	const categoryErrors = validationErrors({
		objectToValid: categoryInfo,
		objectValidation: categorySchema.categorySchema
	})

	if (categoryErrors) throw new SchemaError(categoryErrors)
	const { name } = categoryInfo

	const existentCategory = await categoryRepository.findCategoryByName({ name })
	if (existentCategory) throw new ConflictAtributeError({ name, type: 'category' })

	const result = await categoryRepository.insertCategory({ name })

	return result
}


export {
	listCategories,
	createCategory,
}
