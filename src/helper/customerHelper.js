const validateUpdate = (searchId, existentCustomer) => {
	const isEqualId = Number(existentCustomer?.id) === Number(searchId)

	return !existentCustomer || isEqualId
}


export {
	validateUpdate,
}
