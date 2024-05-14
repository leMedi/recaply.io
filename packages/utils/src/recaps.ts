export const calcNextRecapDate = (recapTime: string): Date => {
	const date = new Date();
	date.setHours(Number(recapTime));
	if (date < new Date()) {
		date.setDate(date.getDate() + 1);
	}
	return date;
};
