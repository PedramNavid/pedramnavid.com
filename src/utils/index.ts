import path from "path";
const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const toTitleCase = (str: string) =>
	str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

export const getMonthName = (date: Date) => MONTHS[new Date(date).getMonth()];

export const getSlugFromPathname = (pathname: string) =>
	path.basename(pathname, path.extname(pathname));

export const calculateReadingTime = (text: string): number => {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
};

export const getTagColor = (tag: string): string => {
	// All tags use the same muted cream style for consistency
	return 'bg-cream-200 text-charcoal-muted';
};
