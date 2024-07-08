export const toArray = (value) => {
	let result = [];
	if (Array.isArray(value)) result = value;
	else if (typeof value === 'object')
		result = Object.keys(value).map((key) => value[key]);
	else result.push(value);
	return result;
};
