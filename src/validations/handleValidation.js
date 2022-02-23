const validationErrors = ({ objectToValid, objectValidation }) => {
	const objectError = objectValidation.validate(objectToValid).error
	const schemaErrorMsg = objectError?.details?.[0]?.message

	return {
		isValidSchema: !objectError,
		schemaErrorMsg,
	}
}


export {
	validationErrors
}
