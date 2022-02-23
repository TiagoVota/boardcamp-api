const numericRegex = (minLen, maxLen) => {
	if (!maxLen) maxLen = minLen

	return new RegExp(`^[0-9]{${minLen},${maxLen}}$`)
}


export { 
	numericRegex,
}
