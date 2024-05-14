export const calcNextRecapDate = (recapeTime: string): Date => {
	const date = new Date();
	date.setHours(Number(recapeTime));
	if (date < new Date()) {
		date.setDate(date.getDate() + 1);
	}
	return date;
};
