import connection from '../database/database.js'


const findCategories = async () => {
	const queryStr = 'SELECT * FROM categories;'
	const categoriesPromise = await connection.query(queryStr)

	return categoriesPromise.rows
}


const findCategoryByName = async ({ name }) => {
	const queryStr = `
		SELECT * FROM categories
			WHERE name = $1;
	`
	const queryArgs = [name]
	const categoryPromise = await connection.query(queryStr, queryArgs)

	const category = categoryPromise.rows[0]

	if (!category) return null
	return category
}


const insertCategory = async ({ name }) => {
	const queryStr = `
		INSERT INTO categories
			(name)
		VALUES
			($1)
		RETURNING
			*;
	`
	const queryArgs = [name]
	const categoryPromise = await connection.query(queryStr, queryArgs)

	return categoryPromise.rows[0]
}


export {
	findCategories,
	findCategoryByName,
	insertCategory,
}
