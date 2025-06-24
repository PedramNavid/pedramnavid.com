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
	const colors = {
		'python': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
		'javascript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
		'typescript': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
		'react': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300',
		'vue': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
		'node': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
		'docker': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
		'postgres': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
		'database': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
		'git': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
		'devops': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
		'web': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300',
		'tutorial': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300',
		'guide': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300',
		'llm': 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-300',
		'ai': 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-300',
		'claude': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
		'v0': 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'
	};
	
	const defaultColor = 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
	return colors[tag.toLowerCase()] || defaultColor;
};
