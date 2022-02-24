import connection from '../database/database.js'


const findCategories = async () => {
	const queryStr = `
		SELECT
			*
		FROM
			categories;
	`
	const categoriesResult = await connection.query(queryStr)

	return categoriesResult.rows
}


const findCategoryByName = async ({ name }) => {
	const queryStr = `
		SELECT
			*
		FROM
			categories
		WHERE
			name = $1;
	`
	const queryArgs = [name]
	const categoryResult = await connection.query(queryStr, queryArgs)

	const category = categoryResult.rows[0]

	if (!category) return null
	return category
}


const findCategoryById = async ({ id }) => {
	const queryStr = `
		SELECT
			*
		FROM
			categories
		WHERE
			id = $1;
	`
	const queryArgs = [id]
	const categoryResult = await connection.query(queryStr, queryArgs)

	const category = categoryResult.rows[0]

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
	const categoryResult = await connection.query(queryStr, queryArgs)

	return categoryResult.rows[0]
}


export {
	findCategories,
	findCategoryByName,
	findCategoryById,
	insertCategory,
}
