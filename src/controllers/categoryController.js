import * as categoryService from '../services/categoryService.js'


const getCategories = async (req, res, next) => {
	const { query: { limit, offset, order, desc } } = req

	try {
		const categories = await categoryService.listCategories({
			limit,
			offset,
			order,
			desc,
		})
		
		return res.status(200).send(categories)

	} catch (error) {		
		next(error)
	}
}


const postCategory = async (req, res, next) => {
	const { body: categoryInfo } = req

	try {
		const categories = await categoryService.createCategory({ categoryInfo })
		
		return res.status(201).send(categories)

	} catch (error) {		
		next(error)
	}
}


export {
	getCategories,
	postCategory,
}
