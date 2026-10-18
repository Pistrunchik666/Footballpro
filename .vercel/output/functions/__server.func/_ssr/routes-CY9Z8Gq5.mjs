import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CY9Z8Gq5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEAGUES = [
	{
		id: "rpl",
		name: "Российская Премьер-Лига",
		short: "РПЛ",
		teams: 16,
		up: 0,
		down: 4
	},
	{
		id: "fnl",
		name: "Первая лига",
		short: "ФНЛ",
		teams: 18,
		up: 2,
		down: 4
	},
	{
		id: "fnl2",
		name: "Вторая лига · дивизион А",
		short: "ФНЛ-2",
		teams: 15,
		up: 2,
		down: 4
	},
	{
		id: "fnl3",
		name: "Вторая лига · дивизион Б",
		short: "ФНЛ-3",
		teams: 37,
		up: 2,
		down: 0
	},
	{
		id: "media",
		name: "Медийная лига",
		short: "Медиа",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "amateur",
		name: "Любители",
		short: "ЛФЛ",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "tur",
		name: "Суперлига Турции",
		short: "Турция",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "bra",
		name: "Серия A Бразилии",
		short: "Бразилия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "ned",
		name: "Эредивизи",
		short: "Голландия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "por",
		name: "Примейра Португалии",
		short: "Португалия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "bel",
		name: "Про-лига Бельгии",
		short: "Бельгия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "gre",
		name: "Суперлига Греции",
		short: "Греция",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "srb",
		name: "Суперлига Сербии",
		short: "Сербия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "pol",
		name: "Экстракласса",
		short: "Польша",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "aut",
		name: "Бундеслига Австрии",
		short: "Австрия",
		teams: 8,
		up: 0,
		down: 0
	},
	{
		id: "den",
		name: "Суперлига Дании",
		short: "Дания",
		teams: 8,
		up: 0,
		down: 0
	}
];
function leagueMeta(id) {
	return LEAGUES.find((l) => l.id === id) ?? {
		id,
		name: "Еврокубки",
		short: "Евро",
		teams: 0,
		up: 0,
		down: 0
	};
}
var CLUBS = [
	{
		id: "zenit",
		name: "Зенит",
		short: "Зенит",
		city: "Санкт-Петербург",
		league: "rpl",
		rep: 92,
		budget: 4200,
		color: "#1d4e89",
		color2: "#7ec8e3",
		stadium: "Газпром Арена",
		capacity: 67800
	},
	{
		id: "krasnodar",
		name: "Краснодар",
		short: "Краснодар",
		city: "Краснодар",
		league: "rpl",
		rep: 86,
		budget: 2400,
		color: "#0d5c38",
		color2: "#d4af37",
		stadium: "Стадион «Краснодар»",
		capacity: 35179
	},
	{
		id: "spartak",
		name: "Спартак",
		short: "Спартак",
		city: "Москва",
		league: "rpl",
		rep: 85,
		budget: 2100,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Лукойл Арена",
		capacity: 45360
	},
	{
		id: "cska",
		name: "ЦСКА",
		short: "ЦСКА",
		city: "Москва",
		league: "rpl",
		rep: 84,
		budget: 1900,
		color: "#d0001a",
		color2: "#1b3a6b",
		stadium: "ВЭБ Арена",
		capacity: 30457
	},
	{
		id: "dynamo",
		name: "Динамо",
		short: "Динамо",
		city: "Москва",
		league: "rpl",
		rep: 82,
		budget: 1700,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "ВТБ Арена",
		capacity: 25716
	},
	{
		id: "loko",
		name: "Локомотив",
		short: "Локомотив",
		city: "Москва",
		league: "rpl",
		rep: 76,
		budget: 980,
		color: "#c8102e",
		color2: "#1f7a3a",
		stadium: "РЖД Арена",
		capacity: 27320
	},
	{
		id: "rubin",
		name: "Рубин",
		short: "Рубин",
		city: "Казань",
		league: "rpl",
		rep: 73,
		budget: 760,
		color: "#0b6b3a",
		color2: "#d4af37",
		stadium: "Ак Барс Арена",
		capacity: 45379
	},
	{
		id: "rostov",
		name: "Ростов",
		short: "Ростов",
		city: "Ростов-на-Дону",
		league: "rpl",
		rep: 71,
		budget: 620,
		color: "#f2c200",
		color2: "#123a8a",
		stadium: "Ростов Арена",
		capacity: 45e3
	},
	{
		id: "krylya",
		name: "Крылья Советов",
		short: "Крылья",
		city: "Самара",
		league: "rpl",
		rep: 69,
		budget: 540,
		color: "#4aa3d8",
		color2: "#0b3a66",
		stadium: "Солидарность Самара Арена",
		capacity: 44918
	},
	{
		id: "akhmat",
		name: "Ахмат",
		short: "Ахмат",
		city: "Грозный",
		league: "rpl",
		rep: 67,
		budget: 480,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Ахмат Арена",
		capacity: 30597
	},
	{
		id: "baltika",
		name: "Балтика",
		short: "Балтика",
		city: "Калининград",
		league: "rpl",
		rep: 66,
		budget: 420,
		color: "#163e86",
		color2: "#ffffff",
		stadium: "Ростех Арена",
		capacity: 35212
	},
	{
		id: "dinmakh",
		name: "Динамо Махачкала",
		short: "Дин. Мх",
		city: "Махачкала",
		league: "rpl",
		rep: 64,
		budget: 300,
		color: "#163e86",
		color2: "#e8eef7",
		stadium: "Стадион «Динамо»",
		capacity: 15200
	},
	{
		id: "orenburg",
		name: "Оренбург",
		short: "Оренбург",
		city: "Оренбург",
		league: "rpl",
		rep: 63,
		budget: 280,
		color: "#123a8a",
		color2: "#f2c200",
		stadium: "Газовик",
		capacity: 10046
	},
	{
		id: "akron",
		name: "Акрон",
		short: "Акрон",
		city: "Тольятти",
		league: "rpl",
		rep: 61,
		budget: 240,
		color: "#111111",
		color2: "#f2c200",
		stadium: "Кристалл",
		capacity: 15300
	},
	{
		id: "rodina",
		name: "Родина",
		short: "Родина",
		city: "Москва",
		league: "rpl",
		rep: 60,
		budget: 210,
		color: "#1a1a1a",
		color2: "#c8102e",
		stadium: "Спартаковец",
		capacity: 5100
	},
	{
		id: "fakel",
		name: "Факел",
		short: "Факел",
		city: "Воронеж",
		league: "rpl",
		rep: 60,
		budget: 200,
		color: "#f26b1f",
		color2: "#1a1a1a",
		stadium: "Центральный",
		capacity: 32120
	},
	{
		id: "nn",
		name: "Пари НН",
		short: "Пари НН",
		city: "Нижний Новгород",
		league: "fnl",
		rep: 63,
		budget: 260,
		color: "#0b3d91",
		color2: "#7ec8e3",
		stadium: "Нижний Новгород",
		capacity: 44899
	},
	{
		id: "sochi",
		name: "Сочи",
		short: "Сочи",
		city: "Сочи",
		league: "fnl",
		rep: 64,
		budget: 280,
		color: "#3d2a78",
		color2: "#ffffff",
		stadium: "Фишт",
		capacity: 47659
	},
	{
		id: "ural",
		name: "Урал",
		short: "Урал",
		city: "Екатеринбург",
		league: "fnl",
		rep: 62,
		budget: 210,
		color: "#f2a900",
		color2: "#1a1a1a",
		stadium: "Екатеринбург Арена",
		capacity: 35e3
	},
	{
		id: "torpedo",
		name: "Торпедо",
		short: "Торпедо",
		city: "Москва",
		league: "fnl",
		rep: 61,
		budget: 190,
		color: "#111111",
		color2: "#1f7a3a",
		stadium: "имени Э. Стрельцова",
		capacity: 13500
	},
	{
		id: "ufa",
		name: "Уфа",
		short: "Уфа",
		city: "Уфа",
		league: "fnl",
		rep: 55,
		budget: 110,
		color: "#6b2d5b",
		color2: "#ffffff",
		stadium: "Нефтяник",
		capacity: 15132
	},
	{
		id: "rotor",
		name: "Ротор",
		short: "Ротор",
		city: "Волгоград",
		league: "fnl",
		rep: 54,
		budget: 100,
		color: "#0b4ea2",
		color2: "#ffffff",
		stadium: "Волгоград Арена",
		capacity: 45568
	},
	{
		id: "arsenal",
		name: "Арсенал",
		short: "Арсенал",
		city: "Тула",
		league: "fnl",
		rep: 53,
		budget: 90,
		color: "#d0001a",
		color2: "#f2c200",
		stadium: "Арсенал",
		capacity: 20048
	},
	{
		id: "shinnik",
		name: "Шинник",
		short: "Шинник",
		city: "Ярославль",
		league: "fnl",
		rep: 51,
		budget: 70,
		color: "#0b3d91",
		color2: "#f2c200",
		stadium: "Шинник",
		capacity: 22990
	},
	{
		id: "skostroma",
		name: "Спартак Кострома",
		short: "Сп. Кострома",
		city: "Кострома",
		league: "fnl",
		rep: 50,
		budget: 55,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 15e3
	},
	{
		id: "enisey",
		name: "Енисей",
		short: "Енисей",
		city: "Красноярск",
		league: "fnl",
		rep: 50,
		budget: 70,
		color: "#0b3d91",
		color2: "#c8102e",
		stadium: "Центральный",
		capacity: 15e3
	},
	{
		id: "chel",
		name: "Челябинск",
		short: "Челябинск",
		city: "Челябинск",
		league: "fnl",
		rep: 48,
		budget: 48,
		color: "#1c1c1c",
		color2: "#f2c200",
		stadium: "Центральный",
		capacity: 15e3
	},
	{
		id: "veles",
		name: "Велес",
		short: "Велес",
		city: "Москва",
		league: "fnl",
		rep: 48,
		budget: 42,
		color: "#163e86",
		color2: "#ffffff",
		stadium: "Авангард",
		capacity: 4e3
	},
	{
		id: "neftekhimik",
		name: "Нефтехимик",
		short: "Нефтехимик",
		city: "Нижнекамск",
		league: "fnl",
		rep: 46,
		budget: 40,
		color: "#f37021",
		color2: "#1a1a1a",
		stadium: "Нефтехимик",
		capacity: 3200
	},
	{
		id: "kamaz",
		name: "КАМАЗ",
		short: "КАМАЗ",
		city: "Набережные Челны",
		league: "fnl",
		rep: 46,
		budget: 44,
		color: "#009639",
		color2: "#ffffff",
		stadium: "КАМАЗ",
		capacity: 6500
	},
	{
		id: "volga",
		name: "Волга",
		short: "Волга",
		city: "Ульяновск",
		league: "fnl",
		rep: 45,
		budget: 36,
		color: "#1f4e79",
		color2: "#ffffff",
		stadium: "Труд",
		capacity: 1e4
	},
	{
		id: "leningradets",
		name: "Ленинградец",
		short: "Ленинградец",
		city: "Ленинградская обл.",
		league: "fnl",
		rep: 44,
		budget: 32,
		color: "#1b4f9c",
		color2: "#ffffff",
		stadium: "Кировец",
		capacity: 3500
	},
	{
		id: "ska",
		name: "СКА-Хабаровск",
		short: "СКА",
		city: "Хабаровск",
		league: "fnl",
		rep: 44,
		budget: 38,
		color: "#c8102e",
		color2: "#1b3a6b",
		stadium: "имени Ленина",
		capacity: 15200
	},
	{
		id: "tekstil",
		name: "Текстильщик",
		short: "Текстильщик",
		city: "Иваново",
		league: "fnl",
		rep: 42,
		budget: 24,
		color: "#111111",
		color2: "#f5d000",
		stadium: "Текстильщик",
		capacity: 9565
	},
	{
		id: "alania",
		name: "Алания",
		short: "Алания",
		city: "Владикавказ",
		league: "fnl2",
		rep: 50,
		budget: 48,
		color: "#c8102e",
		color2: "#f2c200",
		stadium: "Республиканский «Спартак»",
		capacity: 32464
	},
	{
		id: "chernomorets",
		name: "Черноморец",
		short: "Черноморец",
		city: "Новороссийск",
		league: "fnl2",
		rep: 49,
		budget: 42,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 12500
	},
	{
		id: "tyumen",
		name: "Тюмень",
		short: "Тюмень",
		city: "Тюмень",
		league: "fnl2",
		rep: 46,
		budget: 30,
		color: "#111111",
		color2: "#ffffff",
		stadium: "Геолог",
		capacity: 13057
	},
	{
		id: "amkar",
		name: "Амкар",
		short: "Амкар",
		city: "Пермь",
		league: "fnl2",
		rep: 47,
		budget: 32,
		color: "#c8102e",
		color2: "#111111",
		stadium: "Звезда",
		capacity: 17e3
	},
	{
		id: "sibir",
		name: "Сибирь",
		short: "Сибирь",
		city: "Новосибирск",
		league: "fnl2",
		rep: 45,
		budget: 26,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Спартак",
		capacity: 12100
	},
	{
		id: "volgar",
		name: "Волгарь",
		short: "Волгарь",
		city: "Астрахань",
		league: "fnl2",
		rep: 44,
		budget: 22,
		color: "#0b6b3a",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 18e3
	},
	{
		id: "sokol",
		name: "Сокол",
		short: "Сокол",
		city: "Саратов",
		league: "fnl2",
		rep: 44,
		budget: 22,
		color: "#5b1a28",
		color2: "#ffffff",
		stadium: "Локомотив",
		capacity: 15e3
	},
	{
		id: "mashuk",
		name: "Машук-КМВ",
		short: "Машук",
		city: "Пятигорск",
		league: "fnl2",
		rep: 43,
		budget: 18,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 10400
	},
	{
		id: "dkirov",
		name: "Динамо Киров",
		short: "Дин. Киров",
		city: "Киров",
		league: "fnl2",
		rep: 42,
		budget: 16,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Россия",
		capacity: 2500
	},
	{
		id: "dbrian",
		name: "Динамо-Брянск",
		short: "Дин. Брянск",
		city: "Брянск",
		league: "fnl2",
		rep: 41,
		budget: 14,
		color: "#0b3d91",
		color2: "#c8102e",
		stadium: "Динамо",
		capacity: 10100
	},
	{
		id: "dvlad",
		name: "Динамо Владивосток",
		short: "Дин. Влад",
		city: "Владивосток",
		league: "fnl2",
		rep: 42,
		budget: 16,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Динамо",
		capacity: 10200
	},
	{
		id: "dstav",
		name: "Динамо Ставрополь",
		short: "Дин. Став",
		city: "Ставрополь",
		league: "fnl2",
		rep: 43,
		budget: 18,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Динамо",
		capacity: 16e3
	},
	{
		id: "tmiass",
		name: "Торпедо Миасс",
		short: "Торп. Миасс",
		city: "Миасс",
		league: "fnl2",
		rep: 40,
		budget: 12,
		color: "#111111",
		color2: "#1f7a3a",
		stadium: "Труд",
		capacity: 3e3
	},
	{
		id: "irtysh",
		name: "Иртыш",
		short: "Иртыш",
		city: "Омск",
		league: "fnl2",
		rep: 42,
		budget: 15,
		color: "#111111",
		color2: "#ffffff",
		stadium: "Красная Звезда",
		capacity: 4500
	},
	{
		id: "kaluga",
		name: "Калуга",
		short: "Калуга",
		city: "Калуга",
		league: "fnl2",
		rep: 39,
		budget: 10,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Арена Химик",
		capacity: 3e3
	},
	{
		id: "sevastopol",
		name: "Севастополь",
		short: "Севастополь",
		city: "Севастополь",
		league: "fnl3",
		rep: 40,
		budget: 14,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "СКС",
		capacity: 5800
	},
	{
		id: "shahtar",
		name: "Шахтёр",
		short: "Шахтёр",
		city: "Таганрог",
		league: "fnl3",
		rep: 36,
		budget: 8,
		color: "#f26b1f",
		color2: "#111111",
		stadium: "Торпедо",
		capacity: 5e3
	},
	{
		id: "pobeda",
		name: "Победа",
		short: "Победа",
		city: "Хасавюрт",
		league: "fnl3",
		rep: 35,
		budget: 7,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 4e3
	},
	{
		id: "nart",
		name: "Нарт",
		short: "Нарт",
		city: "Черкесск",
		league: "fnl3",
		rep: 35,
		budget: 7,
		color: "#c8102e",
		color2: "#1f7a3a",
		stadium: "Нарт",
		capacity: 3500
	},
	{
		id: "murom",
		name: "Муром",
		short: "Муром",
		city: "Муром",
		league: "fnl3",
		rep: 37,
		budget: 8,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Локомотив",
		capacity: 3500
	},
	{
		id: "dinspb",
		name: "Динамо СПб",
		short: "Дин. СПб",
		city: "Санкт-Петербург",
		league: "fnl3",
		rep: 38,
		budget: 10,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Петровский",
		capacity: 21e3
	},
	{
		id: "chertanovo",
		name: "Чертаново",
		short: "Чертаново",
		city: "Москва",
		league: "fnl3",
		rep: 37,
		budget: 9,
		color: "#111111",
		color2: "#ffffff",
		stadium: "Арена Чертаново",
		capacity: 2e3
	},
	{
		id: "luki",
		name: "Луки-Энергия",
		short: "Луки",
		city: "Великие Луки",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#f2c200",
		color2: "#111111",
		stadium: "Экспресс",
		capacity: 4e3
	},
	{
		id: "tver",
		name: "Тверь",
		short: "Тверь",
		city: "Тверь",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Химик",
		capacity: 7900
	},
	{
		id: "stambov",
		name: "Спартак Тамбов",
		short: "Сп. Тамбов",
		city: "Тамбов",
		league: "fnl3",
		rep: 36,
		budget: 8,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Спартак",
		capacity: 16e3
	},
	{
		id: "salut",
		name: "Салют",
		short: "Салют",
		city: "Белгород",
		league: "fnl3",
		rep: 35,
		budget: 7,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Салют",
		capacity: 12e3
	},
	{
		id: "ryazan",
		name: "Рязань",
		short: "Рязань",
		city: "Рязань",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#f2c200",
		color2: "#111111",
		stadium: "ЦСК",
		capacity: 2500
	},
	{
		id: "metallurg",
		name: "Металлург",
		short: "Металлург",
		city: "Липецк",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#f26b1f",
		color2: "#111111",
		stadium: "Металлург",
		capacity: 11e3
	},
	{
		id: "orel",
		name: "Орёл",
		short: "Орёл",
		city: "Орёл",
		league: "fnl3",
		rep: 32,
		budget: 5,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 14e3
	},
	{
		id: "zpenza",
		name: "Зенит Пенза",
		short: "Зен. Пенза",
		city: "Пенза",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#1d4e89",
		color2: "#7ec8e3",
		stadium: "Первомайский",
		capacity: 5e3
	},
	{
		id: "avangard",
		name: "Авангард",
		short: "Авангард",
		city: "Курск",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Труд",
		capacity: 11e3
	}
];
var DERBIES = /* @__PURE__ */ new Set([
	"spartak-cska",
	"cska-spartak",
	"spartak-dynamo",
	"dynamo-spartak",
	"cska-dynamo",
	"dynamo-cska",
	"spartak-loko",
	"loko-spartak",
	"zenit-spartak",
	"spartak-zenit",
	"krasnodar-rostov",
	"rostov-krasnodar",
	"rubin-akhmat",
	"akhmat-rubin",
	"kamaz-neftekhimik",
	"neftekhimik-kamaz"
]);
var FORMATIONS = {
	"4-3-3": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DL",
			x: 14,
			y: 68
		},
		{
			pos: "DC",
			x: 37,
			y: 72
		},
		{
			pos: "DC",
			x: 63,
			y: 72
		},
		{
			pos: "DR",
			x: 86,
			y: 68
		},
		{
			pos: "MC",
			x: 26,
			y: 48
		},
		{
			pos: "MC",
			x: 50,
			y: 52
		},
		{
			pos: "MC",
			x: 74,
			y: 48
		},
		{
			pos: "ML",
			x: 18,
			y: 24
		},
		{
			pos: "ST",
			x: 50,
			y: 16
		},
		{
			pos: "MR",
			x: 82,
			y: 24
		}
	],
	"4-2-3-1": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DL",
			x: 14,
			y: 70
		},
		{
			pos: "DC",
			x: 37,
			y: 74
		},
		{
			pos: "DC",
			x: 63,
			y: 74
		},
		{
			pos: "DR",
			x: 86,
			y: 70
		},
		{
			pos: "DM",
			x: 36,
			y: 54
		},
		{
			pos: "DM",
			x: 64,
			y: 54
		},
		{
			pos: "ML",
			x: 18,
			y: 34
		},
		{
			pos: "AM",
			x: 50,
			y: 32
		},
		{
			pos: "MR",
			x: 82,
			y: 34
		},
		{
			pos: "ST",
			x: 50,
			y: 14
		}
	],
	"4-4-2": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DL",
			x: 14,
			y: 70
		},
		{
			pos: "DC",
			x: 37,
			y: 74
		},
		{
			pos: "DC",
			x: 63,
			y: 74
		},
		{
			pos: "DR",
			x: 86,
			y: 70
		},
		{
			pos: "ML",
			x: 16,
			y: 46
		},
		{
			pos: "MC",
			x: 38,
			y: 50
		},
		{
			pos: "MC",
			x: 62,
			y: 50
		},
		{
			pos: "MR",
			x: 84,
			y: 46
		},
		{
			pos: "ST",
			x: 38,
			y: 20
		},
		{
			pos: "ST",
			x: 62,
			y: 20
		}
	],
	"3-5-2": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DC",
			x: 24,
			y: 72
		},
		{
			pos: "DC",
			x: 50,
			y: 76
		},
		{
			pos: "DC",
			x: 76,
			y: 72
		},
		{
			pos: "ML",
			x: 12,
			y: 48
		},
		{
			pos: "DM",
			x: 34,
			y: 52
		},
		{
			pos: "MC",
			x: 50,
			y: 42
		},
		{
			pos: "DM",
			x: 66,
			y: 52
		},
		{
			pos: "MR",
			x: 88,
			y: 48
		},
		{
			pos: "ST",
			x: 38,
			y: 18
		},
		{
			pos: "ST",
			x: 62,
			y: 18
		}
	],
	"5-3-2": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DL",
			x: 10,
			y: 62
		},
		{
			pos: "DC",
			x: 30,
			y: 74
		},
		{
			pos: "DC",
			x: 50,
			y: 78
		},
		{
			pos: "DC",
			x: 70,
			y: 74
		},
		{
			pos: "DR",
			x: 90,
			y: 62
		},
		{
			pos: "MC",
			x: 28,
			y: 46
		},
		{
			pos: "DM",
			x: 50,
			y: 50
		},
		{
			pos: "MC",
			x: 72,
			y: 46
		},
		{
			pos: "ST",
			x: 38,
			y: 18
		},
		{
			pos: "ST",
			x: 62,
			y: 18
		}
	],
	"4-1-4-1": [
		{
			pos: "GK",
			x: 50,
			y: 88
		},
		{
			pos: "DL",
			x: 14,
			y: 70
		},
		{
			pos: "DC",
			x: 37,
			y: 74
		},
		{
			pos: "DC",
			x: 63,
			y: 74
		},
		{
			pos: "DR",
			x: 86,
			y: 70
		},
		{
			pos: "DM",
			x: 50,
			y: 56
		},
		{
			pos: "ML",
			x: 16,
			y: 38
		},
		{
			pos: "MC",
			x: 38,
			y: 42
		},
		{
			pos: "MC",
			x: 62,
			y: 42
		},
		{
			pos: "MR",
			x: 84,
			y: 38
		},
		{
			pos: "ST",
			x: 50,
			y: 16
		}
	]
};
var POS_RU = {
	GK: "ВРТ",
	DR: "ПЗ",
	DL: "ЛЗ",
	DC: "ЦЗ",
	DM: "ОП",
	MC: "ЦП",
	AM: "АП",
	MR: "ПП",
	ML: "ЛП",
	ST: "ФР"
};
var POS_LONG = {
	GK: "Вратарь",
	DR: "Правый защитник",
	DL: "Левый защитник",
	DC: "Центральный защитник",
	DM: "Опорный полузащитник",
	MC: "Центральный полузащитник",
	AM: "Атакующий полузащитник",
	MR: "Правый полузащитник",
	ML: "Левый полузащитник",
	ST: "Нападающий"
};
var FIT = {
	GK: { GK: 1 },
	DR: {
		DR: 1,
		DC: .62,
		MR: .55,
		DM: .4
	},
	DL: {
		DL: 1,
		DC: .62,
		ML: .55,
		DM: .4
	},
	DC: {
		DC: 1,
		DR: .55,
		DL: .55,
		DM: .48
	},
	DM: {
		DM: 1,
		MC: .78,
		DC: .5,
		AM: .4
	},
	MC: {
		MC: 1,
		DM: .75,
		AM: .72,
		MR: .5,
		ML: .5
	},
	AM: {
		AM: 1,
		MC: .7,
		ST: .62,
		MR: .55,
		ML: .55
	},
	MR: {
		MR: 1,
		ML: .72,
		AM: .6,
		ST: .5,
		DR: .4
	},
	ML: {
		ML: 1,
		MR: .72,
		AM: .6,
		ST: .5,
		DL: .4
	},
	ST: {
		ST: 1,
		AM: .55,
		MR: .42,
		ML: .42
	}
};
function fit(player, slot) {
	return FIT[player][slot] ?? .28;
}
function wageCap(rep) {
	return Math.round(rep * rep * 9);
}
function clubById(clubs, id) {
	return clubs.find((c) => c.id === id);
}
var STYLES = [
	{
		id: "tiki",
		name: "Тики-така",
		mentality: 1,
		press: 3,
		tempo: 1,
		line: 3,
		width: 2
	},
	{
		id: "bus",
		name: "Автобус",
		mentality: -2,
		press: 0,
		tempo: 1,
		line: 0,
		width: 1
	},
	{
		id: "counter",
		name: "Контратака",
		mentality: -1,
		press: 1,
		tempo: 4,
		line: 1,
		width: 3
	},
	{
		id: "direct",
		name: "Прямой футбол",
		mentality: 0,
		press: 2,
		tempo: 3,
		line: 2,
		width: 2
	},
	{
		id: "gegen",
		name: "Гегенпрессинг",
		mentality: 2,
		press: 4,
		tempo: 4,
		line: 4,
		width: 2
	},
	{
		id: "wing",
		name: "Фланги",
		mentality: 1,
		press: 2,
		tempo: 3,
		line: 2,
		width: 4
	},
	{
		id: "vertical",
		name: "Вертикальный",
		mentality: 1,
		press: 3,
		tempo: 4,
		line: 3,
		width: 1
	}
];
var FORMS = [
	"4-3-3",
	"4-2-3-1",
	"4-4-2",
	"3-5-2",
	"5-3-2",
	"4-1-4-1"
];
function hash$1(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function styleById(id) {
	return STYLES.find((s) => s.id === id) ?? STYLES[0];
}
function styleOf(clubId) {
	const base = STYLES[hash$1(clubId + ":style") % STYLES.length];
	const formation = FORMS[hash$1(clubId + ":form") % FORMS.length];
	return {
		...base,
		formation
	};
}
function clubTactics(clubId) {
	const s = styleOf(clubId);
	return {
		formation: s.formation,
		slots: [],
		mentality: s.mentality,
		press: s.press,
		tempo: s.tempo,
		line: s.line,
		width: s.width,
		style: s.id
	};
}
function shapeSlot(slot, t) {
	const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
	if (slot.pos === "GK") return {
		x: 50,
		y: clamp(88 - (t.line - 2) * 1.1, 80, 92)
	};
	const wide = slot.pos === "DL" || slot.pos === "DR" || slot.pos === "ML" || slot.pos === "MR";
	const side = slot.x < 48 ? -1 : slot.x > 52 ? 1 : 0;
	const x = clamp(slot.x + side * (t.width - 2) * (wide ? 4.4 : 1.3), 8, 92);
	const push = (t.line - 2) * (slot.pos === "ST" ? 1.6 : 3.1) + t.mentality * 2.4 + Math.max(0, t.press - 2) * (slot.pos === "MC" || slot.pos === "DM" || slot.pos === "AM" ? 1.8 : .4);
	return {
		x,
		y: clamp(slot.y - push, 8, 86)
	};
}
function shapeText(t) {
	return `${[
		"Команда села глубоко",
		"Осторожный блок",
		"Ровная расстановка",
		"Смещение вперёд",
		"Все линии в атаке"
	][t.mentality + 2] ?? "Баланс"}, ${[
		"очень низкая линия",
		"низкая линия",
		"средняя линия",
		"высокая линия",
		"линия у чужой штрафной"
	][t.line] ?? "средняя линия"}, ${[
		"фланги узко",
		"чуть уже",
		"обычная ширина",
		"широко",
		"крайние у бровки"
	][t.width] ?? "обычная ширина"}.`;
}
function c(p) {
	return p;
}
var EXTRA = [
	c({
		id: "chayka",
		name: "Чайка",
		short: "Чайка",
		city: "Песчанокопское",
		league: "fnl3",
		rep: 36,
		budget: 7,
		color: "#1f7a3a",
		color2: "#f2c200",
		stadium: "Центральный",
		capacity: 3e3
	}),
	c({
		id: "rostov2",
		name: "Ростов-2",
		short: "Ростов-2",
		city: "Ростов-на-Дону",
		league: "fnl3",
		rep: 36,
		budget: 8,
		color: "#f2c200",
		color2: "#123a8a",
		stadium: "Олимп",
		capacity: 15e3
	}),
	c({
		id: "yalta",
		name: "Рубин Ялта",
		short: "Рубин Я.",
		city: "Ялта",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#6b1d2a",
		color2: "#f4f1ea",
		stadium: "Авангард",
		capacity: 7e3
	}),
	c({
		id: "druzhba",
		name: "Дружба",
		short: "Дружба",
		city: "Майкоп",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#1f7a3a",
		color2: "#f2c200",
		stadium: "Дружба",
		capacity: 8e3
	}),
	c({
		id: "angust",
		name: "Ангушт",
		short: "Ангушт",
		city: "Назрань",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 3200
	}),
	c({
		id: "astrakhan",
		name: "Астрахань",
		short: "Астрахань",
		city: "Астрахань",
		league: "fnl3",
		rep: 32,
		budget: 5,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Центральный",
		capacity: 15e3
	}),
	c({
		id: "kyzyl",
		name: "Кызылташ",
		short: "Кызылташ",
		city: "Бахчисарай",
		league: "fnl3",
		rep: 31,
		budget: 4,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Дружба",
		capacity: 4500
	}),
	c({
		id: "nalchik",
		name: "Спартак-Нальчик",
		short: "Сп. Нальчик",
		city: "Нальчик",
		league: "fnl3",
		rep: 35,
		budget: 6,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Спартак",
		capacity: 14e3
	}),
	c({
		id: "zarya",
		name: "Заря",
		short: "Заря",
		city: "Абрамовка",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#111111",
		color2: "#ffffff",
		stadium: "Авангард",
		capacity: 4e3
	}),
	c({
		id: "iskra",
		name: "Искра",
		short: "Искра",
		city: "Смоленск",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Спартак",
		capacity: 12500
	}),
	c({
		id: "kosmos",
		name: "Космос",
		short: "Космос",
		city: "Долгопрудный",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#163e86",
		color2: "#ffffff",
		stadium: "Салют",
		capacity: 3e3
	}),
	c({
		id: "volna",
		name: "Волна",
		short: "Волна",
		city: "Ковернино",
		league: "fnl3",
		rep: 31,
		budget: 4,
		color: "#0b6b8a",
		color2: "#ffffff",
		stadium: "Волна",
		capacity: 1500
	}),
	c({
		id: "rodinam",
		name: "Родина-М",
		short: "Родина-М",
		city: "Москва",
		league: "fnl3",
		rep: 35,
		budget: 7,
		color: "#1a1a1a",
		color2: "#c8102e",
		stadium: "Спартаковец",
		capacity: 5100
	}),
	c({
		id: "shumbrat",
		name: "Шумбрат",
		short: "Шумбрат",
		city: "Саранск",
		league: "fnl3",
		rep: 30,
		budget: 4,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Старт",
		capacity: 7500
	}),
	c({
		id: "ska2",
		name: "СКА-2",
		short: "СКА-2",
		city: "Хабаровск",
		league: "fnl3",
		rep: 32,
		budget: 5,
		color: "#c8102e",
		color2: "#1b3a6b",
		stadium: "Ленина",
		capacity: 15200
	}),
	c({
		id: "kvant",
		name: "Квант",
		short: "Квант",
		city: "Обнинск",
		league: "fnl3",
		rep: 31,
		budget: 4,
		color: "#0b3d91",
		color2: "#f2c200",
		stadium: "Труд",
		capacity: 3e3
	}),
	c({
		id: "kdv",
		name: "КДВ",
		short: "КДВ",
		city: "Томск",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#1f7a3a",
		color2: "#ffffff",
		stadium: "Труд",
		capacity: 13e3
	}),
	c({
		id: "dbarnaul",
		name: "Динамо Барнаул",
		short: "Дин. Барнаул",
		city: "Барнаул",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Динамо",
		capacity: 16e3
	}),
	c({
		id: "izhevsk",
		name: "Ижевск",
		short: "Ижевск",
		city: "Ижевск",
		league: "fnl3",
		rep: 32,
		budget: 5,
		color: "#c8102e",
		color2: "#1a1a1a",
		stadium: "Центральный",
		capacity: 18e3
	}),
	c({
		id: "khimik",
		name: "Химик",
		short: "Химик",
		city: "Дзержинск",
		league: "fnl3",
		rep: 33,
		budget: 5,
		color: "#f26b1f",
		color2: "#111111",
		stadium: "Химик",
		capacity: 1e4
	}),
	c({
		id: "saturn",
		name: "Сатурн",
		short: "Сатурн",
		city: "Раменское",
		league: "fnl3",
		rep: 34,
		budget: 6,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Сатурн",
		capacity: 16e3
	}),
	c({
		id: "d2rots",
		name: "2Drots",
		short: "2Drots",
		city: "Москва",
		league: "media",
		rep: 48,
		budget: 40,
		color: "#111111",
		color2: "#f5d000",
		stadium: "Арена",
		capacity: 4e3
	}),
	c({
		id: "amkal",
		name: "Амкал",
		short: "Амкал",
		city: "Москва",
		league: "media",
		rep: 46,
		budget: 28,
		color: "#f4f1ea",
		color2: "#111111",
		stadium: "Арена",
		capacity: 3e3
	}),
	c({
		id: "broke",
		name: "Broke Boys",
		short: "Broke",
		city: "Москва",
		league: "media",
		rep: 45,
		budget: 26,
		color: "#6b2d5b",
		color2: "#ffffff",
		stadium: "Арена",
		capacity: 2500
	}),
	c({
		id: "fk10",
		name: "ФК 10",
		short: "ФК 10",
		city: "Москва",
		league: "media",
		rep: 44,
		budget: 22,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Арена",
		capacity: 2e3
	}),
	c({
		id: "fight",
		name: "Fight Nights",
		short: "Fight",
		city: "Москва",
		league: "media",
		rep: 40,
		budget: 16,
		color: "#111111",
		color2: "#c8102e",
		stadium: "Арена",
		capacity: 2e3
	}),
	c({
		id: "matchtv",
		name: "ФК Матч",
		short: "Матч",
		city: "Москва",
		league: "media",
		rep: 38,
		budget: 12,
		color: "#e10600",
		color2: "#ffffff",
		stadium: "Арена",
		capacity: 1500
	}),
	c({
		id: "lit",
		name: "Lit Energy",
		short: "Lit",
		city: "Москва",
		league: "media",
		rep: 42,
		budget: 18,
		color: "#b6ff3b",
		color2: "#111111",
		stadium: "Арена",
		capacity: 1500
	}),
	c({
		id: "rodmedia",
		name: "Родина Медиа",
		short: "Род. Медиа",
		city: "Москва",
		league: "media",
		rep: 41,
		budget: 16,
		color: "#1a1a1a",
		color2: "#d6a85c",
		stadium: "Спартаковец",
		capacity: 5100
	}),
	c({
		id: "kolomna",
		name: "Коломна",
		short: "Коломна",
		city: "Коломна",
		league: "amateur",
		rep: 28,
		budget: 3,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Авангард",
		capacity: 8e3
	}),
	c({
		id: "zorkiy",
		name: "Зоркий",
		short: "Зоркий",
		city: "Красногорск",
		league: "amateur",
		rep: 29,
		budget: 3,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Зоркий",
		capacity: 8e3
	}),
	c({
		id: "znamya",
		name: "Знамя Труда",
		short: "Знамя",
		city: "Орехово-Зуево",
		league: "amateur",
		rep: 27,
		budget: 2,
		color: "#c8102e",
		color2: "#1a1a1a",
		stadium: "Знамя Труда",
		capacity: 7e3
	}),
	c({
		id: "torpvlad",
		name: "Торпедо Владимир",
		short: "Торп. Вл",
		city: "Владимир",
		league: "amateur",
		rep: 30,
		budget: 4,
		color: "#111111",
		color2: "#ffffff",
		stadium: "Торпедо",
		capacity: 18e3
	}),
	c({
		id: "dvol",
		name: "Динамо Вологда",
		short: "Дин. Вологда",
		city: "Вологда",
		league: "amateur",
		rep: 28,
		budget: 3,
		color: "#0b3d91",
		color2: "#ffffff",
		stadium: "Динамо",
		capacity: 1e4
	}),
	c({
		id: "sakhalin",
		name: "Сахалинец",
		short: "Сахалинец",
		city: "Южно-Сахалинск",
		league: "amateur",
		rep: 26,
		budget: 2,
		color: "#0b3d91",
		color2: "#f2c200",
		stadium: "Спартак",
		capacity: 4e3
	}),
	c({
		id: "peresvet",
		name: "Пересвет",
		short: "Пересвет",
		city: "Домодедово",
		league: "amateur",
		rep: 27,
		budget: 2,
		color: "#1f4e79",
		color2: "#ffffff",
		stadium: "Авангард",
		capacity: 3e3
	}),
	c({
		id: "zvezda",
		name: "Звезда",
		short: "Звезда",
		city: "Санкт-Петербург",
		league: "amateur",
		rep: 29,
		budget: 3,
		color: "#c8102e",
		color2: "#ffffff",
		stadium: "Кировец",
		capacity: 3500
	})
];
var PACKS = {
	tur: {
		nat: "Турция",
		first: [
			"Керем",
			"Орхун",
			"Барыш",
			"Хакан",
			"Юсуф",
			"Эмре",
			"Джан",
			"Мерт",
			"Бурак",
			"Семих"
		],
		last: [
			"Йылмаз",
			"Демир",
			"Кая",
			"Шен",
			"Айдын",
			"Коч",
			"Полат",
			"Аслан",
			"Эрдоган",
			"Челик"
		]
	},
	bra: {
		nat: "Бразилия",
		first: [
			"Рафаэл",
			"Бруно",
			"Габриэл",
			"Лукас",
			"Тиаго",
			"Фелипе",
			"Ренан",
			"Кайо",
			"Эдер",
			"Витор"
		],
		last: [
			"Силва",
			"Сантос",
			"Оливейра",
			"Соуза",
			"Перейра",
			"Коста",
			"Алвес",
			"Рибейро",
			"Феррейра",
			"Кардозо"
		]
	},
	ned: {
		nat: "Нидерланды",
		first: [
			"Дензел",
			"Теун",
			"Коэн",
			"Йоррит",
			"Милан",
			"Бас",
			"Тим",
			"Люк",
			"Свен",
			"Брайан"
		],
		last: [
			"Де Йонг",
			"Ван Дейк",
			"Берг",
			"Смит",
			"Янсен",
			"Виссер",
			"Де Вит",
			"Мейер",
			"Бос",
			"Хендрикс"
		]
	},
	por: {
		nat: "Португалия",
		first: [
			"Диого",
			"Гонсалу",
			"Жоау",
			"Педру",
			"Андре",
			"Бернарду",
			"Нуну",
			"Тьягу",
			"Рубен",
			"Рафаэл"
		],
		last: [
			"Силва",
			"Фернандеш",
			"Кошта",
			"Перейра",
			"Соуза",
			"Оливейра",
			"Карвалью",
			"Родригеш",
			"Гомеш",
			"Алмейда"
		]
	},
	bel: {
		nat: "Бельгия",
		first: [
			"Янник",
			"Лоик",
			"Дрис",
			"Тома",
			"Николя",
			"Себастьен",
			"Максим",
			"Артур",
			"Юго",
			"Кевин"
		],
		last: [
			"Де Брейне",
			"Вермален",
			"Лукаку",
			"Витсель",
			"Карраско",
			"Мертенс",
			"Дендонкер",
			"Онана",
			"Троссард",
			"Башуайи"
		]
	},
	gre: {
		nat: "Греция",
		first: [
			"Йоргос",
			"Костас",
			"Димитрис",
			"Никос",
			"Василис",
			"Панайотис",
			"Андреас",
			"Христос",
			"Ставрос",
			"Антонис"
		],
		last: [
			"Папас",
			"Николау",
			"Петрос",
			"Алексис",
			"Маврос",
			"Караис",
			"Спирос",
			"Леонидас",
			"Теодорос",
			"Пападопулос"
		]
	},
	srb: {
		nat: "Сербия",
		first: [
			"Душан",
			"Никола",
			"Лука",
			"Стефан",
			"Александар",
			"Марко",
			"Неманья",
			"Филип",
			"Андрия",
			"Страхинья"
		],
		last: [
			"Йович",
			"Петрович",
			"Ковач",
			"Илич",
			"Савич",
			"Митрович",
			"Тадич",
			"Влахович",
			"Максимович",
			"Гудель"
		]
	},
	pol: {
		nat: "Польша",
		first: [
			"Роберт",
			"Пётр",
			"Камиль",
			"Якуб",
			"Маттеуш",
			"Аркадиуш",
			"Кшиштоф",
			"Бартош",
			"Павел",
			"Войцех"
		],
		last: [
			"Левандовски",
			"Зелински",
			"Ковнацкий",
			"Модэр",
			"Кашпшак",
			"Гросицки",
			"Пёнтек",
			"Беднарек",
			"Шиманьски",
			"Урбаньски"
		]
	},
	aut: {
		nat: "Австрия",
		first: [
			"Марсель",
			"Давид",
			"Конрад",
			"Кристоф",
			"Штефан",
			"Михаэль",
			"Флориан",
			"Марко",
			"Александр",
			"Юлиан"
		],
		last: [
			"Забитцер",
			"Алаба",
			"Лаймер",
			"Баумгартнер",
			"Шлагер",
			"Гриллitsch",
			"Калайнц",
			"Арнаутович",
			"Дансо",
			"Виммер"
		]
	},
	den: {
		nat: "Дания",
		first: [
			"Кристиан",
			"Расмус",
			"Миккель",
			"Каспер",
			"Пьер",
			"Йонас",
			"Андреас",
			"Матиас",
			"Виктор",
			"Йеспер"
		],
		last: [
			"Эриксен",
			"Хёйбьерг",
			"Дамсгор",
			"Дольберг",
			"Кьер",
			"Кристенсен",
			"Сков",
			"Йенсен",
			"Поульсен",
			"Винд"
		]
	},
	euro: {
		nat: "Франция",
		first: [
			"Килиан",
			"Османе",
			"Орельен",
			"Тео",
			"Варрен",
			"Жюль",
			"Эдуардо",
			"Бруну",
			"Лука",
			"Федерико"
		],
		last: [
			"Мбаппе",
			"Дембеле",
			"Чуамени",
			"Эрнандес",
			"Заир-Эмери",
			"Кунде",
			"Камавинга",
			"Гимарайнш",
			"Модрич",
			"Вальверде"
		]
	}
};
function row(id, name, short, city, league, rep, budget, color, color2) {
	return {
		id,
		name,
		short,
		city,
		league,
		rep,
		budget,
		color,
		color2,
		stadium: name,
		capacity: 4e4
	};
}
var FOREIGN$1 = [
	row("gala", "Галатасарай", "Галатасарай", "Турция", "tur", 84, 900, "#f2c200", "#c8102e"),
	row("fener", "Фенербахче", "Фенербахче", "Турция", "tur", 82, 780, "#0b3d91", "#f2c200"),
	row("besiktas", "Бешикташ", "Бешикташ", "Турция", "tur", 76, 420, "#111111", "#ffffff"),
	row("trabzon", "Трабзонспор", "Трабзон", "Турция", "tur", 74, 300, "#6b1d2a", "#7ec8e3"),
	row("basaksehir", "Истанбул Башакшехир", "Башакшехир", "Турция", "tur", 70, 180, "#f26b1f", "#111111"),
	row("antalya", "Антальяспор", "Анталья", "Турция", "tur", 66, 90, "#c8102e", "#ffffff"),
	row("kasimpasa", "Касымпаша", "Касымпаша", "Турция", "tur", 64, 70, "#0b3d91", "#ffffff"),
	row("alanya", "Аланьяспор", "Аланья", "Турция", "tur", 63, 60, "#f26b1f", "#1f7a3a"),
	row("flamengo", "Фламенго", "Фламенго", "Бразилия", "bra", 86, 1100, "#c8102e", "#111111"),
	row("palmeiras", "Палмейрас", "Палмейрас", "Бразилия", "bra", 85, 980, "#1f7a3a", "#ffffff"),
	row("fluminense", "Флуминенсе", "Флуминенсе", "Бразилия", "bra", 78, 420, "#6b1d2a", "#1f7a3a"),
	row("corinthians", "Коринтианс", "Коринтианс", "Бразилия", "bra", 77, 400, "#111111", "#ffffff"),
	row("saopaulo", "Сан-Паулу", "Сан-Паулу", "Бразилия", "bra", 76, 360, "#c8102e", "#111111"),
	row("gremio", "Гремио", "Гремио", "Бразилия", "bra", 74, 280, "#7ec8e3", "#111111"),
	row("interrs", "Интернасьонал", "Интер РС", "Бразилия", "bra", 75, 300, "#c8102e", "#ffffff"),
	row("atleticomg", "Атлетико Минейро", "Атл. Минейро", "Бразилия", "bra", 76, 320, "#111111", "#ffffff"),
	row("ajax", "Аякс", "Аякс", "Нидерланды", "ned", 80, 520, "#c8102e", "#ffffff"),
	row("psv", "ПСВ", "ПСВ", "Нидерланды", "ned", 82, 640, "#c8102e", "#ffffff"),
	row("feyenoord", "Фейеноорд", "Фейеноорд", "Нидерланды", "ned", 79, 480, "#c8102e", "#ffffff"),
	row("az", "АЗ", "АЗ", "Нидерланды", "ned", 72, 180, "#c8102e", "#ffffff"),
	row("twente", "Твенте", "Твенте", "Нидерланды", "ned", 70, 120, "#c8102e", "#ffffff"),
	row("utrecht", "Утрехт", "Утрехт", "Нидерланды", "ned", 68, 90, "#c8102e", "#ffffff"),
	row("heerenveen", "Херенвен", "Херенвен", "Нидерланды", "ned", 64, 50, "#0b3d91", "#ffffff"),
	row("spartarot", "Спарта Роттердам", "Спарта Р.", "Нидерланды", "ned", 62, 40, "#c8102e", "#ffffff"),
	row("benfica", "Бенфика", "Бенфика", "Португалия", "por", 84, 860, "#c8102e", "#ffffff"),
	row("porto", "Порту", "Порту", "Португалия", "por", 83, 800, "#0b3d91", "#ffffff"),
	row("sporting", "Спортинг", "Спортинг", "Португалия", "por", 82, 760, "#1f7a3a", "#ffffff"),
	row("braga", "Брага", "Брага", "Португалия", "por", 74, 220, "#c8102e", "#ffffff"),
	row("guimaraes", "Витория Гимарайнш", "Гимарайнш", "Португалия", "por", 68, 80, "#ffffff", "#111111"),
	row("famalicao", "Фамаликан", "Фамаликан", "Португалия", "por", 66, 60, "#0b3d91", "#ffffff"),
	row("casapia", "Каза Пиа", "Каза Пиа", "Португалия", "por", 62, 35, "#111111", "#ffffff"),
	row("gil", "Жил Висенте", "Жил Висенте", "Португалия", "por", 63, 40, "#c8102e", "#ffffff"),
	row("anderlecht", "Андерлехт", "Андерлехт", "Бельгия", "bel", 74, 200, "#6b2d5b", "#ffffff"),
	row("brugge", "Брюгге", "Брюгге", "Бельгия", "bel", 78, 340, "#0b3d91", "#111111"),
	row("genk", "Генк", "Генк", "Бельгия", "bel", 72, 150, "#0b3d91", "#ffffff"),
	row("gent", "Гент", "Гент", "Бельгия", "bel", 70, 110, "#0b3d91", "#ffffff"),
	row("antwerp", "Антверпен", "Антверпен", "Бельгия", "bel", 69, 100, "#c8102e", "#ffffff"),
	row("standard", "Стандард", "Стандард", "Бельгия", "bel", 66, 70, "#c8102e", "#ffffff"),
	row("unionsg", "Юнион", "Юнион", "Бельгия", "bel", 73, 160, "#f2c200", "#111111"),
	row("mechelen", "Мехелен", "Мехелен", "Бельгия", "bel", 64, 45, "#f2c200", "#c8102e"),
	row("olympiacos", "Олимпиакос", "Олимпиакос", "Греция", "gre", 76, 260, "#c8102e", "#ffffff"),
	row("pao", "Панатинаикос", "Панатинаикос", "Греция", "gre", 74, 200, "#1f7a3a", "#ffffff"),
	row("aek", "АЕК", "АЕК", "Греция", "gre", 73, 180, "#f2c200", "#111111"),
	row("paok", "ПАОК", "ПАОК", "Греция", "gre", 72, 160, "#111111", "#ffffff"),
	row("aris", "Арис", "Арис", "Греция", "gre", 66, 60, "#f2c200", "#111111"),
	row("ofi", "ОФИ", "ОФИ", "Греция", "gre", 62, 35, "#111111", "#ffffff"),
	row("asteras", "Астерас", "Астерас", "Греция", "gre", 60, 25, "#f2c200", "#111111"),
	row("atromitos", "Атромитос", "Атромитос", "Греция", "gre", 61, 28, "#0b3d91", "#ffffff"),
	row("crvenazvezda", "Црвена Звезда", "Звезда", "Сербия", "srb", 74, 180, "#c8102e", "#ffffff"),
	row("partizan", "Партизан", "Партизан", "Сербия", "srb", 70, 90, "#111111", "#ffffff"),
	row("vojvodina", "Войводина", "Войводина", "Сербия", "srb", 64, 35, "#c8102e", "#ffffff"),
	row("tsc", "ТСЦ", "ТСЦ", "Сербия", "srb", 63, 30, "#0b3d91", "#ffffff"),
	row("cukaricki", "Чукарички", "Чукарички", "Сербия", "srb", 62, 28, "#ffffff", "#111111"),
	row("spartaksub", "Спартак Суботица", "Сп. Суботица", "Сербия", "srb", 60, 20, "#c8102e", "#ffffff"),
	row("radnicki", "Раднички", "Раднички", "Сербия", "srb", 58, 16, "#c8102e", "#ffffff"),
	row("vozdovac", "Вождовац", "Вождовац", "Сербия", "srb", 57, 14, "#6b2d5b", "#ffffff"),
	row("lech", "Лех", "Лех", "Польша", "pol", 70, 90, "#0b3d91", "#ffffff"),
	row("legia", "Легия", "Легия", "Польша", "pol", 72, 120, "#1f7a3a", "#ffffff"),
	row("rakow", "Ракув", "Ракув", "Польша", "pol", 69, 80, "#c8102e", "#ffffff"),
	row("jaga", "Ягеллония", "Ягеллония", "Польша", "pol", 71, 100, "#f2c200", "#c8102e"),
	row("pogon", "Погонь", "Погонь", "Польша", "pol", 66, 50, "#8b1e3f", "#ffffff"),
	row("cracovia", "Краковия", "Краковия", "Польша", "pol", 64, 40, "#c8102e", "#ffffff"),
	row("piast", "Пяст", "Пяст", "Польша", "pol", 63, 35, "#0b3d91", "#ffffff"),
	row("widzew", "Видзев", "Видзев", "Польша", "pol", 62, 30, "#c8102e", "#ffffff"),
	row("salzburg", "Зальцбург", "Зальцбург", "Австрия", "aut", 76, 280, "#c8102e", "#ffffff"),
	row("sturm", "Штурм", "Штурм", "Австрия", "aut", 70, 90, "#111111", "#ffffff"),
	row("rapid", "Рапид", "Рапид", "Австрия", "aut", 71, 100, "#1f7a3a", "#ffffff"),
	row("austrianw", "Аустрия", "Аустрия", "Австрия", "aut", 68, 70, "#6b2d5b", "#ffffff"),
	row("lask", "ЛАСК", "ЛАСК", "Австрия", "aut", 69, 80, "#111111", "#ffffff"),
	row("wolfsberg", "Вольфсберг", "Вольфсберг", "Австрия", "aut", 62, 28, "#ffffff", "#111111"),
	row("altach", "Альтах", "Альтах", "Австрия", "aut", 60, 20, "#f2c200", "#111111"),
	row("hartberg", "Хартберг", "Хартберг", "Австрия", "aut", 61, 22, "#0b3d91", "#ffffff"),
	row("copenhagen", "Копенгаген", "Копенгаген", "Дания", "den", 74, 180, "#ffffff", "#0b3d91"),
	row("midtjylland", "Мидтьюлланн", "Мидтьюлланн", "Дания", "den", 72, 140, "#111111", "#c8102e"),
	row("brondby", "Брондбю", "Брондбю", "Дания", "den", 68, 70, "#f2c200", "#0b3d91"),
	row("nordsjaelland", "Норшелланн", "Норшелланн", "Дания", "den", 66, 50, "#c8102e", "#f2c200"),
	row("agf", "АГФ", "АГФ", "Дания", "den", 64, 40, "#ffffff", "#111111"),
	row("silkeborg", "Силькеборг", "Силькеборг", "Дания", "den", 62, 28, "#c8102e", "#ffffff"),
	row("randers", "Раннерс", "Раннерс", "Дания", "den", 61, 24, "#0b3d91", "#ffffff"),
	row("viborg", "Виборг", "Виборг", "Дания", "den", 60, 20, "#1f7a3a", "#ffffff")
];
var EURO = [
	{
		id: "psg",
		name: "ПСЖ",
		short: "ПСЖ",
		city: "Франция",
		rep: 92,
		color: "#0b1d4a",
		color2: "#c8102e",
		ticket: "ucl"
	},
	{
		id: "bayern",
		name: "Бавария",
		short: "Бавария",
		city: "Германия",
		rep: 91,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "realmadrid",
		name: "Реал Мадрид",
		short: "Реал",
		city: "Испания",
		rep: 93,
		color: "#ffffff",
		color2: "#d4af37",
		ticket: "ucl"
	},
	{
		id: "liverpool",
		name: "Ливерпуль",
		short: "Ливерпуль",
		city: "Англия",
		rep: 90,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "inter",
		name: "Интер",
		short: "Интер",
		city: "Италия",
		rep: 88,
		color: "#0b3d91",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "mancity",
		name: "Манчестер Сити",
		short: "Сити",
		city: "Англия",
		rep: 91,
		color: "#6cabdd",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "arsenal",
		name: "Арсенал",
		short: "Арсенал А.",
		city: "Англия",
		rep: 89,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "barcelona",
		name: "Барселона",
		short: "Барселона",
		city: "Испания",
		rep: 90,
		color: "#a50044",
		color2: "#004d98",
		ticket: "ucl"
	},
	{
		id: "atletico",
		name: "Атлетико",
		short: "Атлетико",
		city: "Испания",
		rep: 86,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "dortmund",
		name: "Боруссия Д",
		short: "Дортмунд",
		city: "Германия",
		rep: 85,
		color: "#f2c200",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "roma",
		name: "Рома",
		short: "Рома",
		city: "Италия",
		rep: 82,
		color: "#8b1e3f",
		color2: "#f2c200",
		ticket: "ucl"
	},
	{
		id: "sporting",
		name: "Спортинг",
		short: "Спортинг",
		city: "Португалия",
		rep: 82,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "astonvilla",
		name: "Астон Вилла",
		short: "Вилла",
		city: "Англия",
		rep: 82,
		color: "#6b1d4a",
		color2: "#7ec8e3",
		ticket: "ucl"
	},
	{
		id: "porto",
		name: "Порту",
		short: "Порту",
		city: "Португалия",
		rep: 83,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "manutd",
		name: "Манчестер Юнайтед",
		short: "Юнайтед",
		city: "Англия",
		rep: 84,
		color: "#c8102e",
		color2: "#f2c200",
		ticket: "ucl"
	},
	{
		id: "brugge",
		name: "Брюгге",
		short: "Брюгге",
		city: "Бельгия",
		rep: 78,
		color: "#0b3d91",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "betis",
		name: "Бетис",
		short: "Бетис",
		city: "Испания",
		rep: 80,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "psv",
		name: "ПСВ",
		short: "ПСВ",
		city: "Нидерланды",
		rep: 82,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "feyenoord",
		name: "Фейеноорд",
		short: "Фейеноорд",
		city: "Нидерланды",
		rep: 79,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "lille",
		name: "Лилль",
		short: "Лилль",
		city: "Франция",
		rep: 78,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "napoli",
		name: "Наполи",
		short: "Наполи",
		city: "Италия",
		rep: 84,
		color: "#7ec8e3",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "leipzig",
		name: "РБ Лейпциг",
		short: "Лейпциг",
		city: "Германия",
		rep: 82,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "villarreal",
		name: "Вильярреал",
		short: "Вильярреал",
		city: "Испания",
		rep: 81,
		color: "#f2c200",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "shakhtar",
		name: "Шахтёр Д",
		short: "Шахтёр Д",
		city: "Украина",
		rep: 74,
		color: "#f26b1f",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "gala",
		name: "Галатасарай",
		short: "Галатасарай",
		city: "Турция",
		rep: 84,
		color: "#f2c200",
		color2: "#c8102e",
		ticket: "ucl"
	},
	{
		id: "fener",
		name: "Фенербахче",
		short: "Фенербахче",
		city: "Турция",
		rep: 82,
		color: "#0b3d91",
		color2: "#f2c200",
		ticket: "ucl"
	},
	{
		id: "bodo",
		name: "Будё-Глимт",
		short: "Будё",
		city: "Норвегия",
		rep: 74,
		color: "#f2c200",
		color2: "#111111",
		ticket: "ucl"
	},
	{
		id: "stuttgart",
		name: "Штутгарт",
		short: "Штутгарт",
		city: "Германия",
		rep: 80,
		color: "#ffffff",
		color2: "#c8102e",
		ticket: "ucl"
	},
	{
		id: "como",
		name: "Комо",
		short: "Комо",
		city: "Италия",
		rep: 76,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "lens",
		name: "Ланс",
		short: "Ланс",
		city: "Франция",
		rep: 77,
		color: "#f2c200",
		color2: "#c8102e",
		ticket: "ucl"
	},
	{
		id: "sabah",
		name: "Сабах",
		short: "Сабах",
		city: "Азербайджан",
		rep: 68,
		color: "#6b2d5b",
		color2: "#ffffff",
		ticket: "uclq"
	},
	{
		id: "slavia",
		name: "Славия",
		short: "Славия",
		city: "Чехия",
		rep: 72,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "ucl"
	},
	{
		id: "lask",
		name: "ЛАСК",
		short: "ЛАСК",
		city: "Австрия",
		rep: 69,
		color: "#111111",
		color2: "#ffffff",
		ticket: "uclq"
	},
	{
		id: "aek",
		name: "АЕК",
		short: "АЕК",
		city: "Греция",
		rep: 73,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uclq"
	},
	{
		id: "viking",
		name: "Викинг",
		short: "Викинг",
		city: "Норвегия",
		rep: 67,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uclq"
	},
	{
		id: "slovan",
		name: "Слован",
		short: "Слован",
		city: "Словакия",
		rep: 66,
		color: "#7ec8e3",
		color2: "#ffffff",
		ticket: "uclq"
	},
	{
		id: "leverkusen",
		name: "Байер",
		short: "Байер",
		city: "Германия",
		rep: 84,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "benfica",
		name: "Бенфика",
		short: "Бенфика",
		city: "Португалия",
		rep: 84,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "juventus",
		name: "Ювентус",
		short: "Ювентус",
		city: "Италия",
		rep: 84,
		color: "#111111",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "milan",
		name: "Милан",
		short: "Милан",
		city: "Италия",
		rep: 83,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "lyon",
		name: "Лион",
		short: "Лион",
		city: "Франция",
		rep: 78,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "marseille",
		name: "Марсель",
		short: "Марсель",
		city: "Франция",
		rep: 79,
		color: "#7ec8e3",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "az",
		name: "АЗ",
		short: "АЗ",
		city: "Нидерланды",
		rep: 72,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "olympiacos",
		name: "Олимпиакос",
		short: "Олимпиакос",
		city: "Греция",
		rep: 76,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "sociedad",
		name: "Реал Сосьедад",
		short: "Сосьедад",
		city: "Испания",
		rep: 78,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "ferencvaros",
		name: "Ференцварош",
		short: "Ференцварош",
		city: "Венгрия",
		rep: 68,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "plzen",
		name: "Виктория Пльзень",
		short: "Пльзень",
		city: "Чехия",
		rep: 67,
		color: "#c8102e",
		color2: "#0b3d91",
		ticket: "uel"
	},
	{
		id: "spartapraha",
		name: "Спарта Прага",
		short: "Спарта П.",
		city: "Чехия",
		rep: 70,
		color: "#8b1e3f",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "unionberlin",
		name: "Унион",
		short: "Унион Б.",
		city: "Германия",
		rep: 74,
		color: "#c8102e",
		color2: "#f2c200",
		ticket: "uel"
	},
	{
		id: "anderlecht",
		name: "Андерлехт",
		short: "Андерлехт",
		city: "Бельгия",
		rep: 74,
		color: "#6b2d5b",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "dzagreb",
		name: "Динамо Загреб",
		short: "Дин. Загреб",
		city: "Хорватия",
		rep: 70,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "salzburg",
		name: "Зальцбург",
		short: "Зальцбург",
		city: "Австрия",
		rep: 76,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "celtic",
		name: "Селтик",
		short: "Селтик",
		city: "Шотландия",
		rep: 74,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "rennes",
		name: "Ренн",
		short: "Ренн",
		city: "Франция",
		rep: 74,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "sturm",
		name: "Штурм",
		short: "Штурм",
		city: "Австрия",
		rep: 70,
		color: "#111111",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "palace",
		name: "Кристал Пэлас",
		short: "Пэлас",
		city: "Англия",
		rep: 76,
		color: "#0b3d91",
		color2: "#c8102e",
		ticket: "uel"
	},
	{
		id: "bournemouth",
		name: "Борнмут",
		short: "Борнмут",
		city: "Англия",
		rep: 75,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "sunderland",
		name: "Сандерленд",
		short: "Сандерленд",
		city: "Англия",
		rep: 73,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "celje",
		name: "Целе",
		short: "Целе",
		city: "Словения",
		rep: 62,
		color: "#1f7a3a",
		color2: "#f2c200",
		ticket: "uel"
	},
	{
		id: "omonia",
		name: "Омония",
		short: "Омония",
		city: "Кипр",
		rep: 62,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "celta",
		name: "Сельта",
		short: "Сельта",
		city: "Испания",
		rep: 74,
		color: "#7ec8e3",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "hoffenheim",
		name: "Хоффенхайм",
		short: "Хоффенхайм",
		city: "Германия",
		rep: 74,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "besiktas",
		name: "Бешикташ",
		short: "Бешикташ",
		city: "Турция",
		rep: 76,
		color: "#111111",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "hapoel",
		name: "Хапоэль Б. Ш.",
		short: "Хапоэль",
		city: "Израиль",
		rep: 64,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "nice",
		name: "Ницца",
		short: "Ницца",
		city: "Франция",
		rep: 75,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "lillestrom",
		name: "Лиллестрём",
		short: "Лиллестрём",
		city: "Норвегия",
		rep: 60,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uel"
	},
	{
		id: "levski",
		name: "Левски",
		short: "Левски",
		city: "Болгария",
		rep: 60,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "ararat",
		name: "Арарат-Армения",
		short: "Арарат",
		city: "Армения",
		rep: 58,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uel"
	},
	{
		id: "atalanta",
		name: "Аталанта",
		short: "Аталанта",
		city: "Италия",
		rep: 82,
		color: "#0b3d91",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "braga",
		name: "Брага",
		short: "Брага",
		city: "Португалия",
		rep: 74,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "ajax",
		name: "Аякс",
		short: "Аякс",
		city: "Нидерланды",
		rep: 80,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "freiburg",
		name: "Фрайбург",
		short: "Фрайбург",
		city: "Германия",
		rep: 76,
		color: "#c8102e",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "monaco",
		name: "Монако",
		short: "Монако",
		city: "Франция",
		rep: 80,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "copenhagen",
		name: "Копенгаген",
		short: "Копенгаген",
		city: "Дания",
		rep: 74,
		color: "#ffffff",
		color2: "#0b3d91",
		ticket: "uecl"
	},
	{
		id: "midtjylland",
		name: "Мидтьюлланн",
		short: "Мидтьюлланн",
		city: "Дания",
		rep: 72,
		color: "#111111",
		color2: "#c8102e",
		ticket: "uecl"
	},
	{
		id: "crvenazvezda",
		name: "Црвена Звезда",
		short: "Звезда",
		city: "Сербия",
		rep: 74,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "gent",
		name: "Гент",
		short: "Гент",
		city: "Бельгия",
		rep: 70,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "pao",
		name: "Панатинаикос",
		short: "Панатинаикос",
		city: "Греция",
		rep: 74,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "pafos",
		name: "Пафос",
		short: "Пафос",
		city: "Кипр",
		rep: 64,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "brighton",
		name: "Брайтон",
		short: "Брайтон",
		city: "Англия",
		rep: 78,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "lugano",
		name: "Лугано",
		short: "Лугано",
		city: "Швейцария",
		rep: 64,
		color: "#111111",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "getafe",
		name: "Хетафе",
		short: "Хетафе",
		city: "Испания",
		rep: 72,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "kups",
		name: "КуПС",
		short: "КуПС",
		city: "Финляндия",
		rep: 58,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "twente",
		name: "Твенте",
		short: "Твенте",
		city: "Нидерланды",
		rep: 70,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "borac",
		name: "Борац",
		short: "Борац",
		city: "Босния",
		rep: 58,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "sttruiden",
		name: "Сент-Трюйден",
		short: "СТVV",
		city: "Бельгия",
		rep: 64,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "lincoln",
		name: "Линкольн",
		short: "Линкольн",
		city: "Гибралтар",
		rep: 52,
		color: "#c8102e",
		color2: "#0b3d91",
		ticket: "uecl"
	},
	{
		id: "brann",
		name: "Бранн",
		short: "Бранн",
		city: "Норвегия",
		rep: 62,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "hearts",
		name: "Хартс",
		short: "Хартс",
		city: "Шотландия",
		rep: 64,
		color: "#8b1e3f",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "kairat",
		name: "Кайрат",
		short: "Кайрат",
		city: "Казахстан",
		rep: 62,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "trabzon",
		name: "Трабзонспор",
		short: "Трабзон",
		city: "Турция",
		rep: 74,
		color: "#6b1d2a",
		color2: "#7ec8e3",
		ticket: "uecl"
	},
	{
		id: "craiova",
		name: "Университатя",
		short: "Крайова",
		city: "Румыния",
		rep: 62,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "riga",
		name: "Рига",
		short: "Рига",
		city: "Латвия",
		rep: 58,
		color: "#7ec8e3",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "hajduk",
		name: "Хайдук",
		short: "Хайдук",
		city: "Хорватия",
		rep: 66,
		color: "#ffffff",
		color2: "#0b3d91",
		ticket: "uecl"
	},
	{
		id: "jablonec",
		name: "Яблонец",
		short: "Яблонец",
		city: "Чехия",
		rep: 60,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "agf",
		name: "АГФ",
		short: "АГФ",
		city: "Дания",
		rep: 64,
		color: "#ffffff",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "nordsjaelland",
		name: "Норшелланн",
		short: "Норшелланн",
		city: "Дания",
		rep: 66,
		color: "#c8102e",
		color2: "#f2c200",
		ticket: "uecl"
	},
	{
		id: "escaldes",
		name: "Интер Эскальдес",
		short: "Эскальдес",
		city: "Андорра",
		rep: 50,
		color: "#0b3d91",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "thun",
		name: "Тун",
		short: "Тун",
		city: "Швейцария",
		rep: 60,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "cskasofia",
		name: "ЦСКА София",
		short: "ЦСКА С.",
		city: "Болгария",
		rep: 62,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "zalgiris",
		name: "Кауно Жальгирис",
		short: "Жальгирис",
		city: "Литва",
		rep: 56,
		color: "#1f7a3a",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "mjallby",
		name: "Мьельбю",
		short: "Мьельбю",
		city: "Швеция",
		rep: 58,
		color: "#f2c200",
		color2: "#111111",
		ticket: "uecl"
	},
	{
		id: "iberia",
		name: "Иберия 1999",
		short: "Иберия",
		city: "Грузия",
		rep: 56,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	},
	{
		id: "egnatia",
		name: "Эгнатия",
		short: "Эгнатия",
		city: "Албания",
		rep: 54,
		color: "#c8102e",
		color2: "#ffffff",
		ticket: "uecl"
	}
];
function euroToClub(e) {
	return {
		id: e.id,
		name: e.name,
		short: e.short,
		city: e.city,
		league: "euro",
		rep: e.rep,
		budget: e.rep * 8,
		color: e.color,
		color2: e.color2,
		stadium: e.name,
		capacity: 4e4,
		euro: e.ticket
	};
}
var RPL_GROUPS = [
	[
		"spartak",
		"rubin",
		"orenburg",
		"rodina"
	],
	[
		"krasnodar",
		"dynamo",
		"akhmat",
		"fakel"
	],
	[
		"zenit",
		"baltika",
		"krylya",
		"dinmakh"
	],
	[
		"loko",
		"cska",
		"rostov",
		"akron"
	]
];
var FOREIGN_LEAGUES = [
	"tur",
	"bra",
	"ned",
	"por",
	"bel",
	"gre",
	"srb",
	"pol",
	"aut",
	"den"
];
var FIRST$1 = [
	"Артём",
	"Иван",
	"Дмитрий",
	"Александр",
	"Никита",
	"Максим",
	"Егор",
	"Кирилл",
	"Даниил",
	"Андрей",
	"Михаил",
	"Сергей",
	"Павел",
	"Роман",
	"Илья",
	"Тимофей",
	"Матвей",
	"Владислав",
	"Денис",
	"Алексей",
	"Глеб",
	"Фёдор",
	"Олег",
	"Руслан",
	"Тимур",
	"Камиль",
	"Арсен",
	"Сослан",
	"Ибрагим",
	"Заур",
	"Степан",
	"Ярослав",
	"Богдан",
	"Марк",
	"Лев",
	"Пётр",
	"Назар",
	"Эдуард",
	"Вадим",
	"Игорь"
];
var LAST$1 = [
	"Иванов",
	"Петров",
	"Смирнов",
	"Кузнецов",
	"Попов",
	"Соколов",
	"Лебедев",
	"Козлов",
	"Новиков",
	"Морозов",
	"Волков",
	"Соловьёв",
	"Васильев",
	"Зайцев",
	"Павлов",
	"Семёнов",
	"Голубев",
	"Виноградов",
	"Богданов",
	"Воробьёв",
	"Фёдоров",
	"Михайлов",
	"Беляев",
	"Тарасов",
	"Белов",
	"Комаров",
	"Орлов",
	"Киселёв",
	"Макаров",
	"Андреев",
	"Ковалёв",
	"Ильин",
	"Гусев",
	"Титов",
	"Кузьмин",
	"Баранов",
	"Куликов",
	"Алексеев",
	"Степанов",
	"Яковлев",
	"Сорокин",
	"Сергеев",
	"Романов",
	"Захаров",
	"Борисов",
	"Королёв",
	"Герасимов",
	"Григорьев",
	"Егоров",
	"Никитин"
];
var FOREIGN = [
	[
		"Жоао",
		"Силва",
		"Бразилия"
	],
	[
		"Лукас",
		"Оливейра",
		"Бразилия"
	],
	[
		"Матеус",
		"Кошта",
		"Бразилия"
	],
	[
		"Педро",
		"Рибейро",
		"Бразилия"
	],
	[
		"Кайо",
		"Феррейра",
		"Бразилия"
	],
	[
		"Никола",
		"Йович",
		"Сербия"
	],
	[
		"Стефан",
		"Ковач",
		"Сербия"
	],
	[
		"Марко",
		"Петрович",
		"Сербия"
	],
	[
		"Эсекьель",
		"Ромеро",
		"Аргентина"
	],
	[
		"Факундо",
		"Диас",
		"Аргентина"
	],
	[
		"Кевин",
		"Мена",
		"Колумбия"
	],
	[
		"Хавьер",
		"Кастильо",
		"Колумбия"
	],
	[
		"Идрисса",
		"Траоре",
		"Мали"
	],
	[
		"Секу",
		"Конате",
		"Гвинея"
	],
	[
		"Эммануэль",
		"Ба",
		"Кот-д’Ивуар"
	],
	[
		"Достон",
		"Хакимов",
		"Узбекистан"
	],
	[
		"Артур",
		"Белоус",
		"Беларусь"
	],
	[
		"Еркебулан",
		"Сейдахмет",
		"Казахстан"
	],
	[
		"Хорен",
		"Баяндур",
		"Армения"
	],
	[
		"Георгий",
		"Беридзе",
		"Грузия"
	],
	[
		"Бабакар",
		"Диалло",
		"Сенегал"
	],
	[
		"Мусса",
		"Ньянг",
		"Гана"
	]
];
var SHIRT = [
	"GK",
	"GK",
	"DR",
	"DR",
	"DL",
	"DL",
	"DC",
	"DC",
	"DC",
	"DM",
	"DM",
	"MC",
	"MC",
	"MC",
	"AM",
	"AM",
	"MR",
	"ML",
	"ST",
	"ST"
];
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function rng(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(r, arr) {
	return arr[Math.floor(r() * arr.length)];
}
function clamp$2(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function attr(r, base, spread = 1.7) {
	return clamp$2(Math.round(base + (r() * 2 - 1) * spread), 4, 19);
}
function addDays(iso, n) {
	const d = /* @__PURE__ */ new Date(iso + "T12:00:00Z");
	d.setUTCDate(d.getUTCDate() + n);
	return d.toISOString().slice(0, 10);
}
function weekday(iso) {
	return (/* @__PURE__ */ new Date(iso + "T12:00:00Z")).getUTCDay();
}
function isWinter(iso, season) {
	return iso >= `${season}-12-07` && iso < `${season + 1}-03-01`;
}
function windowOpen(iso, season) {
	if (iso >= `${season}-06-15` && iso <= `${season}-09-12`) return true;
	if (iso >= `${season + 1}-01-20` && iso <= `${season + 1}-02-25`) return true;
	return false;
}
function formatDate(iso) {
	const months = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря"
	];
	const days = [
		"воскресенье",
		"понедельник",
		"вторник",
		"среда",
		"четверг",
		"пятница",
		"суббота"
	];
	const d = /* @__PURE__ */ new Date(iso + "T12:00:00Z");
	return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
function money(n) {
	const v = Math.round(n * 10) / 10;
	if (Math.abs(v) >= 1e3) return `${(v / 1e3).toFixed(2)} млрд ₽`;
	return `${v.toLocaleString("ru-RU")} млн ₽`;
}
function dollars(millionRub) {
	return Math.max(0, Math.round(Math.abs(millionRub) * 1e6 / 92));
}
function dollarText(millionRub) {
	return `${millionRub < 0 ? "-" : ""}$${String(dollars(millionRub)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
function rubFromDollars(usd) {
	return Math.round(Math.max(0, usd) * 92 / 1e6 * 10) / 10;
}
function wageText(thousand) {
	if (thousand >= 1e3) return `${(thousand / 1e3).toFixed(2)} млн ₽/нед`;
	return `${Math.round(thousand)} тыс ₽/нед`;
}
function saturdays(season, count) {
	let d = `${season}-07-18`;
	while (weekday(d) !== 6) d = addDays(d, 1);
	const out = [];
	while (out.length < count && d < `${season + 1}-06-20`) {
		if (!isWinter(d, season)) out.push(d);
		d = addDays(d, 7);
	}
	return out;
}
function makeLeagueFixtures(clubs, league, season, double) {
	const ids = clubs.filter((c) => c.league === league).map((c) => c.id);
	if (ids.length < 2) return [];
	const rounds = double && ids.length <= 20 ? doubleRound(ids) : circle(ids);
	const dates = saturdays(season, Math.max(rounds.length, 40));
	const fixtures = [];
	rounds.forEach((pairs, round) => {
		const date = dates[round] ?? dates[dates.length - 1];
		pairs.forEach(([home, away], i) => {
			fixtures.push({
				id: `${league}-${season}-${round}-${i}`,
				league,
				round: round + 1,
				date,
				home,
				away,
				played: false,
				comp: "league",
				label: "Чемпионат"
			});
		});
	});
	return fixtures;
}
function makeFixtures(clubs, season) {
	return [...new Set(clubs.map((c) => c.league))].filter((l) => l !== "euro").flatMap((league) => makeLeagueFixtures(clubs, league, season, league !== "fnl3"));
}
registerFixtures(makeLeagueFixtures);
function valueOf(ovr, age, club) {
	return priceRub(ovr, age, club.league, club.rep);
}
var PRICE_K = {
	rpl: 1,
	fnl: .42,
	fnl2: .18,
	fnl3: .1,
	media: .2,
	amateur: .05,
	tur: .85,
	bra: .9,
	ned: .8,
	por: .72,
	bel: .55,
	gre: .42,
	srb: .3,
	pol: .34,
	aut: .4,
	den: .38,
	euro: 1.35
};
function priceEuro(ovr, age, league, rep = 70) {
	const base = Math.pow(1.13, ovr - 60);
	const ageK = age <= 21 ? 1.55 : age <= 23 ? 1.28 : age <= 26 ? 1.05 : age <= 28 ? .82 : age <= 30 ? .55 : age <= 32 ? .32 : .18;
	const leagueK = PRICE_K[league] ?? .5;
	const repK = .62 + Math.max(30, Math.min(95, rep)) / 180;
	return Math.max(.02, Math.round(base * ageK * leagueK * repK * 100) / 100);
}
function priceRub(ovr, age, league, rep = 70) {
	return Math.max(2, Math.round(priceEuro(ovr, age, league, rep) * 100));
}
function attrMark(p) {
	if (p.pos === "GK") return clamp$2(p.gk * .72 + p.men * .16 + p.def * .12, 1, 20);
	return clamp$2(p.pos === "ST" || p.pos === "AM" || p.pos === "MR" || p.pos === "ML" ? p.sho * .3 + p.tec * .25 + p.pac * .25 + p.pas * .2 : p.pos === "DC" || p.pos === "DR" || p.pos === "DL" ? p.def * .45 + p.strn * .2 + p.pac * .15 + p.men * .2 : p.pas * .3 + p.tec * .25 + p.men * .2 + p.def * .15 + p.sta * .1, 1, 20);
}
function overall(p) {
	if (p.ovr) return p.ovr;
	return clamp$2(Math.round(30 + attrMark(p) * 3.05), 44, 88);
}
function catalog() {
	return [
		...CLUBS,
		...EXTRA,
		...FOREIGN$1
	];
}
function templateById(id) {
	return catalog().find((c) => c.id === id);
}
function makePlayer(club, index, pos, r, names) {
	const pack = PACKS[club.league];
	const foreign = !pack && club.rep > 68 && r() < .34;
	let natPick = foreign ? pick(r, FOREIGN) : null;
	let first = pack ? pick(r, pack.first) : natPick ? natPick[0] : pick(r, FIRST$1);
	let last = pack ? pick(r, pack.last) : natPick ? natPick[1] : pick(r, LAST$1);
	if (names) {
		let guard = 0;
		while (names.has(`${first}|${last}`) && guard++ < 16) {
			natPick = foreign && r() < .5 ? pick(r, FOREIGN) : null;
			first = pack ? pick(r, pack.first) : natPick ? natPick[0] : pick(r, FIRST$1);
			last = pack ? pick(r, pack.last) : natPick ? natPick[1] : pick(r, LAST$1);
		}
		names.add(`${first}|${last}`);
	}
	const base = 6 + club.rep * .1;
	const age = pos === "GK" && r() < .4 ? 28 + Math.floor(r() * 7) : 18 + Math.floor(r() * 15);
	const youth = age <= 21 ? -1.1 : age >= 33 ? -.8 : .35;
	const star = index >= 16 ? 1.3 : index >= 12 ? .4 : 0;
	const ca = base + youth + star;
	const def = attr(r, ca + (pos === "DC" || pos === "DM" ? 1.4 : pos === "GK" ? .4 : -.6));
	const sho = attr(r, ca + (pos === "ST" ? 1.8 : pos === "AM" || pos === "MR" || pos === "ML" ? .7 : -1.4));
	const gk = pos === "GK" ? attr(r, ca + 1.5, 1.2) : attr(r, 3, 1);
	const ovrGuess = clamp$2(Math.round(30 + (pos === "GK" ? gk : (def + sho + ca) / 3) * 3.05), 44, 88);
	const pot = age <= 21 ? Math.min(88, ovrGuess + 6 + Math.floor(r() * 7)) : age <= 24 ? Math.min(86, ovrGuess + 3 + Math.floor(r() * 4)) : age <= 29 ? Math.min(86, ovrGuess + Math.floor(r() * 2)) : ovrGuess + (r() < .15 ? 1 : 0);
	let ovr = Math.min(ovrGuess, pot);
	if (club.league === "media") {
		const base = {
			d2rots: 74,
			amkal: 72,
			broke: 71,
			fk10: 70,
			lit: 69,
			rodmedia: 68,
			fight: 66,
			matchtv: 64
		}[club.id] ?? 66;
		ovr = Math.max(58, Math.min(78, base + (index < 3 ? 2 : index < 11 ? 0 : -4) + Math.round((r() - .5) * 3)));
	}
	const value = valueOf(ovr, age, club);
	return {
		id: `${club.id}-${index}-${Math.floor(r() * 9999)}`,
		clubId: club.id,
		first,
		last,
		age,
		nat: pack ? pack.nat : natPick ? natPick[2] : r() < .08 ? pick(r, [
			"Беларусь",
			"Казахстан",
			"Армения",
			"Узбекистан"
		]) : "Россия",
		pos,
		foot: r() < .22 ? "Лев" : "Прав",
		pac: attr(r, ca + (pos === "MR" || pos === "ML" || pos === "ST" ? 1 : pos === "DC" ? -.8 : 0)),
		sta: attr(r, ca),
		strn: attr(r, ca + (pos === "DC" || pos === "ST" ? .6 : 0)),
		def,
		pas: attr(r, ca + (pos === "MC" || pos === "AM" || pos === "DM" ? 1 : 0)),
		tec: attr(r, ca + (pos === "AM" || pos === "MC" ? .8 : 0)),
		sho,
		men: attr(r, ca + (age > 28 ? .8 : -.3)),
		gk,
		cond: 78 + Math.floor(r() * 20),
		sharp: 55 + Math.floor(r() * 30),
		mor: 62 + Math.floor(r() * 28),
		wage: Math.max(8, Math.round(priceEuro(ovr, age, club.league, club.rep) * 140)),
		value,
		contract: 1 + Math.floor(r() * 4),
		number: 0,
		injured: 0,
		goals: 0,
		assists: 0,
		apps: 0,
		ratingSum: 0,
		yellow: 0,
		ban: 0,
		listed: false,
		ovr,
		pot,
		growth: 0
	};
}
function squadFor(club) {
	const r = rng(hash(club.id + ":squad"));
	const names = /* @__PURE__ */ new Set();
	const players = SHIRT.map((pos, i) => makePlayer(club, i, pos, r, names));
	const used = /* @__PURE__ */ new Set();
	for (const p of players) {
		let n = p.pos === "GK" ? used.has(1) ? 1 + Math.floor(r() * 20) : 1 : 2 + Math.floor(r() * 97);
		let guard = 0;
		while (used.has(n) && guard++ < 40) n = 1 + Math.floor(r() * 99);
		used.add(n);
		p.number = n;
	}
	return players;
}
function expectation(club, clubs) {
	const mates = clubs.filter((c) => c.league === club.league).sort((a, b) => b.rep - a.rep);
	const place = mates.findIndex((c) => c.id === club.id) + 1;
	const n = mates.length;
	if (club.league === "rpl") {
		if (place <= 2) return "бороться за чемпионство";
		if (place <= 5) return "финишировать в тройке";
		if (place <= 10) return "спокойно держаться в середине";
		return "сохранить место в РПЛ";
	}
	if (place <= 2) return club.league === "fnl3" ? "выйти в ФНЛ-2" : club.league === "fnl2" ? "выйти в Первую лигу" : "прямо выйти в РПЛ";
	if (place > n - 2 && club.league !== "fnl3") return "не вылететь";
	return "закончиться в верхней половине";
}
function defaultTactics(clubId) {
	const style = styleOf(clubId);
	return {
		formation: style.formation,
		slots: Array(11).fill(""),
		mentality: style.mentality,
		press: style.press,
		tempo: style.tempo,
		line: style.line,
		width: style.width,
		style: style.id
	};
}
function newSave(clubId, manager) {
	const chosen = templateById(clubId) ?? CLUBS[0];
	const russian = [...CLUBS, ...EXTRA];
	const extraForeign = FOREIGN$1.some((c) => c.league === chosen.league) ? FOREIGN$1.filter((c) => c.league === chosen.league) : [];
	const clubs = [...russian, ...extraForeign.filter((c) => !russian.some((r) => r.id === c.id))].map((c) => ({ ...c }));
	const club = clubs.find((c) => c.id === clubId) ?? clubs[0];
	const players = clubs.flatMap(squadFor);
	const season = 2026;
	const fixtures = makeFixtures(clubs, season);
	const tactics = defaultTactics(club.id);
	const save = {
		v: 3,
		manager: manager.trim() || "Алексей Орлов",
		clubId: club.id,
		date: "2026-07-11",
		season,
		clubs,
		players,
		fixtures,
		inbox: [],
		tactics,
		budget: club.budget,
		balance: Math.round(club.budget * .35),
		confidence: 68,
		played: 0,
		focus: null,
		sacked: false,
		offers: [],
		log: [],
		kit: {
			home: {
				design: hash(club.id) % 36,
				primary: club.color,
				secondary: club.color2,
				socks: club.color
			},
			away: {
				design: (hash(club.id) + 11) % 36,
				primary: club.color2,
				secondary: club.color,
				socks: club.color2
			}
		},
		badSeasons: 0,
		cup: freshCup(),
		euro: freshEuro(),
		phase: "season",
		difficulty: "experienced",
		matchMins: 2
	};
	seedCompetitions(save);
	const mediaNames = mediaInCup(save).map((c) => c.name).join(", ");
	const task = expectation(club, clubs);
	const euroLine = save.euro.comp ? ` Еврокубки: ${save.euro.comp === "ucl" ? save.euro.stage === "qual" ? "Лига чемпионов, квалификация" : "Лига чемпионов" : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций"}.` : "";
	save.inbox.push({
		id: "m1",
		date: save.date,
		from: "Президент клуба",
		title: `Добро пожаловать, ${save.manager.split(" ")[0]}`,
		body: `Вы возглавили «${club.name}». Задача сезона ${season}/2027: ${task}. Бюджет на трансферы — ${money(club.budget)}. Зарплатный потолок — ${wageText(wageCap(club.rep))}.${euroLine}`,
		read: false
	}, {
		id: "m2",
		date: save.date,
		from: "Спортивный директор",
		title: "Летнее окно открыто",
		body: "Заявки принимаем до 12 сентября. Зимой окно короткое: 20 января — 25 февраля. На рынке есть чемпионаты других стран — игроков можно покупать за бюджет и сажать на контракт.",
		read: false
	}, {
		id: "m3",
		date: save.date,
		from: "Кубок России",
		title: "FONBET Кубок России",
		body: `102 клуба: 16 РПЛ идут группами по четыре, путь регионов — на вылет. Медийная лига — отдельный чемпионат. В кубок от неё каждый сезон жребий берёт четыре клуба: ${mediaNames}. Призовые за кубок и лигу падают в бюджет.`,
		read: false
	});
	return save;
}
function playerName(p) {
	return `${p.first} ${p.last}`;
}
function scoutText(p) {
	const bits = [];
	if (p.pos === "GK") bits.push(p.gk >= 15 ? "Надёжный на линии, хорошо играет на выходах." : p.gk >= 12 ? "Крепкий вратарь своего уровня." : "Пока много ошибок на ближней.");
	else {
		if (p.pac >= 15) bits.push("Быстрый, выигрывает забегания.");
		else if (p.pac <= 10) bits.push("Скорости не хватает против крайних.");
		if (p.sho >= 15) bits.push("Холодно бьёт из пределов штрафной.");
		if (p.pas >= 15) bits.push("Держит темп передачей вперёд.");
		if (p.def >= 15) bits.push("Жёсткий в отборе, читает эпизод.");
		if (p.tec >= 15) bits.push("Уверен в дриблинге на малом пространстве.");
		if (p.men >= 16) bits.push("Лидер, не проседает в дерби.");
		else if (p.men <= 10) bits.push("Плывёт, когда счёт против.");
		if (p.age <= 21) bits.push("Молодой, ещё прибавит при игровой практике.");
		if (p.age >= 33) bits.push("Опыт есть, объём уже надо дозировать.");
	}
	if (!bits.length) bits.push("Рабочий вариант на свой уровень, без яркого козыря.");
	return bits.slice(0, 3).join(" ");
}
var CUP_LEAGUES = [
	"fnl",
	"fnl2",
	"fnl3",
	"media",
	"amateur"
];
function freshCup() {
	return {
		byes: [],
		userOut: false,
		stage: "live"
	};
}
function freshEuro() {
	return {
		comp: null,
		stage: "done",
		pts: 0,
		gf: 0,
		ga: 0,
		round: 0
	};
}
function seedCompetitions(save, keepTickets = false) {
	if (!keepTickets) assignOpeningTickets(save);
	save.cup = freshCup();
	save.euro = ticketToEuro(save.clubs.find((c) => c.id === save.clubId)?.euro ?? null);
	save.fixtures = save.fixtures.filter((f) => (f.comp ?? "league") === "league");
	save.fixtures.push(...cupGroupFixtures(save), ...regionRound(save, 1));
	if (save.euro.comp && save.euro.stage === "qual") save.fixtures.push(...euroQual(save));
	else if (save.euro.comp && save.euro.stage === "league") save.fixtures.push(...euroLeague(save));
}
function progressCompetitions(save) {
	if (save.cup.stage !== "done") progressCup(save);
	if (save.euro.comp && save.euro.stage !== "done" && save.euro.stage !== "out") progressEuro(save);
}
function assignOpeningTickets(save) {
	const rpl = save.clubs.filter((c) => c.league === "rpl").sort((a, b) => b.rep - a.rep);
	const tickets = [
		"ucl",
		"ucl",
		"uclq",
		"uel",
		"uecl",
		"uecl"
	];
	rpl.forEach((c, i) => {
		c.euro = tickets[i] ?? null;
	});
}
function ticketToEuro(ticket) {
	if (!ticket) return freshEuro();
	if (ticket === "uclq") return {
		comp: "ucl",
		stage: "qual",
		pts: 0,
		gf: 0,
		ga: 0,
		round: 0
	};
	return {
		comp: ticket,
		stage: "league",
		pts: 0,
		gf: 0,
		ga: 0,
		round: 0
	};
}
function fx(p) {
	return {
		...p,
		played: false
	};
}
function cupGroupFixtures(save) {
	const dates = [
		"2026-08-05",
		"2026-08-19",
		"2026-09-02",
		"2026-10-14",
		"2026-10-28",
		"2026-11-25"
	].map((d) => shiftYear(d, save.season));
	const out = [];
	const letters = [
		"A",
		"B",
		"C",
		"D"
	];
	RPL_GROUPS.forEach((ids, gi) => {
		const present = ids.filter((id) => save.clubs.some((c) => c.id === id && c.league === "rpl"));
		const pool = present.length === 4 ? present : save.clubs.filter((c) => c.league === "rpl").slice(gi * 4, gi * 4 + 4).map((c) => c.id);
		if (pool.length < 2) return;
		doubleRound(pool).forEach((pairs, ri) => {
			pairs.forEach(([home, away], i) => {
				out.push(fx({
					id: `cup-${save.season}-g${gi}-${ri}-${i}`,
					league: "rpl",
					round: ri + 1,
					date: dates[ri] ?? dates[dates.length - 1],
					home,
					away,
					comp: "cup",
					label: `Кубок · группа ${letters[gi]}`
				}));
			});
		});
	});
	return out;
}
function regionClubs(save) {
	const media = new Set(mediaInCup(save).map((c) => c.id));
	return save.clubs.filter((c) => c.league === "media" ? media.has(c.id) : CUP_LEAGUES.includes(c.league)).sort((a, b) => b.rep - a.rep);
}
function mediaInCup(save) {
	return save.clubs.filter((c) => c.league === "media").sort((a, b) => hash(`${save.season}:${a.id}`) - hash(`${save.season}:${b.id}`)).slice(0, 4);
}
function regionRound(save, round) {
	const dates = [
		"2026-07-29",
		"2026-08-12",
		"2026-08-26",
		"2026-09-16"
	].map((d) => shiftYear(d, save.season));
	let ids = round === 1 ? regionClubs(save).map((c) => c.id) : aliveRegion(save);
	if (round > 1) ids = [...ids, ...save.cup.byes];
	save.cup.byes = [];
	if (ids.length <= 8 && round > 1) return [];
	const ranked = ids.map((id) => save.clubs.find((c) => c.id === id)).filter((c) => !!c).sort((a, b) => b.rep - a.rep).map((c) => c.id);
	const target = Math.pow(2, Math.ceil(Math.log2(Math.max(2, ranked.length))));
	ranked.slice(0, ranked.length - (target - ranked.length > ranked.length ? 0 : target - ranked.length));
	ranked.length - (ranked.length % 2 === 0 ? ranked.length : ranked.length - 1);
	const byes = [];
	const queue = [...ranked];
	while (queue.length > 8 && queue.length % 2 === 1) byes.push(queue.shift());
	save.cup.byes = byes;
	const pairs = [];
	const body = [...queue].sort((a, b) => hash(a + b + String(round) + save.season) - hash(b + a));
	for (let i = 0; i < body.length; i += 2) if (body[i + 1]) pairs.push([body[i], body[i + 1]]);
	else byes.push(body[i]);
	save.cup.byes = [.../* @__PURE__ */ new Set([...save.cup.byes, ...byes])];
	return pairs.map(([home, away], i) => fx({
		id: `cup-${save.season}-r${round}-${i}`,
		league: "fnl",
		round: 100 + round,
		date: dates[round - 1] ?? dates[0],
		home,
		away,
		comp: "cup",
		label: `Кубок · путь регионов, раунд ${round}`,
		tie: `reg-${round}-${i}`,
		leg: 1
	}));
}
function aliveRegion(save) {
	const started = new Set(regionClubs(save).map((c) => c.id));
	for (const f of save.fixtures) {
		if (f.comp !== "cup" || !f.played || f.round < 101 || f.round > 104 || f.hg == null || f.ag == null) continue;
		const loser = f.hg === f.ag ? hash(f.id) % 2 ? f.away : f.home : f.hg > f.ag ? f.away : f.home;
		started.delete(loser);
	}
	return [...started].filter((id) => !lost(save, id));
}
function lost(save, id) {
	return save.fixtures.some((f) => {
		if (f.comp !== "cup" || !f.played || f.hg == null || f.ag == null) return false;
		if (f.home !== id && f.away !== id) return false;
		if ((f.round ?? 0) < 100) return false;
		return f.hg > f.ag || f.hg === f.ag && hash(f.id) % 2 === 0 ? f.away === id : f.home === id;
	});
}
function progressCup(save) {
	const user = save.clubId;
	const regionFx = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 101 && f.round <= 104);
	const maxReg = regionFx.reduce((m, f) => Math.max(m, f.round - 100), 0);
	if (maxReg > 0 && maxReg < 4 && regionFx.filter((f) => f.round === 100 + maxReg).every((f) => f.played)) {
		const next = regionRound(save, maxReg + 1);
		if (next.length) save.fixtures.push(...next);
	}
	const groups = save.fixtures.filter((f) => f.comp === "cup" && f.round <= 6 && f.label?.includes("группа"));
	const regs = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 101 && f.round <= 104);
	const groupsDone = groups.length > 0 && groups.every((f) => f.played);
	const regionDone = regs.length > 0 && regs.every((f) => f.played) && aliveRegion(save).length <= 8 && save.cup.byes.length === 0;
	const r16 = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 201 && f.round <= 202);
	if (groupsDone && regionDone && !r16.length) save.fixtures.push(...knockoutPairs(save, r16seeds(save), 201, shiftYear("2027-03-03", save.season), shiftYear("2027-03-17", save.season), "Кубок · 1/8"));
	advanceKo(save, 201, 301, shiftYear("2027-04-07", save.season), shiftYear("2027-04-21", save.season), "Кубок · 1/4");
	advanceKo(save, 301, 401, shiftYear("2027-05-05", save.season), shiftYear("2027-05-19", save.season), "Кубок · 1/2");
	advanceFinal(save, 401, 500, shiftYear("2027-06-02", save.season), "Кубок · финал");
	const mine = save.fixtures.filter((f) => f.comp === "cup" && (f.home === user || f.away === user));
	if (mine.some((f) => f.played && f.hg != null && knockedOut(f, user)) && !mine.some((f) => !f.played)) save.cup.userOut = true;
	if (save.fixtures.some((f) => f.comp === "cup" && f.round === 500 && f.played)) save.cup.stage = "done";
}
function r16seeds(save) {
	const qual = [];
	for (let g = 0; g < 4; g++) {
		const rows = groupTable(save, g);
		if (rows[0]) qual.push(rows[0]);
		if (rows[1]) qual.push(rows[1]);
	}
	const regional = [...aliveRegion(save), ...save.cup.byes].slice(0, 8);
	return [...qual, ...regional].filter((id, i, arr) => arr.indexOf(id) === i).slice(0, 16);
}
function groupTable(save, gi) {
	const letter = [
		"A",
		"B",
		"C",
		"D"
	][gi];
	const games = save.fixtures.filter((f) => f.comp === "cup" && f.label?.includes(`группа ${letter}`) && f.played && f.hg != null);
	const ids = /* @__PURE__ */ new Set();
	games.forEach((f) => {
		ids.add(f.home);
		ids.add(f.away);
	});
	const rows = [...ids].map((id) => ({
		id,
		pts: 0,
		gd: 0
	}));
	for (const f of games) {
		const h = rows.find((r) => r.id === f.home);
		const a = rows.find((r) => r.id === f.away);
		h.gd += f.hg - f.ag;
		a.gd += f.ag - f.hg;
		if (f.hg > f.ag) h.pts += 3;
		else if (f.hg < f.ag) a.pts += 3;
		else {
			h.pts++;
			a.pts++;
		}
	}
	rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd);
	return rows.map((r) => r.id);
}
function knockoutPairs(save, ids, round, d1, d2, label) {
	const pairs = [];
	for (let i = 0; i < ids.length; i += 2) {
		const a = ids[i];
		const b = ids[i + 1];
		if (!a || !b) continue;
		const tie = `ko-${round}-${i}`;
		pairs.push(fx({
			id: `cup-${save.season}-${round}-${i}-1`,
			league: "rpl",
			round,
			date: d1,
			home: a,
			away: b,
			comp: "cup",
			label: `${label}, первый матч`,
			tie,
			leg: 1
		}), fx({
			id: `cup-${save.season}-${round}-${i}-2`,
			league: "rpl",
			round: round + 1,
			date: d2,
			home: b,
			away: a,
			comp: "cup",
			label: `${label}, ответный`,
			tie,
			leg: 2
		}));
	}
	return pairs;
}
function winnersOf(save, round) {
	const legs = save.fixtures.filter((f) => f.comp === "cup" && (f.round === round || f.round === round + 1));
	if (!legs.length || legs.some((f) => !f.played)) return null;
	const ties = /* @__PURE__ */ new Map();
	for (const f of legs) {
		const key = f.tie || f.id;
		ties.set(key, [...ties.get(key) ?? [], f]);
	}
	const winners = [];
	for (const [key, pair] of ties) {
		let a = pair[0].home;
		let b = pair[0].away;
		if (pair[0].leg === 2) {
			a = pair[0].away;
			b = pair[0].home;
		}
		let ag = 0;
		let bg = 0;
		for (const f of pair) {
			const homeIsA = f.home === a;
			ag += homeIsA ? f.hg : f.ag;
			bg += homeIsA ? f.ag : f.hg;
		}
		winners.push(ag === bg ? hash(key) % 2 ? b : a : ag > bg ? a : b);
	}
	return winners;
}
function advanceKo(save, from, to, d1, d2, label) {
	if (save.fixtures.some((f) => f.comp === "cup" && f.round === to)) return;
	const winners = winnersOf(save, from);
	if (!winners || winners.length < 2) return;
	save.fixtures.push(...knockoutPairs(save, winners, to, d1, d2, label));
}
function advanceFinal(save, from, round, date, label) {
	if (save.fixtures.some((f) => f.comp === "cup" && f.round === round)) return;
	const winners = winnersOf(save, from);
	if (!winners || winners.length < 2) return;
	save.fixtures.push(fx({
		id: `cup-${save.season}-final`,
		league: "rpl",
		round,
		date,
		home: winners[0],
		away: winners[1],
		comp: "cup",
		label
	}));
}
function knockedOut(f, user) {
	if (f.hg == null || f.ag == null) return false;
	if ((f.round ?? 0) < 100) return false;
	if (f.leg === 1) return false;
	const homeWin = f.hg > f.ag;
	const userHome = f.home === user;
	if (f.hg === f.ag) return false;
	return userHome ? !homeWin : homeWin;
}
function noteEuroResult(save, f) {
	if (!f.comp || f.comp !== "ucl" && f.comp !== "uel" && f.comp !== "uecl") return;
	if (f.home !== save.clubId && f.away !== save.clubId) return;
	if (!f.label?.includes("общий этап")) return;
	const mine = f.home === save.clubId ? f.hg : f.ag;
	const opp = f.home === save.clubId ? f.ag : f.hg;
	save.euro.gf += mine;
	save.euro.ga += opp;
	if (mine > opp) save.euro.pts += 3;
	else if (mine === opp) save.euro.pts += 1;
}
function progressEuro(save) {
	const comp = save.euro.comp;
	if (!comp || comp === "uclq") return;
	const mine = save.fixtures.filter((f) => f.comp === comp && (f.home === save.clubId || f.away === save.clubId));
	const qual = mine.filter((f) => f.label?.includes("квалиф"));
	if (save.euro.stage === "qual" && qual.length && qual.every((f) => f.played)) {
		const agg = aggOf(qual, save.clubId);
		if (agg.me > agg.them) {
			save.euro.stage = "league";
			save.euro.comp = "ucl";
			save.euro.pts = 0;
			save.euro.gf = 0;
			save.euro.ga = 0;
			save.fixtures.push(...euroLeague(save));
		} else {
			save.euro.comp = "uel";
			save.euro.stage = "league";
			save.euro.pts = 0;
			save.euro.gf = 0;
			save.euro.ga = 0;
			save.fixtures.push(...euroLeague(save));
		}
	}
	const league = mine.filter((f) => f.label?.includes("общий этап"));
	if (save.euro.stage === "league" && league.length >= 4 && league.every((f) => f.played)) {
		const need = Math.max(8, Math.round(league.length * 1.25));
		if (save.euro.pts >= need) {
			save.euro.stage = "ko";
			save.euro.round = 1;
			save.fixtures.push(...euroTie(save, 1));
		} else save.euro.stage = "out";
	}
	if (save.euro.stage === "ko") {
		const round = save.euro.round;
		const legs = mine.filter((f) => f.label?.includes(`раунд ${round}`));
		if (legs.length && legs.every((f) => f.played)) {
			const agg = aggOf(legs, save.clubId);
			if (agg.me < agg.them || agg.me === agg.them && hash(legs[0].id) % 2) {
				save.euro.stage = "out";
				return;
			}
			if (round >= 4) {
				save.euro.stage = "done";
				return;
			}
			save.euro.round = round + 1;
			save.fixtures.push(...euroTie(save, save.euro.round));
		}
	}
}
function aggOf(legs, user) {
	let me = 0;
	let them = 0;
	for (const f of legs) {
		if (f.hg == null || f.ag == null) continue;
		if (f.home === user) {
			me += f.hg;
			them += f.ag;
		} else {
			me += f.ag;
			them += f.hg;
		}
	}
	return {
		me,
		them
	};
}
function euroQual(save) {
	const opp = pickEuro(save, "uclq", 1)[0];
	if (!opp) return [];
	ensureClub(save, opp);
	const d1 = shiftYear("2026-07-15", save.season);
	const d2 = shiftYear("2026-07-22", save.season);
	return [fx({
		id: `uclq-${save.season}-1`,
		league: "euro",
		round: 1,
		date: d1,
		home: opp,
		away: save.clubId,
		comp: "ucl",
		label: "ЛЧ · квалификация, первый матч",
		tie: "uclq",
		leg: 1
	}), fx({
		id: `uclq-${save.season}-2`,
		league: "euro",
		round: 2,
		date: d2,
		home: save.clubId,
		away: opp,
		comp: "ucl",
		label: "ЛЧ · квалификация, ответный",
		tie: "uclq",
		leg: 2
	})];
}
function euroLeague(save) {
	const comp = save.euro.comp === "ucl" ? "ucl" : save.euro.comp === "uel" ? "uel" : "uecl";
	const dates = [
		"2026-09-16",
		"2026-10-01",
		"2026-10-22",
		"2026-11-05",
		"2026-11-26",
		"2026-12-10",
		"2027-01-21",
		"2027-01-29"
	].map((d) => shiftYear(d, save.season));
	const names = comp === "ucl" ? "ЛЧ" : comp === "uel" ? "ЛЕ" : "ЛК";
	return pickEuro(save, comp, 8).map((opp, i) => {
		ensureClub(save, opp);
		const home = i % 2 === 0;
		return fx({
			id: `${comp}-${save.season}-md${i}`,
			league: "euro",
			round: 10 + i,
			date: dates[i],
			home: home ? save.clubId : opp,
			away: home ? opp : save.clubId,
			comp,
			label: `${names} · общий этап`
		});
	});
}
function euroTie(save, round) {
	const comp = save.euro.comp === "ucl" || save.euro.comp === "uel" || save.euro.comp === "uecl" ? save.euro.comp : "uecl";
	const label = `${comp === "ucl" ? "ЛЧ" : comp === "uel" ? "ЛЕ" : "ЛК"} · ${[
		"1/8",
		"1/4",
		"1/2",
		"финал"
	][round - 1] ?? "плей-офф"}`;
	const opp = pickEuro(save, comp === "ucl" ? "ucl" : comp === "uel" ? "uel" : "uecl", 8)[round] ?? pickEuro(save, "ucl", 1)[0];
	if (!opp) return [];
	ensureClub(save, opp);
	const d1 = shiftYear([
		"2027-02-17",
		"2027-03-10",
		"2027-04-14",
		"2027-06-05"
	][round - 1] ?? "2027-06-05", save.season);
	if (round >= 4) return [fx({
		id: `${comp}-${save.season}-f`,
		league: "euro",
		round: 40,
		date: d1,
		home: save.clubId,
		away: opp,
		comp,
		label: `${label} · раунд ${round}`
	})];
	const d2 = addDays(d1, 14);
	return [fx({
		id: `${comp}-${save.season}-k${round}a`,
		league: "euro",
		round: 20 + round,
		date: d1,
		home: opp,
		away: save.clubId,
		comp,
		label: `${label}, раунд ${round}, первый`,
		tie: `euro-${round}`,
		leg: 1
	}), fx({
		id: `${comp}-${save.season}-k${round}b`,
		league: "euro",
		round: 20 + round,
		date: d2,
		home: save.clubId,
		away: opp,
		comp,
		label: `${label}, раунд ${round}, ответный`,
		tie: `euro-${round}`,
		leg: 2
	})];
}
function pickEuro(save, kind, n) {
	return [...EURO.filter((e) => kind === "uclq" ? e.ticket === "uclq" || e.rep < 75 : kind === "ucl" ? e.ticket === "ucl" : kind === "uel" ? e.ticket === "uel" : e.ticket === "uecl")].sort((a, b) => hash(a.id + save.season + kind) - hash(b.id + kind)).filter((e) => e.id !== save.clubId).slice(0, n).map((e) => e.id);
}
function ensureClub(save, id) {
	if (save.clubs.some((c) => c.id === id)) return;
	const foreign = FOREIGN$1.find((c) => c.id === id);
	const euro = EURO.find((e) => e.id === id);
	const club = foreign ?? (euro ? euroToClub(euro) : void 0);
	if (!club) return;
	save.clubs.push({ ...club });
	save.players.push(...squadFor(club));
}
function materializeLeague(save, league) {
	const templates = FOREIGN$1.filter((c) => c.league === league);
	let added = false;
	for (const t of templates) {
		if (save.clubs.some((c) => c.id === t.id)) continue;
		save.clubs.push({ ...t });
		save.players.push(...squadFor(t));
		added = true;
	}
	if (!added) return;
	const clubs = save.clubs.filter((c) => c.league === league);
	const { makeLeagueFixtures } = fixtureApi();
	save.fixtures.push(...makeLeagueFixtures(clubs, league, save.season, true));
	for (const f of save.fixtures) if (f.league === league && f.date < save.date && !f.played) {
		const home = save.clubs.find((c) => c.id === f.home);
		const away = save.clubs.find((c) => c.id === f.away);
		if (!home || !away) continue;
		const r = rng(hash(f.id));
		const diff = (home.rep - away.rep) / 30;
		f.hg = Math.max(0, Math.round(r() * 2 + diff));
		f.ag = Math.max(0, Math.round(r() * 2 - diff));
		f.played = true;
	}
}
function fixtureApi() {
	const root = globalThis;
	if (!root.__kabinetFx) root.__kabinetFx = { makeLeagueFixtures: () => [] };
	return root.__kabinetFx;
}
function registerFixtures(fn) {
	fixtureApi().makeLeagueFixtures = fn;
}
function doubleRound(ids) {
	const first = circle(ids);
	return [...first, ...first.map((pairs) => pairs.map(([a, b]) => [b, a]))];
}
function circle(ids) {
	const arr = [...ids];
	if (arr.length % 2) arr.push("BYE");
	const n = arr.length;
	const rounds = [];
	for (let r = 0; r < n - 1; r++) {
		const pairs = [];
		for (let i = 0; i < n / 2; i++) {
			const a = arr[i];
			const b = arr[n - 1 - i];
			if (a !== "BYE" && b !== "BYE") pairs.push(r % 2 ? [b, a] : [a, b]);
		}
		rounds.push(pairs);
		const fixed = arr[0];
		const rest = arr.slice(1);
		rest.unshift(rest.pop());
		arr.splice(0, arr.length, fixed, ...rest);
	}
	return rounds;
}
function shiftYear(iso, season) {
	const [y, m, d] = iso.split("-");
	return `${Number(m) >= 7 ? season : season + 1}-${m}-${d}`;
}
function leaguePrize(place, league) {
	if (league === "rpl") return [
		900,
		560,
		420,
		300,
		240,
		200
	][place - 1] ?? (place <= 10 ? 80 : 30);
	if (league === "fnl") return place === 1 ? 220 : place === 2 ? 140 : place <= 4 ? 80 : 24;
	if (league === "fnl2") return place === 1 ? 90 : place === 2 ? 50 : 16;
	if (league === "fnl3") return place === 1 ? 40 : place <= 5 ? 18 : 6;
	if (league === "media") return place === 1 ? 48 : 8;
	if (league === "amateur") return place === 1 ? 8 : 2;
	return place === 1 ? 200 : place <= 3 ? 80 : 20;
}
function cupWinner(save) {
	const final = save.fixtures.find((f) => f.comp === "cup" && f.round === 500 && f.played && f.hg != null);
	if (!final) return null;
	if (final.hg === final.ag) return hash(final.id) % 2 ? final.away : final.home;
	return final.hg > final.ag ? final.home : final.away;
}
function clubOf(save, id) {
	return save.clubs.find((c) => c.id === id);
}
function playersOf(save, clubId) {
	return save.players.filter((p) => p.clubId === clubId);
}
function playerOf(save, id) {
	return save.players.find((p) => p.id === id);
}
function roleScore(p, slot) {
	const f = fit(p.pos, slot);
	let skill = 10;
	if (slot === "GK") skill = p.gk * .75 + p.men * .15 + p.def * .1;
	else if (slot === "DC" || slot === "DR" || slot === "DL") skill = p.def * .5 + p.strn * .18 + p.pac * .14 + p.men * .18;
	else if (slot === "DM") skill = p.def * .32 + p.pas * .28 + p.men * .22 + p.tec * .18;
	else if (slot === "MC") skill = p.pas * .32 + p.tec * .24 + p.men * .18 + p.sta * .14 + p.def * .12;
	else if (slot === "AM" || slot === "MR" || slot === "ML") skill = p.tec * .28 + p.pac * .24 + p.pas * .2 + p.sho * .18 + p.men * .1;
	else skill = p.sho * .4 + p.pac * .24 + p.tec * .2 + p.strn * .16;
	const ovrSkill = p.ovr ? p.ovr / 5.15 : skill;
	skill = skill * .42 + ovrSkill * .58;
	const ready = (.72 + p.cond / 380) * (.82 + p.mor / 560) * (.86 + p.sharp / 700);
	const ageK = p.age >= 36 ? .74 : p.age >= 34 ? .8 : p.age >= 32 ? .86 : p.age >= 30 ? .9 : p.age <= 19 ? .96 : 1;
	const tired = p.cond < 48 ? .8 : p.cond < 62 ? .88 : p.cond < 75 ? .95 : 1;
	return skill * f * ready * ageK * tired;
}
function available(p) {
	return p.injured <= 0 && p.ban <= 0;
}
function autoXi(save, clubId, formation = "4-3-3") {
	const slots = FORMATIONS[formation];
	const pool = playersOf(save, clubId).filter(available);
	const used = /* @__PURE__ */ new Set();
	return slots.map((slot) => {
		let best = null;
		let score = -1;
		for (const p of pool) {
			if (used.has(p.id)) continue;
			const s = roleScore(p, slot.pos);
			if (s > score) {
				score = s;
				best = p;
			}
		}
		if (best) used.add(best.id);
		return best?.id ?? "";
	});
}
function xiStrength(save, ids, formation, tactics) {
	const slots = FORMATIONS[formation];
	let sum = 0;
	let att = 0;
	let def = 0;
	let attN = 0;
	let defN = 0;
	ids.forEach((id, i) => {
		const p = id ? playerOf(save, id) : void 0;
		const slot = slots[i].pos;
		const s = p ? roleScore(p, slot) : 6;
		sum += s;
		if (slot === "GK" || slot === "DC" || slot === "DR" || slot === "DL" || slot === "DM") {
			def += s;
			defN++;
		} else {
			att += s;
			attN++;
		}
	});
	let mod = 1;
	let attK = 1;
	let defK = 1;
	if (tactics) {
		const k = tacticMods(tactics);
		mod = k.mod;
		attK = k.att;
		defK = k.def;
	}
	return {
		avg: sum / 11 * mod,
		att: att / Math.max(1, attN) * attK * mod,
		def: def / Math.max(1, defN) * defK
	};
}
function tacticMods(t) {
	if (!t) return {
		mod: 1,
		att: 1,
		def: 1,
		concede: 1
	};
	let mod = 1 + t.mentality * .02;
	let att = 1 + Math.max(0, t.mentality) * .045;
	let def = 1 + Math.max(0, -t.mentality) * .045;
	att *= 1 + (t.tempo - 2) * .035;
	def *= 1 + (2 - t.line) * .04;
	const concede = 1 + (t.line - 2) * .045 + Math.max(0, t.press - 2) * .02;
	att *= 1 + (t.width - 2) * .03;
	mod *= 1 + (t.press - 2) * .015;
	if (t.style === "bus") {
		att *= .84;
		def *= 1.16;
	} else if (t.style === "counter") {
		att *= t.mentality <= 0 ? 1.1 : 1.04;
		def *= 1.06;
	} else if (t.style === "direct") att *= 1.08;
	else if (t.style === "gegen") {
		att *= 1.1;
		def *= .94;
	} else if (t.style === "wing") att *= 1.06;
	else if (t.style === "vertical") {
		att *= 1.09;
		def *= .98;
	} else {
		att *= t.tempo <= 2 ? 1.06 : 1.02;
		def *= 1.03;
	}
	return {
		mod,
		att,
		def,
		concede
	};
}
function poisson(lambda, r) {
	const L = Math.exp(-Math.max(.05, lambda));
	let k = 0;
	let p = 1;
	do {
		k++;
		p *= r();
	} while (p > L && k < 12);
	return k - 1;
}
function squadOvr(save, ids) {
	let n = 0;
	let sum = 0;
	for (const id of ids) {
		const p = id ? playerOf(save, id) : void 0;
		if (!p) continue;
		sum += overall(p);
		n++;
	}
	return n ? Math.round(sum / n * 10) / 10 : 60;
}
function difficultyEdge(diff, gap) {
	if (diff === "novice") return {
		user: 1.9 + Math.max(0, gap) * .02,
		opp: .36,
		draw: 0
	};
	if (diff === "pro") return {
		user: clamp$1(.78 + gap * .028, .38, 1.65),
		opp: clamp$1(1.12 - gap * .018, .45, 1.55),
		draw: gap < 9 ? .14 : .04
	};
	if (diff === "world") {
		const bonus = Math.max(0, gap - 6);
		return {
			user: clamp$1(.7 + bonus * .09 + Math.min(0, gap) * .045, .3, 1.85),
			opp: clamp$1(1.15 - bonus * .065 - Math.min(0, gap) * .03, .4, 1.65),
			draw: gap < 9 ? .14 : .04
		};
	}
	return {
		user: clamp$1(1.08 + gap * .04, .5, 1.8),
		opp: clamp$1(1.02 - gap * .025, .45, 1.5),
		draw: Math.abs(gap) < 3 ? .06 : 0
	};
}
function scaleSides(save, homeId, awayId, homeIds, awayIds, lh, la) {
	const userHome = homeId === save.clubId;
	const userAway = awayId === save.clubId;
	const diff = save.difficulty ?? "experienced";
	if (!userHome && !userAway) {
		if (diff === "world") return {
			lh: lh * .82,
			la: la * .82
		};
		if (diff === "pro") return {
			lh: lh * .92,
			la: la * .92
		};
		if (diff === "novice") return {
			lh: lh * 1.08,
			la: la * 1.08
		};
		return {
			lh,
			la
		};
	}
	const k = difficultyEdge(diff, squadOvr(save, userHome ? homeIds : awayIds) - squadOvr(save, userHome ? awayIds : homeIds));
	let u = (userHome ? lh : la) * k.user;
	let o = (userHome ? la : lh) * k.opp;
	if (k.draw) {
		u *= 1 - k.draw;
		o *= 1 - k.draw * .5;
	}
	u = clamp$1(u, .05, 3.4);
	o = clamp$1(o, .04, 3.1);
	return userHome ? {
		lh: u,
		la: o
	} : {
		lh: o,
		la: u
	};
}
function quickScore(save, homeId, awayId, seed) {
	const r = rng(hash(seed));
	const homeT = homeId === save.clubId ? save.tactics : clubTactics(homeId);
	const awayT = awayId === save.clubId ? save.tactics : clubTactics(awayId);
	const homeIds = homeId === save.clubId && save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, homeId, homeT.formation);
	const awayIds = awayId === save.clubId && save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, awayId, awayT.formation);
	const hs = xiStrength(save, homeIds, homeT.formation, homeT);
	const as = xiStrength(save, awayIds, awayT.formation, awayT);
	let lh = clamp$1(.32 + hs.att / Math.max(8, as.def) * .95 * 1.08, .25, 3.3);
	let la = clamp$1(.28 + as.att / Math.max(8, hs.def) * .9, .2, 3.1);
	const scaled = scaleSides(save, homeId, awayId, homeIds, awayIds, lh, la);
	lh = scaled.lh;
	la = scaled.la;
	return [poisson(lh, r), poisson(la, r)];
}
function clamp$1(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function simulateSegment(save, home, away, from, to, seed, score) {
	const r = rng(hash(seed + ":" + from));
	const hs = xiStrength(save, home.ids, home.formation, home.tactics);
	const as = xiStrength(save, away.ids, away.formation, away.tactics);
	const homeBoost = 1.08;
	const pressH = home.tactics ? home.tactics.press : 2;
	const pressA = away.tactics ? away.tactics.press : 2;
	const setH = save.focus === "set" && home.clubId === save.clubId ? 1.18 : 1;
	const setA = save.focus === "set" && away.clubId === save.clubId ? 1.18 : 1;
	const focusAtt = (id) => save.focus === "attack" && id === save.clubId ? 1.06 : 1;
	const focusDef = (id) => save.focus === "defence" && id === save.clubId ? 1.06 : 1;
	const span = (to - from) / 90;
	const th = tacticMods(home.tactics);
	const ta = tacticMods(away.tactics);
	let lh = clamp$1((.28 + hs.att * focusAtt(home.clubId) / Math.max(8, as.def / focusDef(away.clubId))) * homeBoost * setH * span * th.att * ta.concede, .15, 2.8);
	let la = clamp$1((.24 + as.att * focusAtt(away.clubId) / Math.max(8, hs.def / focusDef(home.clubId))) * setA * span * ta.att * th.concede, .12, 2.6);
	const scaled = scaleSides(save, home.clubId, away.clubId, home.ids, away.ids, lh, la);
	lh = scaled.lh;
	la = scaled.la;
	const events = [];
	let xgH = 0;
	let xgA = 0;
	const chances = (lambda, side) => {
		const n = poisson(lambda * 3.1, r);
		for (let i = 0; i < n; i++) {
			const min = from + 1 + Math.floor(r() * Math.max(1, to - from - 1));
			const xg = .06 + r() * (.28 + lambda * .08);
			const plan = side === "h" ? home : away;
			const slots = FORMATIONS[plan.formation];
			const attackers = plan.ids.map((id, idx) => ({
				id,
				pos: slots[idx].pos,
				p: id ? playerOf(save, id) : void 0
			})).filter((x) => x.p && x.pos !== "GK" && x.pos !== "DC");
			const pickFrom = attackers.length ? attackers : plan.ids.map((id, idx) => ({
				id,
				pos: slots[idx].pos,
				p: playerOf(save, id)
			})).filter((x) => x.p);
			const scorer = pickFrom[Math.floor(r() * pickFrom.length)];
			const name = scorer.p ? playerName(scorer.p) : "Игрок";
			const gk = playerOf(save, (side === "h" ? away : home).ids[0] || "");
			const gkName = gk ? playerName(gk) : "вратарь";
			const goal = r() < xg * (scorer.p ? .75 + scorer.p.sho / 40 : 1);
			if (side === "h") xgH += xg;
			else xgA += xg;
			if (goal) {
				if (side === "h") score.h++;
				else score.a++;
				const club = side === "h" ? home.clubId : away.clubId;
				const cname = save.clubs.find((c) => c.id === club)?.name ?? "хозяева";
				const how = r();
				const text = how < .22 ? `${name} обыгрывает защитника и закатывает мяч в дальний угол — ${score.h}:${score.a}.` : how < .5 ? `${name} замыкает передачу в касание, вратарь бессилен, и «${cname}» ведёт ${score.h}:${score.a}.` : how < .78 ? `${name} бьёт в дальний угол с линии штрафной, мяч в сетке — ${score.h}:${score.a}.` : `${name} добивает после рикошета, и «${cname}» празднует гол, ${score.h}:${score.a}.`;
				events.push({
					min,
					text,
					kind: "goal",
					pid: scorer.id,
					side,
					piece: "open"
				});
			} else {
				const how = r();
				const club = side === "h" ? home.clubId : away.clubId;
				const cname = save.clubs.find((c) => c.id === club)?.name ?? "атакующие";
				if (how < .62) events.push({
					min,
					text: `${gkName} в падении забирает удар ${name}, мяч остаётся в игре, и «${cname}» продолжает владение.`,
					kind: "miss",
					side,
					pid: scorer.id,
					piece: "open"
				});
				else if (how < .84) events.push({
					min,
					text: `${name} бьёт мимо, защитник подхватывает отскок и сразу ведёт мяч вперёд.`,
					kind: "miss",
					side,
					pid: scorer.id,
					piece: "open"
				});
				else if (how < .93) events.push({
					min,
					text: `Удар ${name} проходит рядом со штангой, защитник выносит мяч на угловой.`,
					kind: "dead",
					side,
					pid: scorer.id,
					piece: "corner"
				});
				else events.push({
					min,
					text: `Защитник в подкате выбивает мяч из-под ${name}, игра останавливается из-за аута.`,
					kind: "dead",
					side,
					pid: scorer.id,
					piece: "throw"
				});
			}
		}
	};
	chances(lh, "h");
	chances(la, "a");
	const cards = (plan, press) => {
		const n = r() < .15 + press * .06 ? 1 : 0;
		for (let i = 0; i < n; i++) {
			const id = plan.ids[Math.floor(r() * plan.ids.length)];
			const p = playerOf(save, id);
			if (!p) continue;
			const min = from + 1 + Math.floor(r() * Math.max(1, to - from - 1));
			events.push({
				min,
				text: `${playerName(p)} срывает атаку грубым подкатом и получает жёлтую карточку от арбитра.`,
				kind: "card",
				pid: p.id
			});
		}
	};
	cards(home, pressH);
	cards(away, pressA);
	if (r() < .04) {
		const plan = r() < .5 ? home : away;
		const id = plan.ids[1 + Math.floor(r() * 10)] || plan.ids[0];
		const p = id ? playerOf(save, id) : void 0;
		const min = Math.min(to, from + 1 + Math.floor(r() * Math.max(1, to - from)));
		if (p) events.push({
			min,
			text: `${playerName(p)} прихрамывает после стыка и просит паузу, чтобы оказать помощь.`,
			kind: "info",
			pid: p.id
		});
	}
	events.sort((a, b) => a.min - b.min || a.text.localeCompare(b.text, "ru"));
	const spanMin = Math.max(1, to - from);
	const openN = spanMin >= 20 ? 5 : 2;
	for (let i = 0; i < openN; i++) {
		const side = r() < .5 ? "h" : "a";
		const plan = side === "h" ? home : away;
		const slots = FORMATIONS[plan.formation];
		const out = plan.ids.map((id, idx) => ({
			id,
			pos: slots[idx].pos,
			p: id ? playerOf(save, id) : void 0
		})).filter((x) => x.p && x.pos !== "GK");
		if (!out.length) continue;
		const a = out[Math.floor(r() * out.length)];
		const b = out[Math.floor(r() * out.length)];
		const name = playerName(a.p);
		const mate = playerName(b.p);
		const min = Math.min(to, from + Math.max(1, Math.round((i + .35) / openN * Math.max(1, to - from))));
		const roll = r();
		const carrier = roll < .55 ? a : b;
		const text = roll < .28 ? `${name} принимает мяч в ноги и ведёт его через центр, соперник пятится.` : roll < .5 ? `${name} ускоряется с мячом по флангу и тащит его до чужой трети.` : roll < .72 ? `${name} в касание отдаёт на ${mate}, тот контролирует мяч и продолжает движение.` : roll < .88 ? `${name} обыгрывает оппонента корпусом и катит мяч дальше вперёд.` : `${name} держит мяч в опорной зоне, команда смещается и открывается под передачу.`;
		events.push({
			min,
			text,
			kind: "info",
			side,
			pid: carrier.id,
			piece: "open"
		});
	}
	const side = r() < .5 ? "h" : "a";
	const plan = side === "h" ? home : away;
	const other = side === "h" ? away : home;
	const slots = FORMATIONS[plan.formation];
	const shooters = plan.ids.map((id, idx) => ({
		id,
		pos: slots[idx].pos,
		p: id ? playerOf(save, id) : void 0
	})).filter((x) => x.p && x.pos !== "GK");
	const taker = [...shooters].sort((a, b) => b.p.sho + b.p.tec - (a.p.sho + a.p.tec))[0];
	const mate = shooters.find((x) => x.id !== taker?.id) ?? taker;
	const gk = playerOf(save, other.ids[0] || "");
	const min = Math.min(to, from + 1 + Math.floor(r() * Math.max(1, to - from - 1)));
	if (taker?.p && r() < Math.min(.8, spanMin / 26)) {
		const name = playerName(taker.p);
		const gkName = gk ? playerName(gk) : "вратарь";
		const roll = r();
		if (roll < .42) {
			const mateName = mate?.p ? playerName(mate.p) : "партнёра";
			events.push({
				min,
				text: `Аут. ${name} берёт мяч у боковой и вбрасывает руками на ${mateName}, тот принимает в ноги.`,
				kind: "dead",
				side,
				pid: taker.id,
				piece: "throw"
			});
		} else if (roll < .7) events.push({
			min,
			text: `Угловой. ${name} сам подходит к флажку и навешивает в штрафную, стенка соперника не успевает.`,
			kind: "dead",
			side,
			pid: taker.id,
			piece: "corner",
			shot: "chip"
		});
		else if (roll < .78) {
			const scored = r() < .72 + taker.p.sho / 80;
			const placed = r() < .5;
			if (scored) {
				if (side === "h") score.h++;
				else score.a++;
				events.push({
					min,
					text: `Пенальти. ${name} сам разбегается и бьёт ${placed ? "низом в угол" : "мощно под перекладину"}, ${gkName} не достаёт — ${score.h}:${score.a}.`,
					kind: "goal",
					side,
					pid: taker.id,
					piece: "pen",
					shot: placed ? "placed" : "power"
				});
			} else events.push({
				min,
				text: `Пенальти. ${name} бьёт с точки, ${gkName} угадывает угол и забирает мяч.`,
				kind: "miss",
				side,
				pid: taker.id,
				piece: "pen",
				shot: placed ? "placed" : "power"
			});
		} else {
			const shot = r() < .34 ? "chip" : r() < .7 ? "curl" : "power";
			const scored = r() < (shot === "curl" ? .34 : shot === "chip" ? .28 : .2) * (.7 + taker.p.sho / 20);
			const how = shot === "chip" ? `${name} сам разбегается и перекидывает стенку навесной дугой` : shot === "curl" ? `${name} закручивает мяч в обход стенки, тот пролетает сбоку` : `${name} бьёт с прямого штрафного в створ`;
			if (scored) {
				if (side === "h") score.h++;
				else score.a++;
				events.push({
					min,
					text: `Штрафной. ${how}, мяч в сетке — ${score.h}:${score.a}.`,
					kind: "goal",
					side,
					pid: taker.id,
					piece: "fk",
					shot
				});
			} else events.push({
				min,
				text: `Штрафной. ${how}, но ${gkName} снимает мяч.`,
				kind: "dead",
				side,
				pid: taker.id,
				piece: "fk",
				shot
			});
		}
	}
	events.sort((a, b) => a.min - b.min || (a.piece && a.piece !== "open" ? 1 : 0) - (b.piece && b.piece !== "open" ? 1 : 0));
	return {
		events,
		xgH,
		xgA
	};
}
function userFixture(save) {
	return save.fixtures.filter((f) => !f.played && (f.home === save.clubId || f.away === save.clubId)).sort((a, b) => a.date.localeCompare(b.date))[0];
}
function tableOf(save, league) {
	const rows = save.clubs.filter((c) => c.league === league).map((c) => ({
		club: c,
		p: 0,
		w: 0,
		d: 0,
		l: 0,
		gf: 0,
		ga: 0,
		pts: 0
	}));
	const map = new Map(rows.map((r) => [r.club.id, r]));
	for (const f of save.fixtures) {
		if ((f.comp ?? "league") !== "league") continue;
		if (f.league !== league || !f.played || f.hg == null || f.ag == null) continue;
		const h = map.get(f.home);
		const a = map.get(f.away);
		if (!h || !a) continue;
		h.p++;
		a.p++;
		h.gf += f.hg;
		h.ga += f.ag;
		a.gf += f.ag;
		a.ga += f.hg;
		if (f.hg > f.ag) {
			h.w++;
			a.l++;
			h.pts += 3;
		} else if (f.hg < f.ag) {
			a.w++;
			h.l++;
			a.pts += 3;
		} else {
			h.d++;
			a.d++;
			h.pts++;
			a.pts++;
		}
	}
	rows.sort((a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf || a.club.name.localeCompare(b.club.name, "ru"));
	return rows;
}
function rowZone(league, index, total) {
	const place = index + 1;
	if (league === "rpl") {
		if (place <= 2) return "ucl";
		if (place === 3) return "qual";
		if (place === 4) return "uel";
		if (place === 5 || place === 6) return "uecl";
		if (total >= 8 && place >= total - 1) return "down";
		if (total >= 8 && place > total - 4) return "po";
		return "";
	}
	if (league === "fnl" || league === "fnl2" || league === "fnl3") {
		if (place <= 2) return "up";
		if (league === "fnl" && (place === 3 || place === 4)) return "po";
		if (place === 5) return "pyr";
		if (league !== "fnl3" && total >= 8 && place > total - 4) return "down";
		return "";
	}
	return "";
}
function placeOf(save) {
	const club = clubOf(save, save.clubId);
	const table = tableOf(save, club.league);
	return {
		place: table.findIndex((r) => r.club.id === save.clubId) + 1,
		table,
		club
	};
}
function wageBill(save, clubId = save.clubId) {
	return playersOf(save, clubId).reduce((s, p) => s + p.wage, 0);
}
function applyMatchLoad(save, ids, goals, cards, ratings) {
	const used = new Set(ids);
	for (const p of save.players) {
		if (!used.has(p.id)) continue;
		p.apps++;
		p.ratingSum += ratings[p.id] ?? 6.6;
		if (goals.includes(p.id)) p.goals++;
	}
	for (const id of cards) {
		const p = playerOf(save, id);
		if (!p) continue;
		p.yellow++;
		if (p.yellow >= 4) {
			p.yellow = 0;
			p.ban = 1;
		}
	}
}
function remapXi(save, ids, formation) {
	const slots = FORMATIONS[formation];
	const pool = ids.map((id) => playerOf(save, id)).filter((p) => !!p);
	const used = /* @__PURE__ */ new Set();
	return slots.map((slot) => {
		let best = null;
		let score = -1;
		for (const p of pool) {
			if (used.has(p.id)) continue;
			const s = roleScore(p, slot.pos);
			if (s > score) {
				score = s;
				best = p;
			}
		}
		if (best) used.add(best.id);
		return best?.id ?? "";
	});
}
function growFromMatch(save, id, rating, minutes, fatigue = true) {
	const p = playerOf(save, id);
	if (!p || !p.ovr) return 0;
	const played = minutes >= 20;
	const room = p.growth;
	const cap = p.age <= 21 ? 4 : p.age <= 24 ? 3 : p.age <= 28 ? 2 : 1;
	const underCeiling = p.age >= 30 ? room < 1 : p.ovr < p.pot;
	let delta = 0;
	if (played && p.age < 33 && room < cap && underCeiling) {
		if (p.age <= 23 && rating >= 6.9 && Math.random() < .28) delta = 1;
		else if (p.age <= 28 && rating >= 7.6 && Math.random() < .12) delta = 1;
		else if (p.age >= 30 && rating >= 8.2 && room < 1) delta = 1;
	}
	if (p.age >= 32 && minutes >= 60 && rating < 6.3 && Math.random() < .22) delta = -1;
	if (delta > 0) {
		p.ovr += 1;
		p.growth += 1;
		if (p.ovr > p.pot) p.pot = p.ovr;
	} else if (delta < 0) p.ovr = Math.max(44, p.ovr - 1);
	const club = save.clubs.find((c) => c.id === p.clubId);
	if (club) p.value = priceRub(p.ovr, p.age, club.league, club.rep);
	if (fatigue) {
		const drop = Math.round(minutes / 11 + (p.age >= 34 ? 8 : p.age >= 30 ? 5 : 0) + (p.sta < 11 ? 3 : 0));
		p.cond = clamp$1(Math.round(p.cond - drop), 28, 100);
	}
	p.sharp = clamp$1(Math.round(p.sharp + (minutes >= 25 ? 3 : -2)), 20, 100);
	return delta;
}
function moraleSwing(save, clubId, gf, ga, home) {
	const delta = gf > ga ? 6 : gf === ga ? 1 : -5;
	for (const p of playersOf(save, clubId)) p.mor = clamp$1(p.mor + delta + (p.men - 12), 20, 99);
	if (clubId === save.clubId) {
		const expect = clubOf(save, clubId).rep;
		const swing = gf > ga ? 5 : gf === ga ? 0 : -6;
		const weight = expect > 80 && gf <= ga ? -3 : expect < 62 && gf > ga ? 3 : 0;
		save.confidence = clamp$1(save.confidence + swing + weight, 1, 99);
	}
}
function restClub(save, clubId, days) {
	for (const p of playersOf(save, clubId)) {
		if (p.injured > 0) p.injured = Math.max(0, p.injured - days);
		else p.cond = clamp$1(Math.round(p.cond + (save.focus === "rest" && clubId === save.clubId ? 8 : 4) * Math.min(1, days / 3)), 28, 100);
		if (save.focus !== "rest" || clubId !== save.clubId) p.sharp = clamp$1(p.sharp - (days > 10 ? 4 : 0), 30, 100);
		if (p.ban > 0 && days >= 6) p.ban = Math.max(0, p.ban - 1);
	}
}
function train(save, focus) {
	save.focus = focus;
	const note = focus === "attack" ? "Установка на последний пас и удар. Острота форвардов выше, ноги гудят." : focus === "defence" ? "Оборона в малых составах. Линия собраннее, атаки чуть тупее." : focus === "set" ? "Стандарты: розыгрыш корнера и стенка. Шанс со стандарта выше обычного." : focus === "physical" ? "Объём. Скорость и борьба прибавят, кондиции просядут." : "Восстановление. Кондиции вверх, острота чуть спадёт.";
	for (const p of playersOf(save, save.clubId)) {
		if (p.injured > 0) continue;
		if (focus === "rest") {
			p.cond = clamp$1(Math.round(p.cond + 12), 0, 100);
			p.sharp = clamp$1(p.sharp - 2, 0, 100);
		} else if (focus === "physical") {
			p.cond = clamp$1(p.cond - 5, 36, 100);
			p.sharp = clamp$1(p.sharp + 4, 0, 100);
			if (p.age <= 23 && p.ovr < p.pot && p.growth < 4 && Math.random() < .06) {
				p.sta = clamp$1(p.sta + 1, 1, 20);
				p.ovr += 1;
				p.growth += 1;
			}
		} else if (focus === "attack" && (p.pos === "ST" || p.pos === "AM" || p.pos === "MR" || p.pos === "ML")) {
			p.sharp = clamp$1(p.sharp + 8, 0, 100);
			p.cond = clamp$1(p.cond - 3, 36, 100);
		} else if (focus === "defence" && (p.pos === "DC" || p.pos === "GK" || p.pos === "DM" || p.pos === "DR" || p.pos === "DL")) {
			p.sharp = clamp$1(p.sharp + 8, 0, 100);
			p.cond = clamp$1(p.cond - 3, 36, 100);
		} else if (focus === "set") p.sharp = clamp$1(p.sharp + 4, 0, 100);
	}
	pushMsg(save, "Тренерский штаб", "Тренировка проведена", note);
}
function pushMsg(save, from, title, body, extra) {
	save.inbox.unshift({
		id: "msg-" + hash(save.date + title + body + save.inbox.length),
		date: save.date,
		from,
		title,
		body,
		read: false,
		...extra
	});
	save.inbox = save.inbox.slice(0, 40);
}
function simFixture(save, f) {
	if (f.played) return;
	const [hg, ag] = quickScore(save, f.home, f.away, f.id);
	f.hg = hg;
	f.ag = ag;
	f.played = true;
	moraleSwing(save, f.home, hg, ag, true);
	moraleSwing(save, f.away, ag, hg, false);
	noteEuroResult(save, f);
}
function flushOthers(save, date) {
	for (const f of save.fixtures) {
		if (f.played || f.date !== date) continue;
		if (f.home === save.clubId || f.away === save.clubId) continue;
		simFixture(save, f);
	}
}
function advanceTo(save, target, autoUser) {
	let guard = 0;
	while (save.date < target && guard++ < 400) {
		save.date = addDays(save.date, 1);
		if (save.date.endsWith("-01")) monthly(save);
		if (weekday(save.date) === 1) {
			const bill = wageBill(save) / 1e3;
			save.balance = Math.round((save.balance - bill) * 10) / 10;
			if (save.balance < -30) save.confidence = clamp$1(save.confidence - 2, 1, 99);
		}
		if (weekday(save.date) === 6) {
			for (const p of save.players) if (p.ban > 0) p.ban = Math.max(0, p.ban - 1);
		}
		for (const c of save.clubs) restClub(save, c.id, 1);
		for (const p of playersOf(save, save.clubId)) if (p.injured <= 0) p.cond = clamp$1(Math.round(p.cond + (save.focus === "rest" ? 1 : 0)), 28, 100);
		for (const f of save.fixtures) {
			if (f.played || f.date !== save.date) continue;
			const user = f.home === save.clubId || f.away === save.clubId;
			if (user && !autoUser && save.date === target) continue;
			if (user && !autoUser) continue;
			if (user) {
				const [hg, ag] = quickScore(save, f.home, f.away, f.id);
				f.hg = hg;
				f.ag = ag;
				f.played = true;
				const weHome = f.home === save.clubId;
				const gf = weHome ? hg : ag;
				const ga = weHome ? ag : hg;
				moraleSwing(save, save.clubId, gf, ga, weHome);
				noteEuroResult(save, f);
				save.played++;
				save.log.unshift(`${formatShort(f.date)}  ${gf}:${ga} ${weHome ? "д" : "г"}`);
				pushMsg(save, "Помощник", `Матч сыгран без вас: ${gf}:${ga}`, "Вы ушли с матча в календарь. Состав отработал по установке.");
				checkSack(save);
			} else simFixture(save, f);
		}
		maybeRumors(save);
		progressCompetitions(save);
	}
}
function formatShort(iso) {
	const [y, m, d] = iso.split("-");
	return `${d}.${m}.${y.slice(2)}`;
}
function monthly(save) {
	const club = clubOf(save, save.clubId);
	const sponsor = Math.round(club.rep * .55);
	save.balance = Math.round((save.balance + sponsor) * 10) / 10;
	for (const p of save.players) if (p.age <= 23 && p.sharp > 60 && Math.random() < .12) {
		const key = p.pos === "GK" ? "gk" : p.pos === "ST" ? "sho" : p.pos === "DC" ? "def" : "pas";
		p[key] = clamp$1(p[key] + 1, 1, 20);
	} else if (p.age >= 33 && Math.random() < .1) p.pac = clamp$1(p.pac - 1, 1, 20);
	if (!isWinter(save.date, save.season)) pushMsg(save, "Бухгалтерия", "Спонсорский транш", `На счёт пришло ${money(sponsor)}. Зарплаты списываются по понедельникам.`);
}
function maybeRumors(save) {
	if (!windowOpen(save.date, save.season)) return;
	if (hash(save.date + save.clubId) % 17 !== 0) return;
	const mine = playersOf(save, save.clubId).filter((p) => p.injured <= 0 && overall(p) >= 12);
	if (!mine.length) return;
	const p = mine[hash(save.date) % mine.length];
	const buyers = save.clubs.filter((c) => c.id !== save.clubId && c.rep >= clubOf(save, save.clubId).rep - 8);
	if (!buyers.length) return;
	const buyer = buyers[hash(save.date + p.id) % buyers.length];
	const fee = Math.max(1, Math.round(p.value * (.85 + hash(p.id) % 30 / 100)));
	pushMsg(save, buyer.name, `Запрос по ${p.last}`, `${buyer.name} предлагает ${money(fee)} за ${playerName(p)}. Контракт игрока — ${p.contract} г., зарплата ${wageText(p.wage)}.`, { offer: {
		playerId: p.id,
		fee,
		wage: p.wage,
		clubId: buyer.id
	} });
}
function acceptOffer(save, msgId) {
	const msg = save.inbox.find((m) => m.id === msgId);
	if (!msg?.offer) return "Предложения нет";
	const p = playerOf(save, msg.offer.playerId);
	if (!p || p.clubId !== save.clubId) return "Игрок уже не ваш";
	p.clubId = msg.offer.clubId;
	p.listed = false;
	save.budget += msg.offer.fee;
	save.tactics.slots = save.tactics.slots.map((id) => id === p.id ? "" : id);
	msg.offer = void 0;
	msg.read = true;
	msg.body += " Вы согласились.";
	refillIfThin(save, save.clubId);
	return "";
}
function rejectOffer(save, msgId) {
	const msg = save.inbox.find((m) => m.id === msgId);
	if (!msg?.offer) return;
	msg.body += " Вы отказали.";
	msg.offer = void 0;
	msg.read = true;
}
function bid(save, playerId, fee) {
	const p = playerOf(save, playerId);
	if (!p) return "Игрок не найден";
	if (p.clubId === save.clubId) return "Это ваш игрок";
	const external = p.clubId.startsWith("pool:");
	if (!windowOpen(save.date, save.season) && p.clubId !== "free") return "Окно закрыто";
	const seller = p.clubId === "free" || external ? void 0 : save.clubs.find((c) => c.id === p.clubId);
	if (!seller && p.clubId !== "free" && !external) return "Клуб не найден";
	const me = clubOf(save, save.clubId);
	if (fee > save.budget && p.clubId !== "free") return "Не хватает трансферного бюджета";
	const bill = wageBill(save);
	const sellerRep = seller?.rep ?? (external ? 76 : 40);
	const askWage = Math.round(p.wage * (me.rep < sellerRep ? 1.25 : 1.05));
	if (bill + askWage > wageCap(me.rep)) return "Не влезает в зарплатный потолок";
	const r = rng(hash(save.date + playerId + String(fee)));
	let chance = .15 + ((p.clubId === "free" ? 1.4 : fee / Math.max(.4, p.value)) - .75) * .7 + (me.rep - sellerRep) * .008;
	if (p.age >= 32) chance += .1;
	if (p.contract <= 1 && p.clubId !== "free") chance += .12;
	if (p.mor < 55) chance += .08;
	chance = clamp$1(chance, .05, .92);
	if (p.clubId !== "free" && fee < p.value * .62) chance = Math.min(chance, .18);
	const sellerName = seller?.name ?? (external ? p.nat : "Агент");
	if (r() > chance) {
		pushMsg(save, sellerName, `${p.last} остаётся`, `${playerName(p)} отклонил переход. Нужны деньги ближе к ${dollarText(p.value)} и внятная зарплата.`);
		return "Отказ";
	}
	const from = p.clubId;
	if (from !== "free") {
		save.budget -= fee;
		if (seller) seller.budget += Math.round(fee * .8);
	} else save.balance = Math.round((save.balance - fee) * 10) / 10;
	p.clubId = save.clubId;
	p.wage = askWage;
	p.contract = p.age >= 31 ? 2 : 3;
	p.mor = clamp$1(p.mor + 8, 0, 99);
	p.listed = false;
	p.renewed = false;
	if (from !== "free" && !external) refillIfThin(save, from);
	pushMsg(save, "Спортивный директор", `${p.last} — наш`, `${playerName(p)} подписал контракт. Платёж ${dollarText(fee)}. Зарплата ${wageText(p.wage)}.`);
	return "";
}
function refillIfThin(save, clubId) {
	const have = playersOf(save, clubId);
	if (have.length >= 18) return;
	const club = clubOf(save, clubId);
	const posCycle = [
		"MC",
		"DC",
		"ST",
		"GK",
		"DR"
	];
	const missing = posCycle[have.length % posCycle.length];
	const r = rng(hash(clubId + save.date + String(have.length)));
	const p = makePlayer(club, 30 + have.length, missing, r);
	p.age = 18 + Math.floor(r() * 3);
	p.value = Math.max(.4, Math.round(p.value * .45));
	p.wage = Math.max(15, Math.round(p.wage * .5));
	save.players.push(p);
}
function interestedClubs(save) {
	const club = clubOf(save, save.clubId);
	const home = save.clubs.filter((c) => c.id !== club.id && (c.league === club.league || c.league === "fnl" || c.league === "fnl2" || c.league === "fnl3" || c.league === "media")).sort((a, b) => Math.abs(a.rep - club.rep + 6) - Math.abs(b.rep - club.rep + 6)).slice(0, 3);
	const abroadId = FOREIGN_LEAGUES[hash(save.manager + save.season) % FOREIGN_LEAGUES.length];
	materializeLeague(save, abroadId);
	const abroad = save.clubs.filter((c) => c.league === abroadId).sort((a, b) => a.rep - b.rep)[0];
	const ids = [...home.map((c) => c.id), ...abroad ? [abroad.id] : []];
	return [...new Set(ids)].slice(0, 4).map((clubId) => ({ clubId }));
}
function checkSack(save) {
	if (save.sacked) return;
	if (save.played >= 8 && save.confidence <= 16) dismiss(save, "Серия результатов не устроила клуб.");
}
function dismiss(save, why) {
	save.sacked = true;
	save.offers = interestedClubs(save);
	pushMsg(save, "Совет директоров", "Вы освобождены от должности", `${why} Доверие: ${save.confidence}. Ниже клубы, которым вы интересны — в том числе за рубежом.`);
}
function takeJob(save, clubId) {
	const known = save.clubs.find((c) => c.id === clubId);
	if (known && FOREIGN_LEAGUES.includes(known.league)) materializeLeague(save, known.league);
	save.clubId = clubId;
	save.sacked = false;
	save.confidence = 62;
	save.played = 0;
	save.badSeasons = 0;
	save.tactics = {
		...save.tactics,
		slots: Array(11).fill("")
	};
	const club = clubOf(save, clubId);
	save.budget = club.budget;
	save.balance = Math.round(club.budget * .3);
	save.offers = [];
	save.kit = {
		home: {
			design: hash(clubId) % 36,
			primary: club.color,
			secondary: club.color2,
			socks: club.color
		},
		away: {
			design: (hash(clubId) + 7) % 36,
			primary: club.color2,
			secondary: club.color,
			socks: club.color2
		}
	};
	pushMsg(save, club.name, "Контракт подписан", `Вы возглавили «${club.name}». Задача: ${taskLine(save)}.`);
}
function renewContract(save, playerId, years, wage, clause) {
	const p = playerOf(save, playerId);
	if (!p || p.clubId !== save.clubId) return "Это не ваш игрок";
	if (p.renewed) return "Контракт уже продлён в этом сезоне. Второй раз нельзя.";
	const cost = Math.max(1, Math.round(wage * years * .04));
	if (save.budget < cost) return "Не хватает трансферного бюджета на условия";
	if (wage * playersOf(save, save.clubId).reduce((s, x) => s + (x.id === p.id ? 0 : x.wage), 0) + wage > wageCap(clubOf(save, save.clubId).rep) * 1.05 && wage > p.wage) return "Зарплата не влезает в потолок";
	save.budget = Math.round((save.budget - cost) * 10) / 10;
	p.contract = years;
	p.wage = wage;
	p.clause = clause;
	p.renewed = true;
	p.mor = clamp$1(p.mor + 6, 1, 99);
	pushMsg(save, "Юрист клуба", `${p.last} продлил контракт`, `${playerName(p)} на ${years} г., ${wageText(wage)}. Условие: ${clause}. Из бюджета ушло ${money(cost)}.`);
	return "";
}
function taskLine(save) {
	const club = clubOf(save, save.clubId);
	const mates = save.clubs.filter((c) => c.league === club.league).sort((a, b) => b.rep - a.rep);
	const place = mates.findIndex((c) => c.id === club.id) + 1;
	if (place <= 2) return "верх таблицы";
	if (place > mates.length - 3) return "спасение";
	return "середина таблицы";
}
function finishSeason(save) {
	for (let pass = 0; pass < 6; pass++) {
		for (const f of save.fixtures) {
			if (f.played) continue;
			if (f.home === save.clubId || f.away === save.clubId) continue;
			simFixture(save, f);
		}
		progressCompetitions(save);
	}
	if (save.phase !== "playoff") {
		const ties = playoffCard(save);
		const mine = ties.filter((f) => f.home === save.clubId || f.away === save.clubId);
		ties.filter((f) => f.home !== save.clubId && f.away !== save.clubId).forEach((f) => simFixture(save, f));
		save.fixtures.push(...ties);
		if (mine.length) {
			save.phase = "playoff";
			pushMsg(save, "Стыки", "Назначена квалификация пирамиды", "Пятое место ФНЛ-3, ФНЛ-2, Первой лиги и РПЛ играет между собой. Кто возьмёт большинство очков, поднимается на лигу выше: из ФНЛ-3 в ФНЛ-2, из Первой лиги в РПЛ. Четыре последних места вылетают, пятое снизу уже нет. Из ФНЛ-3 не вылетают.");
			return;
		}
	}
	const meBefore = clubOf(save, save.clubId);
	const tableBefore = tableOf(save, meBefore.league);
	const row = tableBefore.findIndex((r) => r.club.id === meBefore.id) + 1;
	const n = tableBefore.length;
	const moves = [];
	payPrizes(save, moves);
	stampEuro(save);
	moves.push(...applyPyramid(save));
	for (const p of [...save.players]) {
		p.goals = 0;
		p.assists = 0;
		p.apps = 0;
		p.ratingSum = 0;
		p.yellow = 0;
		p.ban = 0;
		p.growth = 0;
		p.age += 1;
		if (p.age >= 33 && p.ovr) p.ovr = Math.max(46, p.ovr - 1);
		else if (p.age >= 31 && p.ovr && Math.random() < .4) p.ovr = Math.max(48, p.ovr - 1);
		const club = save.clubs.find((c) => c.id === p.clubId);
		if (club && p.ovr) p.value = priceRub(p.ovr, p.age, club.league, club.rep);
		p.contract = Math.round((p.contract - 1) * 10) / 10;
		p.renewed = false;
		if (p.contract <= 0 && p.clubId !== "free") {
			const old = p.clubId;
			p.clubId = "free";
			p.contract = 0;
			if (old === save.clubId) moves.push(`${playerName(p)} ушёл свободным агентом`);
		}
	}
	for (const c of save.clubs) if (c.league !== "euro") refillIfThin(save, c.id);
	const me = clubOf(save, save.clubId);
	const badLeague = meBefore.league === "fnl3" ? row > Math.ceil(n * .55) || save.confidence < 36 : row > Math.max(1, n - 4);
	if (badLeague) save.badSeasons = (save.badSeasons ?? 0) + 1;
	else save.badSeasons = 0;
	if (!save.sacked && meBefore.league === "fnl3" && (save.badSeasons >= 2 || badLeague && save.confidence < 40)) dismiss(save, save.badSeasons >= 2 ? "Два слабых сезона в ФНЛ-3. Из низшей лиги не вылетают, но клуб расстаётся с тренером." : "Слабый сезон в ФНЛ-3. Место в лиге сохраняется, работа — нет.");
	else if (!save.sacked && save.badSeasons >= 2 && save.confidence < 42) dismiss(save, "Два сезона подряд в зоне вылета.");
	save.season += 1;
	save.date = `${save.season}-07-11`;
	save.phase = "season";
	save.fixtures = rebuild(save);
	save.focus = null;
	if (!save.sacked) save.confidence = clamp$1(save.confidence + 4, 1, 99);
	save.budget = Math.round(me.budget * .35 + save.budget * .7);
	pushMsg(save, "Лига", `Сезон ${save.season - 1}/${save.season} закрыт`, `${moves.slice(0, 8).join(". ") || "Сетка лиг почти не изменилась."} Новый чемпионат — ${save.season}/${String(save.season + 1).slice(2)}. Вы в «${me.name}», ${leagueMeta(me.league).short}.`);
}
function placeId(save, league, index) {
	return tableOf(save, league)[index]?.club.id;
}
function playoffCard(save) {
	const out = [];
	const pair = (a, b, tie, label) => {
		if (!a || !b) return;
		const d1 = `${save.season + 1}-05-20`;
		const d2 = `${save.season + 1}-05-27`;
		out.push({
			id: `po-${save.season}-${tie}-1`,
			league: "rpl",
			round: 1,
			date: d1,
			home: a,
			away: b,
			played: false,
			comp: "playoff",
			label,
			tie,
			leg: 1
		}, {
			id: `po-${save.season}-${tie}-2`,
			league: "rpl",
			round: 2,
			date: d2,
			home: b,
			away: a,
			played: false,
			comp: "playoff",
			label: `${label}, ответный`,
			tie,
			leg: 2
		});
	};
	pair(placeId(save, "rpl", 12), placeId(save, "fnl", 3), "tie-a", "Стыки РПЛ · 13-е против 4-го Первой лиги");
	pair(placeId(save, "rpl", 13), placeId(save, "fnl", 2), "tie-b", "Стыки РПЛ · 14-е против 3-го Первой лиги");
	const pyr = [
		placeId(save, "fnl3", 4),
		placeId(save, "fnl2", 4),
		placeId(save, "fnl", 4),
		placeId(save, "rpl", 4)
	].filter((id) => !!id);
	const base = save.date > `${save.season + 1}-05-18` ? save.date : `${save.season + 1}-05-20`;
	const dates = [
		0,
		4,
		8,
		11,
		15,
		18
	].map((n) => addDays(base, n));
	let k = 0;
	for (let i = 0; i < pyr.length; i++) for (let j = i + 1; j < pyr.length; j++) {
		out.push({
			id: `pyr-${save.season}-${i}${j}`,
			league: "fnl3",
			round: k + 1,
			date: dates[k % dates.length],
			home: pyr[i],
			away: pyr[j],
			played: false,
			comp: "pyramid",
			label: "Квалификация пирамиды · 5-е места всех лиг"
		});
		k++;
	}
	return out;
}
function aggWinner(save, tie) {
	const legs = save.fixtures.filter((f) => f.tie === tie && f.played && f.hg != null);
	if (legs.length < 2) return null;
	const a = legs[0].leg === 2 ? legs[0].away : legs[0].home;
	const b = legs[0].leg === 2 ? legs[0].home : legs[0].away;
	let ag = 0;
	let bg = 0;
	for (const f of legs) {
		const homeA = f.home === a;
		ag += homeA ? f.hg : f.ag;
		bg += homeA ? f.ag : f.hg;
	}
	if (ag === bg) return hash(tie + save.season) % 2 ? b : a;
	return ag > bg ? a : b;
}
function applyPyramid(save) {
	const moves = [];
	const move = (id, league, note) => {
		if (!id) return;
		const c = clubOf(save, id);
		if (!c || c.league === league) return;
		const up = [
			"fnl3",
			"fnl2",
			"fnl",
			"rpl"
		].indexOf(league) > [
			"fnl3",
			"fnl2",
			"fnl",
			"rpl"
		].indexOf(c.league);
		c.league = league;
		c.rep = clamp$1(c.rep + (up ? 3 : -3), 28, 95);
		c.budget = Math.round(c.budget * (up ? 1.4 : .72));
		moves.push(`${c.name} — ${note}`);
	};
	const rpl = tableOf(save, "rpl").map((r) => r.club.id);
	const fnl = tableOf(save, "fnl").map((r) => r.club.id);
	const fnl2 = tableOf(save, "fnl2").map((r) => r.club.id);
	const fnl3 = tableOf(save, "fnl3").map((r) => r.club.id);
	move(fnl[0], "rpl", "прямой выход в РПЛ");
	move(fnl[1], "rpl", "прямой выход в РПЛ");
	move(rpl[14], "fnl", "вылет в Первую лигу");
	move(rpl[15], "fnl", "вылет в Первую лигу");
	const winA = aggWinner(save, "tie-a");
	const loseA = winA === rpl[12] ? fnl[3] : rpl[12];
	if (winA === fnl[3]) move(fnl[3], "rpl", "стыки с РПЛ");
	if (loseA === rpl[12]) move(rpl[12], "fnl", "стыки, вылет");
	const winB = aggWinner(save, "tie-b");
	const loseB = winB === rpl[13] ? fnl[2] : rpl[13];
	if (winB === fnl[2]) move(fnl[2], "rpl", "стыки с РПЛ");
	if (loseB === rpl[13]) move(rpl[13], "fnl", "стыки, вылет");
	move(fnl2[0], "fnl", "прямой выход в Первую лигу");
	move(fnl2[1], "fnl", "прямой выход в Первую лигу");
	for (const id of fnl.slice(-4)) move(id, "fnl2", "вылет в ФНЛ-2");
	move(fnl3[0], "fnl2", "прямой выход в ФНЛ-2");
	move(fnl3[1], "fnl2", "прямой выход в ФНЛ-2");
	for (const id of fnl2.slice(-4)) move(id, "fnl3", "вылет в ФНЛ-3");
	const pyrGames = save.fixtures.filter((f) => f.comp === "pyramid" && f.played && f.hg != null);
	const ids = /* @__PURE__ */ new Set();
	pyrGames.forEach((f) => {
		ids.add(f.home);
		ids.add(f.away);
	});
	const rows = [...ids].map((id) => ({
		id,
		pts: 0
	}));
	for (const f of pyrGames) if (f.hg > f.ag) rows.find((r) => r.id === f.home).pts += 3;
	else if (f.hg < f.ag) rows.find((r) => r.id === f.away).pts += 3;
	else rows.forEach((r) => {
		if (r.id === f.home || r.id === f.away) r.pts++;
	});
	rows.sort((a, b) => b.pts - a.pts || hash(b.id + save.season) - hash(a.id));
	const steps = [
		"fnl3",
		"fnl2",
		"fnl",
		"rpl"
	];
	const upOne = (league) => steps[Math.min(steps.length - 1, steps.indexOf(league) + 1)] ?? league;
	const champ = rows[0];
	const second = rows[1];
	if (champ && (!second || champ.pts > second.pts)) {
		const cc = clubOf(save, champ.id);
		if (cc && cc.league !== "rpl") move(champ.id, upOne(cc.league), "квалификация пирамиды, большинство побед");
	}
	return moves;
}
function payPrizes(save, moves) {
	const me = clubOf(save, save.clubId);
	const place = tableOf(save, me.league).findIndex((r) => r.club.id === me.id) + 1;
	let purse = leaguePrize(place, me.league);
	if (place === 1) save.log.unshift(`HONOR:${save.season}|${leagueMeta(me.league).short} — ${me.name}`);
	if (cupWinner(save) === save.clubId) {
		purse += me.league === "media" || me.league === "amateur" ? 80 : 500;
		save.log.unshift(`HONOR:${save.season}|Кубок России — ${me.name}`);
		moves.push("Кубок России ваш");
	}
	if (save.euro?.stage === "done" && save.euro.comp) {
		purse += save.euro.comp === "ucl" ? 1200 : save.euro.comp === "uel" ? 620 : 280;
		const name = save.euro.comp === "ucl" ? "Лига чемпионов" : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций";
		save.log.unshift(`HONOR:${save.season}|${name} — ${me.name}`);
	} else if ((save.euro?.pts ?? 0) >= 4) purse += 90;
	save.budget = Math.round(save.budget + purse);
	save.balance = Math.round(save.balance + purse * .35);
	if (purse > 0) moves.push(`призовые ${money(purse)}`);
}
function stampEuro(save) {
	for (const c of save.clubs) c.euro = null;
	const rpl = tableOf(save, "rpl");
	[
		"ucl",
		"ucl",
		"uclq",
		"uel",
		"uecl",
		"uecl"
	].forEach((t, i) => {
		const club = rpl[i]?.club;
		if (club) club.euro = t;
	});
}
function rebuild(save) {
	save.fixtures = makeFixtures(save.clubs, save.season);
	seedCompetitions(save, true);
	return save.fixtures;
}
function report(save, oppId) {
	const oppT = clubTactics(oppId);
	const mine = save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, save.clubId, save.tactics.formation);
	const theirs = autoXi(save, oppId, oppT.formation);
	const me = xiStrength(save, mine, save.tactics.formation, save.tactics);
	const them = xiStrength(save, theirs, oppT.formation, oppT);
	const opp = clubOf(save, oppId);
	const danger = playersOf(save, oppId).filter((p) => p.pos !== "GK").sort((a, b) => overall(b) - overall(a))[0];
	const myOvr = squadOvr(save, mine);
	const theirOvr = squadOvr(save, theirs);
	const styleName = styleById(oppT.style).name;
	let text = `Стиль «${opp.name}» — ${styleName}. Составы ${myOvr} и ${theirOvr}.`;
	if (theirOvr > myOvr + 3) text = `«${opp.name}» сильнее (${theirOvr} против ${myOvr}), стиль — ${styleName}. Победа редкая, ничья ближе.`;
	else if (myOvr > theirOvr + 6) text = `Ваш состав ${myOvr} заметно выше их ${theirOvr}. Стиль соперника — ${styleName}, он должен уступать.`;
	else if (myOvr > theirOvr + 2) text = `Небольшой перевес: ${myOvr} против ${theirOvr}. На мировом классе этого мало. У них ${styleName}.`;
	const pair = `${save.clubId}-${oppId}`;
	const derby = DERBIES.has(pair);
	return {
		text,
		danger,
		derby,
		me,
		them,
		opp,
		myOvr,
		theirOvr,
		styleName
	};
}
function nextUserDate(save) {
	return userFixture(save)?.date ?? save.date;
}
function seasonDone(save) {
	const league = clubOf(save, save.clubId).league;
	const leagueLeft = save.fixtures.some((f) => (f.comp ?? "league") === "league" && f.league === league && !f.played);
	const mine = save.fixtures.some((f) => !f.played && (f.home === save.clubId || f.away === save.clubId));
	const cupOpen = save.cup && save.cup.stage !== "done" && !save.cup.userOut && save.fixtures.some((f) => f.comp === "cup" && (f.home === save.clubId || f.away === save.clubId));
	const euroOpen = !!save.euro?.comp && save.euro.stage !== "done" && save.euro.stage !== "out";
	return !leagueLeft && !mine && !cupOpen && !euroOpen;
}
var DESIGNS = [
	"Сплошная",
	"Узкая вертикаль",
	"Широкая вертикаль",
	"Узкая тельняшка",
	"Широкая тельняшка",
	"Диагональная лента",
	"Пополам",
	"Горизонтальный пояс",
	"Контрастные рукава",
	"Кокетка",
	"Боковые вставки",
	"Тонкий рубчик",
	"Ворот и манжеты",
	"Центральная панель",
	"Косой рубчик",
	"Шеврон",
	"Ромбы",
	"Клетка",
	"Двухцветный торс",
	"Верхний пояс",
	"Нижний пояс",
	"Классика рукава",
	"Смещённая полоса",
	"Три полосы",
	"Тельняшка и рукава",
	"Вертикаль и ворот",
	"Два блока",
	"Четверти",
	"Тонкая перевязь",
	"Редкий горох",
	"Крест",
	"Косая штриховка",
	"Широкий бок",
	"Двойной ворот",
	"Пояс на подоле",
	"Центральный шов"
];
var PALETTE = [
	"#f4f1ea",
	"#111111",
	"#c8102e",
	"#0b3d91",
	"#1f7a3a",
	"#f2c200",
	"#f26b1f",
	"#6b2d5b",
	"#7ec8e3",
	"#163e86",
	"#5b1a28",
	"#0d5c38",
	"#d4af37",
	"#3d2a78",
	"#009639",
	"#8b1e3f",
	"#b0b7c3",
	"#e8eef7"
];
function autoKit(club, side) {
	const design = hash(club.id + ":" + side) % DESIGNS.length;
	if (side === "home") return {
		design,
		primary: club.color,
		secondary: club.color2,
		socks: club.color
	};
	return {
		design,
		primary: club.color2,
		secondary: club.color,
		socks: club.color2
	};
}
function homeTones(club) {
	return [
		{
			design: 0,
			primary: club.color,
			secondary: club.color2,
			socks: club.color
		},
		{
			design: 0,
			primary: club.color,
			secondary: "#f4f1ea",
			socks: club.color
		},
		{
			design: 0,
			primary: club.color2,
			secondary: club.color,
			socks: club.color2
		},
		{
			design: 0,
			primary: club.color,
			secondary: club.color,
			socks: club.color2
		}
	];
}
function Shirt({ kit, size = 72 }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const a = kit.primary;
	const b = kit.secondary;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: uid,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 18 L22 8 L32 16 L42 8 L54 18 L47 28 L43 25 V56 H21 V25 L17 28 Z" })
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 18 L22 8 L32 16 L42 8 L54 18 L47 28 L43 25 V56 H21 V25 L17 28 Z",
				fill: a
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				clipPath: `url(#${uid})`,
				children: motif(kit.design, a, b)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M27 16 Q32 22 37 16",
				fill: "none",
				stroke: b,
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "58",
				width: "7",
				height: "4",
				fill: kit.socks
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "33",
				y: "58",
				width: "7",
				height: "4",
				fill: kit.socks
			})
		]
	});
}
function motif(d, a, b) {
	switch (d) {
		case 0: return null;
		case 1: return stripes(b, 2.2, 6);
		case 2: return stripes(b, 8, 16);
		case 3: return hoops(b, 2.4, 7);
		case 4: return hoops(b, 8, 16);
		case 5: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "16,12 34,12 48,56 30,56",
			fill: b
		});
		case 6: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "32",
			y: "8",
			width: "22",
			height: "50",
			fill: b
		});
		case 7: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "30",
			width: "40",
			height: "8",
			fill: b
		});
		case 8: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "8",
			width: "13",
			height: "22",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "41",
			y: "8",
			width: "13",
			height: "22",
			fill: b
		})] });
		case 9: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M18 12 H46 L39 26 H25 Z",
			fill: b
		});
		case 10: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "15",
			y: "20",
			width: "6",
			height: "36",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "43",
			y: "20",
			width: "6",
			height: "36",
			fill: b
		})] });
		case 11: return stripes(b, 1.2, 4);
		case 12: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 13 H40 L37 20 H27 Z",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "17",
				y: "22",
				width: "7",
				height: "4",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "40",
				y: "22",
				width: "7",
				height: "4",
				fill: b
			})
		] });
		case 13: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "27",
			y: "14",
			width: "10",
			height: "42",
			fill: b
		});
		case 14: return stripesDiag(b, 11);
		case 15: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "32,16 46,34 32,30 18,34",
			fill: b
		});
		case 16: return diamonds(b);
		case 17: return checks(a, b);
		case 18: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "34",
			width: "40",
			height: "22",
			fill: b
		});
		case 19: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "10",
			width: "40",
			height: "12",
			fill: b
		});
		case 20: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "14",
			y: "48",
			width: "36",
			height: "6",
			fill: b
		});
		case 21: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "12",
			width: "8",
			height: "44",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "44",
			y: "12",
			width: "8",
			height: "44",
			fill: b
		})] });
		case 22: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "18,12 24,12 34,56 28,56",
			fill: b
		});
		case 23: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "20",
				y: "12",
				width: "3",
				height: "44",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "30",
				y: "12",
				width: "3",
				height: "44",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "40",
				y: "12",
				width: "3",
				height: "44",
				fill: b
			})
		] });
		case 24: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "18",
				width: "40",
				height: "5",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "30",
				width: "40",
				height: "5",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "42",
				width: "40",
				height: "5",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "10",
				width: "8",
				height: "18",
				fill: b
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "44",
				y: "10",
				width: "8",
				height: "18",
				fill: b
			})
		] });
		case 25: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "29",
			y: "12",
			width: "6",
			height: "44",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M22 12 H42 L39 20 H25 Z",
			fill: b
		})] });
		case 26: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "12,10 38,10 28,56 12,56",
			fill: b
		});
		case 27: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "10",
			width: "20",
			height: "23",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "32",
			y: "33",
			width: "20",
			height: "23",
			fill: b
		})] });
		case 28: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "22,12 27,12 42,56 37,56",
			fill: b
		});
		case 29: return dots(b);
		case 30: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "30",
			y: "12",
			width: "4",
			height: "44",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "16",
			y: "32",
			width: "32",
			height: "4",
			fill: b
		})] });
		case 31: return stripesDiag(b, 6);
		case 32: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "30",
			r: "8",
			fill: "none",
			stroke: b,
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "30.5",
			y: "14",
			width: "3",
			height: "8",
			fill: b
		})] });
		case 33: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 14 H44 V20 H26 V52 H20 Z",
			fill: b
		}) });
		case 34: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "16",
			y: "40",
			width: "32",
			height: "4",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "16",
			y: "48",
			width: "32",
			height: "4",
			fill: b
		})] });
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "31",
			y: "14",
			width: "2",
			height: "42",
			fill: b
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "14",
			y: "16",
			width: "6",
			height: "38",
			fill: b,
			opacity: "0.85"
		})] });
	}
}
function stripes(b, w, step) {
	const nodes = [];
	for (let x = 16; x < 50; x += step) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x,
		y: 10,
		width: w,
		height: 48,
		fill: b
	}, x));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
function hoops(b, h, step) {
	const nodes = [];
	for (let y = 18; y < 54; y += step) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: 12,
		y,
		width: 40,
		height: h,
		fill: b
	}, y));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
function stripesDiag(b, step) {
	const nodes = [];
	for (let i = -2; i < 8; i++) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points: `${6 + i * step},8 ${10 + i * step},8 ${26 + i * step},56 ${22 + i * step},56`,
		fill: b
	}, i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
function diamonds(b) {
	const nodes = [];
	for (let y = 20; y < 52; y += 12) for (let x = 20; x < 48; x += 12) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points: `${x},${y} ${x + 4},${y + 4} ${x},${y + 8} ${x - 4},${y + 4}`,
		fill: b
	}, `${x}${y}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
function checks(a, b) {
	const nodes = [];
	for (let y = 16; y < 56; y += 8) for (let x = 14; x < 52; x += 8) if ((x + y) / 8 % 2 < 1) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x,
		y,
		width: 8,
		height: 8,
		fill: b,
		opacity: a ? 1 : 1
	}, `${x}${y}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
function dots(b) {
	const nodes = [];
	for (let y = 22; y < 52; y += 8) for (let x = 22; x < 46; x += 8) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: x,
		cy: y,
		r: 1.6,
		fill: b
	}, `${x}${y}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes });
}
/** Топ-15 на сезон 2026/27 и чемпионаты, которые уже идут в карьере. Рейтинг — уровень FC 27; если лиги в той шкале нет, ближайший уровень Football Manager. */
var NATIONS = [
	{
		id: "eng",
		country: "Англия",
		league: "Премьер-лига",
		band: [74, 83],
		star: 91,
		priceK: 2.8,
		top: true
	},
	{
		id: "esp",
		country: "Испания",
		league: "Ла Лига",
		band: [73, 82],
		star: 90,
		priceK: 2.4,
		top: true
	},
	{
		id: "ita",
		country: "Италия",
		league: "Серия A",
		band: [73, 81],
		star: 89,
		priceK: 2.2,
		top: true
	},
	{
		id: "ger",
		country: "Германия",
		league: "Бундеслига",
		band: [72, 81],
		star: 89,
		priceK: 2.15,
		top: true
	},
	{
		id: "fra",
		country: "Франция",
		league: "Лига 1",
		band: [71, 80],
		star: 88,
		priceK: 1.85,
		top: true
	},
	{
		id: "por",
		country: "Португалия",
		league: "Примейра",
		band: [70, 79],
		star: 86,
		priceK: 1.45,
		top: true,
		inGame: "por"
	},
	{
		id: "ned",
		country: "Нидерланды",
		league: "Эредивизи",
		band: [69, 78],
		star: 85,
		priceK: 1.35,
		top: true,
		inGame: "ned"
	},
	{
		id: "bra",
		country: "Бразилия",
		league: "Серия A",
		band: [70, 79],
		star: 87,
		priceK: 1.5,
		top: true,
		inGame: "bra"
	},
	{
		id: "arg",
		country: "Аргентина",
		league: "Примера",
		band: [69, 78],
		star: 86,
		priceK: 1.2,
		top: true
	},
	{
		id: "bel",
		country: "Бельгия",
		league: "Про-лига",
		band: [68, 77],
		star: 84,
		priceK: 1.15,
		top: true,
		inGame: "bel"
	},
	{
		id: "tur",
		country: "Турция",
		league: "Суперлига",
		band: [68, 76],
		star: 84,
		priceK: 1.25,
		top: true,
		inGame: "tur"
	},
	{
		id: "mex",
		country: "Мексика",
		league: "Лига MX",
		band: [67, 75],
		star: 82,
		priceK: .85,
		top: true
	},
	{
		id: "usa",
		country: "США",
		league: "MLS",
		band: [66, 74],
		star: 80,
		priceK: .9,
		top: true
	},
	{
		id: "sco",
		country: "Шотландия",
		league: "Премьершип",
		band: [66, 74],
		star: 82,
		priceK: .7,
		top: true
	},
	{
		id: "aut",
		country: "Австрия",
		league: "Бундеслига",
		band: [66, 74],
		star: 80,
		priceK: .65,
		top: true,
		inGame: "aut"
	},
	{
		id: "den",
		country: "Дания",
		league: "Суперлига",
		band: [66, 73],
		star: 79,
		priceK: .62,
		top: false,
		inGame: "den"
	},
	{
		id: "gre",
		country: "Греция",
		league: "Суперлига",
		band: [65, 73],
		star: 80,
		priceK: .58,
		top: false,
		inGame: "gre"
	},
	{
		id: "pol",
		country: "Польша",
		league: "Экстракласса",
		band: [65, 73],
		star: 79,
		priceK: .55,
		top: false,
		inGame: "pol"
	},
	{
		id: "srb",
		country: "Сербия",
		league: "Суперлига",
		band: [65, 73],
		star: 80,
		priceK: .5,
		top: false,
		inGame: "srb"
	},
	{
		id: "rpl",
		country: "Россия",
		league: "РПЛ",
		band: [70, 80],
		star: 84,
		priceK: 1,
		top: false,
		inGame: "rpl"
	},
	{
		id: "fnl",
		country: "Россия",
		league: "Первая лига",
		band: [64, 72],
		star: 75,
		priceK: .42,
		top: false,
		inGame: "fnl"
	},
	{
		id: "fnl2",
		country: "Россия",
		league: "ФНЛ-2",
		band: [58, 68],
		star: 71,
		priceK: .18,
		top: false,
		inGame: "fnl2"
	},
	{
		id: "fnl3",
		country: "Россия",
		league: "ФНЛ-3",
		band: [54, 64],
		star: 68,
		priceK: .1,
		top: false,
		inGame: "fnl3"
	},
	{
		id: "media",
		country: "Россия",
		league: "Медийная лига",
		band: [62, 74],
		star: 76,
		priceK: .22,
		top: false,
		inGame: "media"
	},
	{
		id: "amateur",
		country: "Россия",
		league: "Любители",
		band: [50, 60],
		star: 64,
		priceK: .05,
		top: false,
		inGame: "amateur"
	}
];
var FIRST = {
	eng: [
		"Джеймс",
		"Гарри",
		"Деклан",
		"Букайо",
		"Коул",
		"Джордан",
		"Маркус",
		"Филан"
	],
	esp: [
		"Педро",
		"Алехандро",
		"Нико",
		"Мартин",
		"Унаи",
		"Ферран",
		"Айтор",
		"Яго"
	],
	ita: [
		"Марко",
		"Лоренцо",
		"Николо",
		"Давиде",
		"Федерико",
		"Алессио",
		"Маттео",
		"Сандро"
	],
	ger: [
		"Йозуа",
		"Флориан",
		"Джамал",
		"Никлас",
		"Леон",
		"Юлиан",
		"Макс",
		"Паскаль"
	],
	fra: [
		"Орельен",
		"Варрен",
		"Эдуардо",
		"Адриен",
		"Майк",
		"Бредли",
		"Тео",
		"Кастильо"
	],
	arg: [
		"Тиаго",
		"Энцо",
		"Хулиан",
		"Науэль",
		"Эсекьель",
		"Лисандро",
		"Николас",
		"Валентин"
	],
	mex: [
		"Сесар",
		"Луис",
		"Хорхе",
		"Эрик",
		"Уриэль",
		"Хосе",
		"Диего",
		"Рикардо"
	],
	usa: [
		"Кристиан",
		"Джованни",
		"Мэтт",
		"Тайлер",
		"Брендан",
		"Уокер",
		"Рикардо",
		"Айдан"
	],
	sco: [
		"Каллум",
		"Скотт",
		"Льюис",
		"Джон",
		"Эндрю",
		"Билли",
		"Кевин",
		"Райан"
	]
};
var LAST = {
	eng: [
		"Райс",
		"Стоун",
		"Уайт",
		"Палмер",
		"Гордон",
		"Боуэн",
		"Галлахер",
		"Мэдден"
	],
	esp: [
		"Гарсия",
		"Руис",
		"Молина",
		"Серра",
		"Наварро",
		"Иглесиас",
		"Коста",
		"Понс"
	],
	ita: [
		"Риччи",
		"Бьянки",
		"Греко",
		"Руссо",
		"Ферри",
		"Конти",
		"Ломбарди",
		"Витале"
	],
	ger: [
		"Брандт",
		"Зуле",
		"Киммих",
		"Вольф",
		"Хофманн",
		"Шлоттербек",
		"Фюллькруг",
		"Нмеча"
	],
	fra: [
		"Кунде",
		"Шерки",
		"Тюрам",
		"Камавинга",
		"Диуф",
		"Оливье",
		"Баркола",
		"Заир"
	],
	arg: [
		"Альмада",
		"Фернандес",
		"Мартинес",
		"Ромеро",
		"Паредес",
		"Альварес",
		"Молина",
		"Сото"
	],
	mex: [
		"Санчес",
		"Эррера",
		"Васкес",
		"Мора",
		"Хименес",
		"Рейес",
		"Очоа",
		"Гусман"
	],
	usa: [
		"Пулишич",
		"Адамс",
		"Маккензи",
		"Робинсон",
		"Пепи",
		"Тилман",
		"Буссьо",
		"Скардуччи"
	],
	sco: [
		"Мактоминей",
		"Робертсон",
		"Макгрегор",
		"Тирни",
		"Фергюсон",
		"Армстронг",
		"Дайкс",
		"Паттерсон"
	]
};
var POS = [
	"GK",
	"DR",
	"DC",
	"DC",
	"DL",
	"DM",
	"MC",
	"MC",
	"AM",
	"MR",
	"ML",
	"ST",
	"ST",
	"DC",
	"MC"
];
var cache = /* @__PURE__ */ new Map();
function clamp(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function priceMillionRub(ovr, age, priceK) {
	const base = Math.pow(1.13, ovr - 60);
	const euro = Math.max(.05, base * (age <= 21 ? 1.55 : age <= 23 ? 1.28 : age <= 26 ? 1.05 : age <= 28 ? .82 : age <= 30 ? .55 : age <= 32 ? .32 : .18) * priceK);
	return Math.max(2, Math.round(euro * 100));
}
function nationPlayers(id) {
	const hit = cache.get(id);
	if (hit) return hit;
	const nation = NATIONS.find((n) => n.id === id);
	if (!nation || nation.inGame) {
		cache.set(id, []);
		return [];
	}
	const r = rng(hash("market:" + id));
	const firsts = FIRST[id] ?? FIRST.eng;
	const lasts = LAST[id] ?? LAST.eng;
	const used = /* @__PURE__ */ new Set();
	const players = [];
	for (let i = 0; i < 32; i++) {
		const pos = i < 2 ? "GK" : POS[i % POS.length];
		const ovr = clamp((i < 2 ? nation.star - (pos === "GK" ? 2 : 0) : i < 8 ? nation.band[1] : nation.band[0] + Math.floor(r() * (nation.band[1] - nation.band[0]))) + Math.round((r() - .5) * (i < 2 ? 1 : 3)), 54, 93);
		const age = i < 2 ? 24 + Math.floor(r() * 6) : 18 + Math.floor(r() * 14);
		let first = firsts[Math.floor(r() * firsts.length)];
		let last = lasts[Math.floor(r() * lasts.length)];
		let guard = 0;
		while (used.has(`${first}|${last}`) && guard++ < 12) {
			first = firsts[Math.floor(r() * firsts.length)];
			last = lasts[Math.floor(r() * lasts.length)] + (guard > 6 ? ` ${guard}` : "");
		}
		used.add(`${first}|${last}`);
		const mid = clamp((ovr - 30) / 3.05, 8, 19);
		const a = (bias) => clamp(Math.round(mid + bias + (r() - .5) * 2.4), 6, 20);
		const value = priceMillionRub(ovr, age, nation.priceK);
		players.push({
			id: `mkt-${id}-${i}`,
			clubId: `pool:${id}`,
			first,
			last,
			age,
			nat: nation.country,
			pos,
			foot: r() < .24 ? "Лев" : "Прав",
			pac: a(pos === "MR" || pos === "ML" || pos === "ST" ? 1.2 : pos === "DC" ? -1 : 0),
			sta: a(0),
			strn: a(pos === "DC" || pos === "ST" ? 1 : 0),
			def: a(pos === "DC" || pos === "DM" || pos === "DR" || pos === "DL" ? 1.6 : -.8),
			pas: a(pos === "MC" || pos === "AM" || pos === "DM" ? 1.3 : 0),
			tec: a(pos === "AM" || pos === "MC" ? 1.4 : .2),
			sho: a(pos === "ST" || pos === "AM" ? 1.8 : -.6),
			men: a(age > 28 ? 1 : 0),
			gk: pos === "GK" ? a(2) : a(-6),
			cond: 80 + Math.floor(r() * 16),
			sharp: 60 + Math.floor(r() * 25),
			mor: 60 + Math.floor(r() * 25),
			wage: Math.max(12, Math.round(value * .9)),
			value,
			contract: 1 + Math.floor(r() * 4),
			number: i === 0 ? 1 : 2 + i * 7 % 97,
			injured: 0,
			goals: Math.floor(r() * (pos === "ST" ? 14 : 4)),
			assists: Math.floor(r() * 8),
			apps: 10 + Math.floor(r() * 24),
			ratingSum: 0,
			yellow: 0,
			ban: 0,
			listed: true,
			ovr,
			pot: age <= 23 ? Math.min(93, ovr + 3 + Math.floor(r() * 4)) : ovr,
			growth: 0
		});
	}
	cache.set(id, players);
	return players;
}
function peek(id) {
	if (!id.startsWith("mkt-")) return void 0;
	return nationPlayers(id.split("-")[1] ?? "").find((p) => p.id === id);
}
function adoptMarketPlayer(save, id) {
	const have = save.players.find((p) => p.id === id);
	if (have) return have;
	const found = peek(id);
	if (!found) return void 0;
	const copy = { ...found };
	save.players.push(copy);
	return copy;
}
function originOf(save, p) {
	if (p.clubId.startsWith("pool:")) {
		const n = NATIONS.find((x) => p.clubId === `pool:${x.id}`);
		return n ? n.country : p.nat;
	}
	const club = save.clubs.find((c) => c.id === p.clubId);
	if (!club) return p.nat;
	const n = NATIONS.find((x) => x.inGame === club.league);
	return n ? n.country : p.nat;
}
function fitsWish(p, wish) {
	if (wish === "all") return true;
	return (wish === "tec" ? p.tec : wish === "strn" ? p.strn : wish === "pac" ? p.pac : wish === "sho" ? p.sho : wish === "pas" ? p.pas : p.def) >= 15;
}
function marketRows(save, nationId) {
	const take = (list) => list.filter((p) => {
		const owned = save.players.find((x) => x.id === p.id);
		if (owned && owned.clubId === save.clubId) return false;
		if (owned && !owned.clubId.startsWith("pool:") && owned.clubId !== "free") return p.clubId !== save.clubId;
		return true;
	});
	if (nationId === "all") {
		const external = NATIONS.filter((n) => !n.inGame).flatMap((n) => nationPlayers(n.id));
		const loaded = save.players.filter((p) => p.clubId !== save.clubId);
		const ids = new Set(loaded.map((p) => p.id));
		return [...loaded, ...external.filter((p) => !ids.has(p.id))];
	}
	const nation = NATIONS.find((n) => n.id === nationId);
	if (!nation) return [];
	if (nation.inGame) {
		const ids = new Set(save.clubs.filter((c) => c.league === nation.inGame).map((c) => c.id));
		return save.players.filter((p) => ids.has(p.clubId) && p.clubId !== save.clubId);
	}
	return take(nationPlayers(nation.id)).map((p) => save.players.find((x) => x.id === p.id) ?? p);
}
/** Сохранения только в Web Storage этого браузера. На сервер ничего не уходит. */
var DEVICE = "kabinet-device";
function openWebStorage() {
	try {
		const store = globalThis.localStorage;
		if (!store) return null;
		const probe = "kabinet-probe";
		store.setItem(probe, "1");
		store.removeItem(probe);
		return store;
	} catch {
		return null;
	}
}
function deviceId() {
	const store = openWebStorage();
	if (!store) return "guest";
	const existing = store.getItem(DEVICE);
	if (existing && /^[a-z0-9]{8}$/.test(existing)) return existing;
	const id = (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").toLowerCase().slice(0, 8).padEnd(8, "0");
	store.setItem(DEVICE, id);
	return id;
}
function cabinetCode() {
	return deviceId().slice(0, 4).toUpperCase();
}
function folderKey() {
	return `kabinet-folder-v2:${deviceId()}`;
}
function readRaw(key) {
	try {
		return openWebStorage()?.getItem(key) ?? null;
	} catch {
		return null;
	}
}
function writeRaw(key, value) {
	const store = openWebStorage();
	if (!store) return false;
	try {
		store.setItem(key, value);
		return true;
	} catch {
		return false;
	}
}
function removeRaw(key) {
	try {
		openWebStorage()?.removeItem(key);
	} catch {}
}
var LEGACY = "kabinet-folder-v1";
var OLD = "kabinet-save-v1";
function emptyFolder() {
	return {
		v: 2,
		active: 0,
		slots: [
			null,
			null,
			null
		],
		glory: []
	};
}
var memory = emptyFolder();
function snapshot() {
	return {
		v: 2,
		active: memory.active,
		slots: [...memory.slots],
		glory: [...memory.glory]
	};
}
function persistFolder() {
	writeRaw(folderKey(), JSON.stringify(memory));
}
function honorsOf(folder) {
	return folder.glory ?? [];
}
function cupOf(text) {
	const t = text.toLowerCase();
	if (t.includes("чемпион")) return "ucl";
	if (t.includes("европы")) return "uel";
	if (t.includes("конферен")) return "uecl";
	if (t.includes("кубок")) return "cup";
	if (t.includes("медиа")) return "media";
	if (t.includes("фнл-3")) return "fnl3";
	if (t.includes("фнл-2")) return "fnl2";
	if (t.includes("фнл") || t.includes("первая")) return "fnl";
	if (t.includes("рпл")) return "rpl";
	return "league";
}
function fromLog(save) {
	const out = [];
	for (const line of save.log ?? []) {
		if (!line.startsWith("HONOR:")) continue;
		const body = line.slice(6);
		const cut = body.match(/^(\d{4})\|(.*)$/);
		const season = cut ? Number(cut[1]) : save.season;
		const text = cut ? cut[2] : body;
		if (!text || text.includes("вылет") || text.includes("выход") || text.includes("стык")) continue;
		out.push({
			who: save.manager,
			text,
			season,
			cup: cupOf(text)
		});
	}
	return out;
}
function sameGlory(a, b) {
	return a.who === b.who && a.text === b.text && a.season === b.season;
}
function harvest(save) {
	let last = null;
	for (const g of fromLog(save)) {
		if (memory.glory.some((x) => sameGlory(x, g))) continue;
		memory.glory.unshift(g);
		if (!last) last = g;
	}
	return last;
}
function commit(set, save, extra) {
	const next = { ...save };
	const won = harvest(next);
	memory.slots[memory.active] = { save: next };
	persistFolder();
	set({
		save: next,
		folder: snapshot(),
		...won ? { cutscene: won } : {},
		...extra
	});
}
function emptyLive(fixtureId, home, oppId, xi, oppXi, oppForm) {
	return {
		fixtureId,
		minute: 0,
		events: [],
		queue: [],
		hg: 0,
		ag: 0,
		home,
		oppId,
		xi,
		oppXi,
		ratings: {},
		paused: false,
		done: false,
		xgH: 0,
		xgA: 0,
		scorers: [],
		mins: {},
		pending: [],
		oppPending: [],
		subsUsed: 0,
		oppSubs: 0,
		oppForm,
		line: "Арбитр даёт свисток, команды разводят мяч с центра поля.",
		side: "h",
		menu: false,
		userPause: false,
		technical: false,
		baller: xi.find((id) => id) ?? "",
		piece: "open",
		shot: "",
		pieceAt: 0
	};
}
var useFm = create((set, get) => ({
	screen: "boot",
	save: null,
	folder: emptyFolder(),
	live: null,
	playerId: null,
	league: "rpl",
	picking: null,
	notice: "",
	draft: null,
	cutscene: null,
	stamp: "",
	boot: () => {
		memory = loadFolder();
		const save = memory.slots[memory.active]?.save ?? null;
		const league = save?.clubs.find((c) => c.id === save.clubId)?.league ?? "rpl";
		set({
			folder: snapshot(),
			save,
			league,
			stamp: cabinetCode()
		});
	},
	start: (clubId, manager) => {
		try {
			const who = manager.trim();
			if (who.length < 2) {
				set({ notice: "Напишите фамилию тренера — хотя бы две буквы." });
				return;
			}
			const save = newSave(clubId, who);
			const draft = get().draft;
			if (draft?.clubId === clubId) save.kit = {
				home: { ...draft.home },
				away: { ...draft.away }
			};
			save.tactics.slots = autoXi(save, clubId, save.tactics.formation);
			const club = save.clubs.find((c) => c.id === clubId);
			if (!club) {
				set({ notice: "Этот клуб не открылся. Выберите другой." });
				return;
			}
			commit(set, save, {
				screen: "desk",
				live: null,
				league: club.league,
				notice: `Карьера начата. ${who}, «${club.name}».`,
				playerId: null,
				draft: null
			});
		} catch {
			set({ notice: "Карьера не открылась. Нажмите «Начать карьеру» ещё раз." });
		}
	},
	prepare: (clubId, manager) => {
		const club = catalog().find((c) => c.id === clubId);
		if (!club) return;
		const home = autoKit(club, "home");
		const away = autoKit(club, "away");
		away.design = (home.design + 9) % 36;
		set({
			draft: {
				manager: manager.trim() || "Тренер",
				clubId,
				home,
				away
			},
			screen: "kits",
			notice: ""
		});
	},
	tuneKit: (side, patch) => {
		const draft = get().draft;
		if (!draft) return;
		set({ draft: {
			...draft,
			[side]: {
				...draft[side],
				...patch
			}
		} });
	},
	activate: (index) => {
		memory.active = index;
		const save = memory.slots[index]?.save ?? null;
		persistFolder();
		const league = save?.clubs.find((c) => c.id === save.clubId)?.league ?? get().league;
		set({
			folder: snapshot(),
			save,
			screen: save ? save.sacked ? "sacked" : "desk" : "pick",
			live: null,
			league,
			notice: "",
			playerId: null
		});
	},
	fresh: (index) => {
		memory.active = index;
		memory.slots[index] = null;
		persistFolder();
		set({
			folder: snapshot(),
			save: null,
			screen: "pick",
			live: null,
			draft: null,
			notice: "",
			playerId: null
		});
	},
	begin: () => {
		const free = memory.slots.findIndex((s) => !s);
		if (free < 0) {
			set({
				notice: "Три тренера уже в деле. В слоте нажмите «Новый тренер», если хотите начать заново.",
				screen: "boot"
			});
			return;
		}
		get().fresh(free);
	},
	playNow: () => {
		if (!get().save) {
			const filled = memory.slots.findIndex((s) => s?.save);
			if (filled >= 0) get().activate(filled);
		}
		if (!get().save) {
			const clubs = catalog().filter((c) => c.league === "rpl");
			const club = clubs.find((c) => c.name === "Зенит") ?? clubs[0];
			if (!club) return;
			const free = memory.slots.findIndex((s) => !s);
			memory.active = free >= 0 ? free : 0;
			const created = newSave(club.id, "А. Рубанова");
			created.tactics.slots = autoXi(created, club.id, created.tactics.formation);
			commit(set, created, {
				screen: "desk",
				live: null,
				league: club.league,
				notice: "",
				playerId: null,
				draft: null
			});
		}
		get().toMatch();
		get().kickoff(false);
	},
	manualSave: () => {
		const save = get().save;
		if (!save?.clubId) return false;
		memory.slots[memory.active] = { save };
		persistFolder();
		set({ folder: snapshot() });
		return true;
	},
	go: (screen) => set({
		screen,
		picking: null,
		notice: ""
	}),
	openPlayer: (id) => set({
		playerId: id,
		screen: "player"
	}),
	setLeague: (league) => set({ league }),
	patchTactic: (patch) => {
		const save = get().save;
		if (!save) return;
		const formation = patch.formation ?? save.tactics.formation;
		const changed = patch.formation && patch.formation !== save.tactics.formation;
		save.tactics = {
			...save.tactics,
			...patch,
			formation
		};
		if (patch.style && patch.mentality == null && patch.press == null && patch.tempo == null && patch.line == null && patch.width == null) {
			const preset = STYLES.find((s) => s.id === patch.style);
			if (preset) {
				save.tactics.mentality = preset.mentality;
				save.tactics.press = preset.press;
				save.tactics.tempo = preset.tempo;
				save.tactics.line = preset.line;
				save.tactics.width = preset.width;
			}
		}
		if (changed) {
			const liveNow = get().live;
			if (liveNow && !liveNow.done) save.tactics.slots = remapXi(save, liveNow.xi, formation);
			else save.tactics.slots = autoXi(save, save.clubId, formation);
		}
		if (patch.mentality != null) save.tactics.mentality = patch.mentality;
		const live = get().live;
		if (live && !live.done) {
			if (changed) live.xi = [...save.tactics.slots];
			live.queue = [];
			if (live.minute < 90) fillChunk(save, live);
		}
		commit(set, save, live && !live.done ? { live: {
			...live,
			xi: changed ? [...save.tactics.slots] : live.xi
		} } : void 0);
	},
	pickSlot: (picking) => set({ picking }),
	assign: (playerId) => {
		const save = get().save;
		const index = get().picking;
		if (!save || index == null) return;
		const slots = [...save.tactics.slots];
		const prev = slots.indexOf(playerId);
		if (prev >= 0) slots[prev] = slots[index] ?? "";
		slots[index] = playerId;
		save.tactics.slots = slots;
		commit(set, save, { picking: null });
	},
	auto: () => {
		const save = get().save;
		if (!save) return;
		save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
		commit(set, save);
	},
	doTrain: (focus) => {
		const save = get().save;
		if (!save) return;
		const step = (n, d, a, b) => Math.max(a, Math.min(b, n + d));
		const t = save.tactics;
		const before = `${t.mentality}:${t.press}:${t.tempo}:${t.line}:${t.width}`;
		if (focus === "attack") {
			t.mentality = step(t.mentality, 1, -2, 2);
			t.tempo = step(t.tempo, 1, 0, 4);
			t.press = step(t.press, 1, 0, 4);
		} else if (focus === "defence") {
			t.mentality = step(t.mentality, -1, -2, 2);
			t.line = step(t.line, -1, 0, 4);
			t.press = step(t.press, -1, 0, 4);
		} else if (focus === "set") {
			t.width = step(t.width, 1, 0, 4);
			t.tempo = step(t.tempo, -1, 0, 4);
		} else if (focus === "physical") {
			t.tempo = step(t.tempo, 1, 0, 4);
			t.press = step(t.press, 1, 0, 4);
		} else {
			t.tempo = step(t.tempo, -1, 0, 4);
			t.press = step(t.press, -1, 0, 4);
			t.mentality = t.mentality > 0 ? t.mentality - 1 : t.mentality < 0 ? t.mentality + 1 : 0;
		}
		const moved = before !== `${t.mentality}:${t.press}:${t.tempo}:${t.line}:${t.width}`;
		const mine = save.players.filter((p) => p.clubId === save.clubId && p.injured <= 0);
		const avg = (key) => Math.round(mine.reduce((s, p) => s + p[key], 0) / Math.max(1, mine.length));
		const tone0 = avg("cond");
		const sharp0 = avg("sharp");
		const already = save.inbox.some((m) => m.date === save.date && m.title === "Тренировка проведена");
		if (!already) train(save, focus);
		else save.focus = focus;
		const tone1 = avg("cond");
		const sharp1 = avg("sharp");
		const live = get().live;
		if (live && !live.done) {
			live.queue = [];
			if (live.minute < 90) fillChunk(save, live);
		}
		const load = already ? "Нагрузку на игроков сегодня уже давали." : `Тонус ${tone0} → ${tone1}, острота ${sharp0} → ${sharp1}.`;
		commit(set, save, {
			notice: `${moved ? "Ползунки сдвинулись." : "Ползунки уже на пределе в эту сторону."} ${load}`,
			screen: "tactics",
			...live && !live.done ? { live: { ...live } } : {}
		});
	},
	toMatch: () => {
		const save = get().save;
		if (!save) return;
		if (seasonDone(save)) {
			set({
				screen: "table",
				notice: "Чемпионат доигран. Можно закрывать сезон."
			});
			return;
		}
		const pending = get().live;
		if (pending && !pending.done) {
			set({ screen: "match" });
			return;
		}
		const date = nextUserDate(save);
		if (save.date < date) advanceTo(save, date, false);
		if (!save.tactics.slots.filter(Boolean).length) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
		commit(set, save, {
			screen: "match",
			live: null
		});
	},
	kickoff: (instant) => {
		const save = get().save;
		const fx = save ? userFixture(save) : void 0;
		if (!save || !fx || fx.date !== save.date || fx.played) return;
		if (get().live && !get().live.done) return;
		if (save.tactics.slots.filter(Boolean).length < 11) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
		const home = fx.home === save.clubId;
		const oppId = home ? fx.away : fx.home;
		const oppForm = clubTactics(oppId).formation;
		const xi = [...save.tactics.slots];
		const oppXi = autoXi(save, oppId, oppForm);
		const live = emptyLive(fx.id, home, oppId, xi, oppXi, oppForm);
		if (instant) {
			const me = {
				ids: xi,
				formation: save.tactics.formation,
				tactics: save.tactics,
				clubId: save.clubId
			};
			const them = {
				ids: oppXi,
				formation: oppForm,
				tactics: clubTactics(oppId),
				clubId: oppId
			};
			const score = {
				h: 0,
				a: 0
			};
			const a = simulateSegment(save, me, them, 1, 45, fx.id, score);
			const b = simulateSegment(save, me, them, 46, 90, fx.id + "b", score);
			live.events = [...a.events, ...b.events];
			live.hg = score.h;
			live.ag = score.a;
			live.xgH = a.xgH + b.xgH;
			live.xgA = a.xgA + b.xgA;
			live.minute = 90;
			live.done = true;
			live.line = "Финальный свисток. Команды благодарят трибуны и уходят в подтрибунное помещение.";
			for (const id of xi) live.mins[id] = 85;
			settle(save, live, false);
			commit(set, save, {
				live,
				screen: "match"
			});
			return;
		}
		fillChunk(save, live);
		set({
			live,
			save: { ...save },
			screen: "match"
		});
	},
	tick: () => {
		const save = get().save;
		const live = get().live;
		if (!save || !live || live.done || live.paused || live.menu || live.userPause) return;
		live.minute += 1;
		for (const id of [...live.xi, ...live.oppXi]) live.mins[id] = (live.mins[id] ?? 0) + 1;
		if (live.minute % 8 === 0) for (const id of [...live.xi, ...live.oppXi]) {
			const p = save.players.find((pl) => pl.id === id);
			if (!p) continue;
			const extra = (p.age >= 34 ? 2 : p.age >= 30 ? 1 : 0) + (p.sta < 11 ? 1 : 0);
			p.cond = Math.max(28, Math.round(p.cond - 1 - extra));
		}
		if (!live.queue.some((e) => e.min >= live.minute) && live.minute < 90) fillChunk(save, live);
		if ((live.minute === 63 || live.minute === 77) && live.oppSubs + live.oppPending.length < 4) queueOpp(save, live);
		const due = live.queue.filter((e) => e.min <= live.minute);
		live.queue = live.queue.filter((e) => e.min > live.minute);
		let subLine = "";
		for (const e of due) {
			live.events = [...live.events, e].slice(-16);
			live.line = e.text;
			const kickLive = live.piece !== "open" && live.pieceAt > 0 && Date.now() - live.pieceAt < 1700;
			if (e.side && !(kickLive && e.piece === "open")) live.side = e.side;
			if (e.piece && !(kickLive && e.piece === "open")) {
				live.piece = e.piece;
				live.shot = e.shot || "";
				if (e.piece !== "open") live.pieceAt = Date.now();
				if (e.pid) live.baller = e.pid;
			} else if (e.pid && !kickLive) live.baller = e.pid;
			if (e.kind === "goal") {
				if (e.side === "h") live.hg++;
				else live.ag++;
				if (e.pid && live.xi.includes(e.pid)) live.scorers.push(e.pid);
			}
			if (e.kind === "dead" || e.kind === "goal" || e.kind === "card" || e.text.includes("прихрамывает")) {
				const made = applyQueued(save, live, e.text);
				if (made) subLine = made;
			}
		}
		if (subLine) live.line = subLine;
		if (live.minute === 45) {
			live.paused = true;
			live.queue = [];
			live.line = "Перерыв. Можно поменять схему и отправить на поле свежих игроков.";
			set({ live: { ...live } });
			return;
		}
		if (live.minute >= 90) {
			live.done = true;
			live.menu = false;
			live.line = "Финальный свисток. Матч закончен, оценки уже у аналитиков.";
			settle(save, live, true);
			commit(set, save, { live: { ...live } });
			return;
		}
		set({ live: { ...live } });
	},
	resumeHalf: () => {
		const save = get().save;
		const live = get().live;
		if (!save || !live || live.done || live.events.some((e) => e.kind === "ht")) return;
		const text = applyQueued(save, live, "В перерыве") || "Команды выходят на второй тайм.";
		live.events = [...live.events, {
			min: 45,
			text,
			kind: "ht"
		}];
		live.line = text;
		live.paused = false;
		live.menu = false;
		live.userPause = false;
		live.queue = [];
		set({ live: { ...live } });
	},
	pauseMatch: () => {
		const live = get().live;
		if (!live || live.done) return;
		live.userPause = true;
		live.line = "Пауза. Можно просимулировать дальше или снять команду: сопернику засчитают 3:0.";
		set({ live: { ...live } });
	},
	resumeSim: () => {
		const save = get().save;
		const live = get().live;
		if (!save || !live || live.done) return;
		const atHalf = live.minute === 45 && live.paused && !live.events.some((e) => e.kind === "ht");
		live.userPause = false;
		live.menu = false;
		if (atHalf) {
			get().resumeHalf();
			return;
		}
		live.paused = false;
		live.line = live.line.startsWith("Пауза.") ? "Игра продолжается." : live.line;
		set({ live: { ...live } });
	},
	forfeit: () => {
		const save = get().save;
		if (!save) return;
		const current = get().live;
		if (current && !current.done) {
			closeForfeit(set, save, current);
			return;
		}
		if (get().screen !== "match") return;
		const fx = userFixture(save);
		if (!fx || fx.played || fx.date !== save.date) return;
		const home = fx.home === save.clubId;
		const oppId = home ? fx.away : fx.home;
		const oppForm = clubTactics(oppId).formation;
		if (save.tactics.slots.filter(Boolean).length < 11) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
		closeForfeit(set, save, emptyLive(fx.id, home, oppId, [...save.tactics.slots], autoXi(save, oppId, oppForm), oppForm));
	},
	queueSub: (outId, inId) => {
		const live = get().live;
		const save = get().save;
		if (!live || !save || live.done) return;
		if (live.subsUsed + live.pending.length >= 5) return;
		if (!live.xi.includes(outId) || live.xi.includes(inId)) return;
		if (live.pending.some((s) => s.out === outId || s.in === inId)) return;
		const inn = save.players.find((p) => p.id === inId);
		const out = save.players.find((p) => p.id === outId);
		live.pending = [...live.pending, {
			out: outId,
			in: inId
		}];
		live.line = `${out?.last ?? "Игрок"} ждёт остановки, ${inn?.last ?? "запасной"} уже греется у бровки.`;
		set({ live: { ...live } });
	},
	toggleMenu: (open) => {
		const live = get().live;
		if (!live) return;
		live.menu = open ?? !live.menu;
		set({ live: { ...live } });
	},
	advanceDay: () => {
		const save = get().save;
		if (!save) return;
		advanceTo(save, addOne(save.date), true);
		checkSack(save);
		commit(set, save, {
			screen: save.sacked ? "sacked" : get().screen,
			live: null
		});
	},
	toNextMatch: () => {
		get().toMatch();
	},
	offerBid: (playerId, fee) => {
		const save = get().save;
		if (!save) return;
		if (!save.players.some((p) => p.id === playerId)) adoptMarketPlayer(save, playerId);
		commit(set, save, { notice: bid(save, playerId, fee) || `Сделка закрыта · ${dollarText(fee)}` });
	},
	accept: (id) => {
		const save = get().save;
		if (!save) return;
		commit(set, save, { notice: acceptOffer(save, id) || "Игрок продан" });
	},
	reject: (id) => {
		const save = get().save;
		if (!save) return;
		rejectOffer(save, id);
		commit(set, save);
	},
	closeSeason: () => {
		const save = get().save;
		if (!save) return;
		finishSeason(save);
		save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
		const playoff = save.phase === "playoff";
		commit(set, save, {
			screen: save.sacked ? "sacked" : playoff ? "desk" : "inbox",
			notice: playoff ? "Квалификация назначена — сыграйте стыки" : "Новый сезон открыт"
		});
	},
	job: (clubId) => {
		const save = get().save;
		if (!save) return;
		takeJob(save, clubId);
		save.tactics.slots = autoXi(save, clubId, save.tactics.formation);
		commit(set, save, {
			screen: "desk",
			league: save.clubs.find((c) => c.id === clubId)?.league ?? "rpl"
		});
	},
	read: (id) => {
		const save = get().save;
		if (!save) return;
		const msg = save.inbox.find((m) => m.id === id);
		if (msg) msg.read = true;
		commit(set, save);
	},
	list: (playerId) => {
		const save = get().save;
		if (!save) return;
		const p = save.players.find((x) => x.id === playerId);
		if (!p || p.clubId !== save.clubId) return;
		p.listed = !p.listed;
		commit(set, save, { notice: p.listed ? "Выставлен на трансфер" : "Снят с трансфера" });
	},
	renew: (playerId, years, wage, clause) => {
		const save = get().save;
		if (!save) return;
		commit(set, save, { notice: renewContract(save, playerId, years, wage, clause) || "Контракт подписан" });
	},
	scout: (league) => {
		const save = get().save;
		if (!save) return;
		materializeLeague(save, league);
		commit(set, save);
	},
	setOption: (patch) => {
		const save = get().save;
		if (!save) return;
		if (patch.difficulty) save.difficulty = patch.difficulty;
		if (patch.matchMins) save.matchMins = patch.matchMins;
		commit(set, save);
	},
	wipeCareer: () => {
		memory.slots[memory.active] = null;
		persistFolder();
		set({
			folder: snapshot(),
			save: null,
			screen: "boot",
			live: null,
			draft: null,
			playerId: null,
			notice: "Карьера удалена. Заслуги этого кабинета остались."
		});
	},
	dismissTrophy: () => set({ cutscene: null })
}));
function addOne(iso) {
	const d = /* @__PURE__ */ new Date(iso + "T12:00:00Z");
	d.setUTCDate(d.getUTCDate() + 1);
	return d.toISOString().slice(0, 10);
}
function settle(save, live, watched, technical = false) {
	const fx = save.fixtures.find((f) => f.id === live.fixtureId);
	if (!fx || fx.played) return;
	fx.hg = live.hg;
	fx.ag = live.ag;
	fx.played = true;
	noteEuroResult(save, fx);
	const gf = live.home ? live.hg : live.ag;
	const ga = live.home ? live.ag : live.hg;
	const ratings = {};
	const played = Object.entries(live.mins).filter(([id, m]) => m >= 15 && save.players.some((p) => p.id === id && p.clubId === save.clubId)).map(([id]) => id);
	const pool = technical ? played : played.length ? played : live.xi;
	if (!technical) {
		for (const id of live.xi) {
			const scored = live.events.filter((e) => e.kind === "goal" && e.pid === id).length;
			const booked = live.events.some((e) => e.kind === "card" && e.pid === id);
			let rating = 6.4 + scored * .9 + (Math.random() * .5 - .15);
			if (booked) rating -= .4;
			if (id === live.xi[0] && ga === 0) rating += .6;
			ratings[id] = Math.max(4.5, Math.min(9.6, Math.round(rating * 10) / 10));
		}
		for (const id of played) if (ratings[id] == null) ratings[id] = 6.5;
	} else for (const id of pool) ratings[id] = 5.6;
	live.ratings = ratings;
	const goals = live.events.filter((e) => e.kind === "goal" && e.pid && pool.includes(e.pid)).map((e) => e.pid);
	const cards = live.events.filter((e) => e.kind === "card" && e.pid && pool.includes(e.pid)).map((e) => e.pid);
	if (pool.length) applyMatchLoad(save, pool, goals, cards, ratings);
	const grew = [];
	const fell = [];
	for (const id of pool) {
		const delta = growFromMatch(save, id, ratings[id] ?? 6.6, live.mins[id] ?? (watched ? 70 : 80), !watched);
		const p = save.players.find((x) => x.id === id);
		if (delta > 0 && p) grew.push(`${p.last} ${p.ovr}`);
		if (delta < 0 && p) fell.push(`${p.last} ${p.ovr}`);
	}
	if (!technical) {
		for (const e of live.events) if (e.kind === "info" && e.pid && live.xi.includes(e.pid) && e.text.includes("прихрамывает")) {
			const p = save.players.find((x) => x.id === e.pid);
			if (p && Math.random() < .45) p.injured = 10 + Math.floor(Math.random() * 18);
		}
	}
	moraleSwing(save, save.clubId, gf, ga, live.home);
	save.played++;
	save.focus = null;
	const opp = clubById(save.clubs, live.oppId);
	save.log.unshift(technical ? `0:3 т.п. с «${opp?.name ?? ""}»` : `${gf}:${ga} с «${opp?.name ?? ""}»`);
	flushOthers(save, save.date);
	const { place } = placeOf(save);
	pushMsg(save, "Протокол", technical ? `Техническое поражение 0:3 — ${opp?.name ?? "соперник"}` : `${gf}:${ga} — ${opp?.name ?? "соперник"}`, technical ? `Команда не доиграла матч. В протоколе 3:0 в пользу соперника. Место в таблице: ${place}. Доверие совета: ${save.confidence}.` : `Место в таблице: ${place}. xG ${live.xgH.toFixed(2)}:${live.xgA.toFixed(2)}. Доверие совета: ${save.confidence}.${grew.length ? ` Рейтинг вырос: ${grew.join(", ")}.` : ""}${fell.length ? ` Рейтинг просел: ${fell.join(", ")}.` : ""}`);
	checkSack(save);
}
function closeForfeit(set, save, live) {
	live.hg = live.home ? 0 : 3;
	live.ag = live.home ? 3 : 0;
	live.minute = 90;
	live.done = true;
	live.paused = false;
	live.menu = false;
	live.userPause = false;
	live.technical = true;
	live.queue = [];
	live.pending = [];
	live.line = "Техническое поражение. Официальный счёт — 3:0 в пользу соперника.";
	live.events = [...live.events, {
		min: 90,
		text: "Арбитр фиксирует техническое поражение: сопернику засчитана победа 3:0.",
		kind: "ft"
	}];
	settle(save, live, false, true);
	commit(set, save, {
		live: { ...live },
		screen: "match"
	});
}
function plans(save, live) {
	const opp = clubTactics(live.oppId);
	return {
		homePlan: live.home ? {
			ids: [...live.xi],
			formation: save.tactics.formation,
			tactics: save.tactics,
			clubId: save.clubId
		} : {
			ids: [...live.oppXi],
			formation: live.oppForm,
			tactics: opp,
			clubId: live.oppId
		},
		awayPlan: live.home ? {
			ids: [...live.oppXi],
			formation: live.oppForm,
			tactics: opp,
			clubId: live.oppId
		} : {
			ids: [...live.xi],
			formation: save.tactics.formation,
			tactics: save.tactics,
			clubId: save.clubId
		}
	};
}
function fillChunk(save, live) {
	const cap = live.minute < 45 ? 45 : 90;
	const from = Math.max(1, live.minute);
	const to = Math.min(cap, from + 4);
	const { homePlan, awayPlan } = plans(save, live);
	const score = {
		h: live.hg,
		a: live.ag
	};
	const seg = simulateSegment(save, homePlan, awayPlan, from, Math.max(from + 1, to), live.fixtureId + ":" + from + ":" + live.subsUsed, score);
	live.queue.push(...seg.events);
	live.xgH += seg.xgH;
	live.xgA += seg.xgA;
	if (!seg.events.length) live.queue.push({
		min: Math.min(to, from + 1),
		text: "Мяч гуляет между линиями, команды не торопятся и ждут ошибку в опорной зоне.",
		kind: "info",
		side: live.side
	});
}
function queueOpp(save, live) {
	const tired = live.oppXi.map((id) => ({
		id,
		mins: live.mins[id] ?? 0,
		p: save.players.find((pl) => pl.id === id)
	})).filter((x) => x.p && x.p.pos !== "GK").sort((a, b) => a.p.cond - b.p.cond || b.mins - a.mins)[0];
	if (!tired) return;
	const inn = save.players.filter((p) => p.clubId === live.oppId && !live.oppXi.includes(p.id) && p.injured <= 0 && p.ban <= 0).sort((a, b) => overall(b) - overall(a))[0];
	if (!inn || live.oppPending.some((s) => s.out === tired.id)) return;
	live.oppPending.push({
		out: tired.id,
		in: inn.id
	});
}
function applyQueued(save, live, reason) {
	const bits = [];
	const mine = live.pending[0];
	if (mine && live.subsUsed < 5) {
		live.pending = live.pending.slice(1);
		const i = live.xi.indexOf(mine.out);
		if (i >= 0) {
			live.xi[i] = mine.in;
			live.subsUsed += 1;
			const a = save.players.find((p) => p.id === mine.out);
			const b = save.players.find((p) => p.id === mine.in);
			bits.push(`${a?.last ?? "Игрок"} уходит к скамейке, ${b?.last ?? "запасной"} выходит и сразу вступает в игру`);
			save.tactics.slots = [...live.xi];
		}
	}
	const opp = live.oppPending[0];
	if (opp && live.oppSubs < 4) {
		live.oppPending = live.oppPending.slice(1);
		const i = live.oppXi.indexOf(opp.out);
		if (i >= 0) {
			live.oppXi[i] = opp.in;
			live.oppSubs += 1;
			const a = save.players.find((p) => p.id === opp.out);
			const b = save.players.find((p) => p.id === opp.in);
			const club = save.clubs.find((c) => c.id === live.oppId)?.short ?? "соперник";
			bits.push(`у «${club}» ${a?.last ?? "игрок"} покидает поле, вместо него выходит ${b?.last ?? "запасной"}`);
		}
	}
	if (!bits.length) return "";
	const text = `${pauseWord(reason)}. ${bits.join("; ")}.`;
	live.events = [...live.events, {
		min: live.minute,
		text,
		kind: "sub"
	}];
	live.queue = [];
	return text;
}
function pauseWord(reason) {
	const t = reason.toLowerCase();
	if (t.includes("перерыв")) return "Перерыв";
	if (t.includes("угловой")) return "Угловой";
	if (t.includes("аут") || t.includes("боков")) return "Аут";
	if (t.includes("от ворот")) return "Удар от ворот";
	if (t.includes("штрафн") || t.includes("фол")) return "Штрафной";
	if (t.includes("карточ")) return "После карточки";
	if (t.includes("гол") || t.includes("сетк") || t.includes("счёт") || t.includes("табло")) return "После гола";
	if (t.includes("прихрам")) return "Пауза";
	return "Остановка";
}
function loadFolder() {
	if (!openWebStorage()) return emptyFolder();
	try {
		const own = readFolder(readRaw(folderKey()));
		if (own) return own;
		const legacy = readFolder(readRaw(LEGACY));
		if (legacy) {
			writeRaw(folderKey(), JSON.stringify(legacy));
			removeRaw(LEGACY);
			return legacy;
		}
		const old = readRaw(OLD);
		if (old) {
			const save = migrate(JSON.parse(old));
			if (save?.clubId) {
				const slots = [
					{ save },
					null,
					null
				];
				const folder = {
					v: 2,
					active: 0,
					slots,
					glory: mergeGlory([], slots)
				};
				writeRaw(folderKey(), JSON.stringify(folder));
				removeRaw(OLD);
				return folder;
			}
		}
	} catch {}
	return emptyFolder();
}
function readFolder(raw) {
	if (!raw) return null;
	const parsed = JSON.parse(raw);
	if (parsed?.slots?.length !== 3) return null;
	const slots = parsed.slots.map((s) => s?.save?.clubId ? { save: migrate(s.save) } : null);
	const glory = mergeGlory(parsed.glory ?? [], slots);
	return {
		v: 2,
		active: Math.min(2, Math.max(0, parsed.active || 0)),
		slots,
		glory
	};
}
function mergeGlory(saved, slots) {
	const out = [...saved];
	for (const slot of slots) {
		if (!slot?.save) continue;
		for (const g of fromLog(slot.save)) if (!out.some((x) => sameGlory(x, g))) out.push(g);
	}
	return out;
}
function migrate(raw) {
	const save = raw;
	const club = save.clubs?.find((c) => c.id === save.clubId);
	if (!save.kit && club) save.kit = {
		home: autoKit(club, "home"),
		away: autoKit(club, "away")
	};
	if (!save.players) save.players = [];
	for (const p of save.players) {
		if (!p.ovr) {
			p.ovr = overall(p);
			p.pot = p.age <= 23 ? Math.min(88, p.ovr + 6) : p.age >= 30 ? p.ovr : p.ovr + 2;
			p.growth = 0;
		}
		const side = save.clubs.find((c) => c.id === p.clubId);
		if (side?.league === "media") {
			const base = {
				d2rots: 74,
				amkal: 72,
				broke: 71,
				fk10: 70,
				lit: 69,
				rodmedia: 68,
				fight: 66,
				matchtv: 64
			}[side.id] ?? 66;
			if (p.ovr < base - 8) p.ovr = base - hash(p.id) % 4;
		}
		if (side && p.ovr) p.value = priceRub(p.ovr, p.age, side.league, side.rep);
	}
	if (!save.cup) save.cup = freshCup();
	if (!save.euro) save.euro = freshEuro();
	if (!save.phase) save.phase = "season";
	if (save.badSeasons == null) save.badSeasons = 0;
	if (!save.log) save.log = [];
	if (!save.manager) save.manager = "Тренер";
	if (!save.difficulty) save.difficulty = "experienced";
	if (save.matchMins !== 2 && save.matchMins !== 3 && save.matchMins !== 5) save.matchMins = 2;
	if (save.tactics) {
		if (save.tactics.style === "pass") save.tactics.style = "tiki";
		if (![
			"tiki",
			"bus",
			"counter",
			"direct",
			"gegen",
			"wing",
			"vertical"
		].includes(save.tactics.style)) save.tactics.style = "tiki";
	}
	save.v = 3;
	return save;
}
function PitchLive({ save, live, home, away, selected, wide, onSelect }) {
	const ref = (0, import_react.useRef)(null);
	const propsRef = (0, import_react.useRef)({
		save,
		live,
		home,
		away,
		selected,
		wide
	});
	propsRef.current = {
		save,
		live,
		home,
		away,
		selected,
		wide
	};
	const bodies = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const hits = (0, import_react.useRef)([]);
	const flow = (0, import_react.useRef)({
		anchor: "",
		id: "",
		toId: "",
		passUntil: 0,
		nextAt: 0,
		fromX: 0,
		fromY: 0,
		toX: 0,
		toY: 0,
		bx: 0,
		by: 0
	});
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const node = ref.current;
			if (node) paint(node, propsRef.current, bodies.current, hits.current, flow.current, dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pitch-canvas",
		onClick: (e) => {
			if (!onSelect) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			let best = null;
			for (const hit of hits.current) {
				if (!hit.mine || !hit.id) continue;
				const d = (hit.x - x) ** 2 + (hit.y - y) ** 2;
				if (d < 1156 && (!best || d < best.d)) best = {
					id: hit.id,
					d
				};
			}
			if (best) onSelect(best.id);
		}
	});
}
function paint(node, props, bodies, hits, flow, dt) {
	const { save, live, home, away, selected, wide } = props;
	const dpr = Math.min(2, window.devicePixelRatio || 1);
	const w = node.clientWidth || 320;
	const h = node.clientHeight || 460;
	const pw = Math.floor(w * dpr);
	const ph = Math.floor(h * dpr);
	if (node.width !== pw || node.height !== ph) {
		node.width = pw;
		node.height = ph;
	}
	const ctx = node.getContext("2d");
	if (!ctx) return;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const t = reduce ? live.minute : performance.now() / 1e3;
	const layout = w > h * 1.08;
	const stamp = bodies.get("__layout");
	if (!stamp || stamp.phase !== (layout ? 1 : 0)) {
		bodies.clear();
		bodies.set("__layout", {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			phase: layout ? 1 : 0
		});
	}
	ctx.fillStyle = "#0e1418";
	ctx.fillRect(0, 0, w, h);
	const homeKit = home.id === save.clubId ? save.kit.home : autoKit(home, "home");
	const awayKit = away.id === save.clubId ? save.kit.away : autoKit(away, "away");
	const myKit = home.id === save.clubId ? homeKit : awayKit;
	const oppKit = home.id === save.clubId ? awayKit : homeKit;
	const box = bounds(w, h, layout);
	if (layout) {
		drawStand(ctx, 0, 0, box.x0, h, oppKit.primary, oppKit.secondary, t);
		drawStand(ctx, box.x1, 0, w - box.x1, h, myKit.primary, myKit.secondary, t + 1.3);
	} else {
		drawStand(ctx, 0, 0, w, box.y0, oppKit.primary, oppKit.secondary, t);
		drawStand(ctx, 0, box.y1, w, h - box.y1, myKit.primary, myKit.secondary, t + 1.3);
	}
	drawPitch(ctx, w, h, layout);
	const homeForm = live.home ? save.tactics.formation : live.oppForm;
	const awayForm = live.home ? live.oppForm : save.tactics.formation;
	const homeIds = live.home ? live.xi : live.oppXi;
	const awayIds = live.home ? live.oppXi : live.xi;
	const elapsed = live.pieceAt ? (performance.now() - live.pieceAt) / 1e3 : 99;
	const setOn = live.piece !== "open" && elapsed < 2.05;
	const wind = setOn ? Math.max(0, Math.min(1, (elapsed - .28) / 1.55)) : 1;
	const attackUp = live.side === "h";
	const spots = [];
	const collect = (ids, form, mine, kit, flip) => {
		FORMATIONS[form].forEach((slot, i) => {
			const id = ids[i] || "";
			const player = save.players.find((p) => p.id === id);
			const gk = slot.pos === "GK" || player?.pos === "GK";
			let x = flip ? 100 - slot.x : slot.x;
			let y = flip ? 100 - slot.y : slot.y;
			if (gk) {
				x = 50 + (setOn ? 0 : Math.sin(t * 1.15 + (flip ? 1 : 0)) * 2.4);
				y = flip ? 5 : 95;
			} else if (!setOn) {
				const push = live.side === "h" && !flip || live.side === "a" && flip ? flip ? 11 : -11 : flip ? -5 : 5;
				y += push;
				x += Math.sin(i * 1.7) * 1.4;
				x = Math.max(10, Math.min(90, x));
				y = Math.max(10, Math.min(90, y));
			}
			spots.push({
				id,
				x,
				y,
				gk,
				mine,
				kit,
				player,
				key: `${flip ? "a" : "h"}-${i}`,
				flip
			});
		});
	};
	collect(homeIds, homeForm, live.home, homeKit, false);
	collect(awayIds, awayForm, !live.home, awayKit, true);
	const attackers = spots.filter((s) => s.id && !s.gk && (attackUp && !s.flip || !attackUp && s.flip));
	if (!setOn && attackers.length) {
		const nowMs = performance.now();
		const known = attackers.some((s) => s.id === flow.id);
		if (flow.anchor !== live.baller || !known) {
			flow.anchor = live.baller;
			flow.id = attackers.some((s) => s.id === live.baller) ? live.baller : attackers[0].id;
			flow.toId = "";
			flow.passUntil = 0;
			flow.nextAt = nowMs + 1400;
		}
		const carrierSpot = attackers.find((s) => s.id === flow.id) ?? attackers[0];
		const lead = Math.sin(t * 1.15) * 7;
		carrierSpot.x = Math.max(14, Math.min(86, carrierSpot.x * .72 + 50 * .28 + lead));
		carrierSpot.y = Math.max(16, Math.min(84, carrierSpot.y + (carrierSpot.flip ? 7 : -7)));
		spots.filter((s) => s.id && !s.gk && s.flip !== carrierSpot.flip).sort((a, b) => (a.x - carrierSpot.x) ** 2 + (a.y - carrierSpot.y) ** 2 - ((b.x - carrierSpot.x) ** 2 + (b.y - carrierSpot.y) ** 2)).slice(0, 3).forEach((d, i) => {
			d.x = d.x * .42 + carrierSpot.x * .58 + (i - 1) * 7;
			d.y = d.y * .5 + carrierSpot.y * .5;
		});
		attackers.filter((s) => s.id !== carrierSpot.id).sort((a, b) => (a.x - carrierSpot.x) ** 2 + (a.y - carrierSpot.y) ** 2 - ((b.x - carrierSpot.x) ** 2 + (b.y - carrierSpot.y) ** 2)).slice(0, 2).forEach((d, i) => {
			d.x = d.x * .62 + carrierSpot.x * .38 + (i === 0 ? -9 : 9);
			d.y = d.y * .7 + carrierSpot.y * .3;
		});
	}
	const taker = spots.find((s) => s.id && s.id === (setOn ? live.baller : flow.id)) ?? spots.find((s) => s.id && (attackUp && !s.flip || !attackUp && s.flip) && !s.gk);
	if (setOn && taker) {
		if (live.piece === "fk") {
			taker.x = attackUp ? 64 : 36;
			taker.y = attackUp ? 28 : 72;
			spots.filter((s) => s.flip !== taker.flip && !s.gk).slice(0, 4).forEach((d, i) => {
				d.x = 44 + i * 4.2;
				d.y = attackUp ? 21 : 79;
			});
		} else if (live.piece === "pen") {
			taker.x = 50;
			taker.y = attackUp ? 18 : 82;
			const gk = spots.find((s) => s.flip !== taker.flip && s.gk);
			if (gk && wind > .35) gk.x = live.shot === "curl" || live.shot === "placed" ? 40 : 60;
		} else if (live.piece === "throw") {
			taker.x = 6;
			taker.y = 48;
		} else if (live.piece === "corner") {
			taker.x = attackUp ? 8 : 92;
			taker.y = attackUp ? 8 : 92;
		}
	}
	hits.length = 0;
	const drawList = [];
	const scale = layout ? Math.max(1.05, Math.min(1.45, Math.min(w, h) / 380)) : Math.max(.92, Math.min(1.15, w / 390));
	const drawn = [];
	for (const spot of spots) {
		const target = toPx(spot.x, spot.y, w, h, layout);
		let body = bodies.get(spot.key);
		if (!body) {
			body = {
				x: target.x,
				y: target.y,
				vx: 0,
				vy: 0,
				phase: spots.indexOf(spot)
			};
			bodies.set(spot.key, body);
		}
		const carrierNow = !setOn && spot.id === flow.id;
		if (reduce) {
			body.x = target.x;
			body.y = target.y;
			body.vx = 0;
			body.vy = 0;
		} else {
			const dx = target.x - body.x;
			const dy = target.y - body.y;
			const dist = Math.hypot(dx, dy) || 1;
			const cap = spot.gk ? 48 : carrierNow ? 132 : 86;
			const accel = spot.gk ? 180 : carrierNow ? 380 : 250;
			if (dist > 1.4) {
				body.vx += dx / dist * accel * dt;
				body.vy += dy / dist * accel * dt;
			}
			const drag = Math.exp(-dt * (carrierNow ? 1.15 : 2.6));
			body.vx *= drag;
			body.vy *= drag;
			const sp = Math.hypot(body.vx, body.vy);
			if (sp > cap) {
				body.vx = body.vx / sp * cap;
				body.vy = body.vy / sp * cap;
			}
			body.x += body.vx * dt;
			body.y += body.vy * dt;
		}
		const moving = Math.hypot(body.vx, body.vy) > 12;
		body.phase += reduce ? 0 : dt * (spot.gk ? 2.2 : carrierNow ? 11 : moving ? 7.2 : 2.4);
	}
	const actors = spots.map((spot) => bodies.get(spot.key)).filter(Boolean);
	if (!reduce) for (let i = 0; i < actors.length; i++) for (let j = i + 1; j < actors.length; j++) {
		const a = actors[i];
		const b = actors[j];
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const dist = Math.hypot(dx, dy) || 1;
		const min = 18 * scale;
		if (dist < min) {
			const push = (min - dist) / 2;
			a.x -= dx / dist * push;
			a.y -= dy / dist * push;
			b.x += dx / dist * push;
			b.y += dy / dist * push;
		}
	}
	for (const spot of spots) {
		const body = bodies.get(spot.key);
		!setOn && (spot.id, flow.id);
		const px = body.x;
		const py = body.y;
		const lean = Math.max(-.4, Math.min(.4, (layout ? body.vy : body.vx) / 200));
		drawn.push({
			id: spot.id,
			x: px,
			y: py,
			flip: spot.flip,
			phase: body.phase
		});
		drawList.push({
			y: py,
			draw: () => {
				drawRunner(ctx, px, py, spot.kit, spot.player, spot.gk, body.phase, selected === spot.id, scale * (spot.gk ? 1.12 : 1), lean);
			}
		});
		hits.push({
			id: spot.id,
			x: px,
			y: py,
			mine: spot.mine && !!spot.id
		});
	}
	drawList.sort((a, b) => a.y - b.y).forEach((item) => item.draw());
	const coachPhase = t * 1.7;
	if (layout) drawCoach(ctx, (box.x0 + box.x1) / 2 + Math.sin(coachPhase) * 22, box.y1 + 24, myKit.primary, coachPhase, scale * .92);
	else drawCoach(ctx, box.x0 - 14, (box.y0 + box.y1) / 2 + Math.sin(coachPhase) * 18, myKit.primary, coachPhase, scale);
	const nowMs = performance.now();
	if (!setOn && !reduce && attackers.length > 1 && nowMs >= flow.passUntil && nowMs >= flow.nextAt) {
		const cur = drawn.find((d) => d.id === flow.id);
		const options = drawn.filter((d) => d.id && attackers.some((s) => s.id === d.id) && d.id !== flow.id);
		const mate = options[Math.floor(Math.abs(Math.sin(t * 9.1)) * options.length)] ?? options[0];
		if (cur && mate) {
			flow.toId = mate.id;
			flow.fromX = cur.x;
			flow.fromY = cur.y + 8 * scale;
			flow.toX = mate.x;
			flow.toY = mate.y + 8 * scale;
			flow.passUntil = nowMs + 620;
			flow.nextAt = nowMs + 2100 + Math.floor(Math.abs(Math.sin(t * 4.2)) * 1100);
		}
	}
	if (!setOn && flow.toId && nowMs >= flow.passUntil) {
		flow.id = flow.toId;
		flow.toId = "";
	}
	const carrier = drawn.find((d) => d.id && d.id === (setOn ? taker?.id || live.baller : flow.id)) ?? drawn.find((d) => d.id);
	let ball = carrier ? feetBall(carrier, scale, layout) : toPx(50, 50, w, h, layout);
	if (!setOn && flow.toId && nowMs < flow.passUntil) {
		const u = 1 - (flow.passUntil - nowMs) / 620;
		const lift = Math.sin(Math.min(1, Math.max(0, u)) * Math.PI) * 18 * scale;
		ball = {
			x: flow.fromX + (flow.toX - flow.fromX) * u,
			y: flow.fromY + (flow.toY - flow.fromY) * u - lift
		};
	} else if (setOn && taker) {
		const start = toPx(taker.x, taker.y, w, h, layout);
		const endPct = live.piece === "throw" ? {
			x: 32,
			y: 46
		} : live.piece === "corner" ? {
			x: attackUp ? 48 : 52,
			y: attackUp ? 16 : 84
		} : {
			x: live.shot === "curl" ? attackUp ? 34 : 66 : live.shot === "placed" ? 62 : 50,
			y: attackUp ? 5 : 95
		};
		const end = toPx(endPct.x, endPct.y, w, h, layout);
		const u = wind;
		let x = start.x + (end.x - start.x) * u;
		let y = start.y + (end.y - start.y) * u;
		if (live.shot === "curl") {
			const bend = Math.sin(u * Math.PI) * 42 * scale;
			if (layout) y += attackUp ? bend : -bend;
			else x += attackUp ? -bend : bend;
		}
		const arc = live.shot === "chip" || live.piece === "throw" || live.piece === "corner" ? 72 : live.shot === "power" ? 16 : 8;
		const lift = Math.sin(u * Math.PI) * arc * scale;
		ball = {
			x,
			y: y - lift + (u < .08 ? 8 * scale : 0)
		};
	} else if (carrier) {
		const feet = feetBall(carrier, scale, layout);
		if (!flow.bx && !flow.by) {
			flow.bx = feet.x;
			flow.by = feet.y;
		}
		const chase = reduce ? 1 : Math.min(1, dt * 9);
		flow.bx += (feet.x - flow.bx) * chase;
		flow.by += (feet.y - flow.by) * chase;
		ball = {
			x: flow.bx,
			y: flow.by
		};
	}
	flow.bx = ball.x;
	flow.by = ball.y;
	drawBall(ctx, ball.x, ball.y, 9.2 * scale, t);
	if (setOn) {
		const label = live.piece === "fk" ? live.shot === "chip" ? "Штрафной · перекидка" : live.shot === "curl" ? "Штрафной · крученый" : "Штрафной" : live.piece === "pen" ? "Пенальти" : live.piece === "throw" ? "Аут" : "Угловой";
		ctx.fillStyle = "rgba(8,16,12,0.78)";
		ctx.fillRect(w / 2 - 86, box.y0 + 4, 172, 22);
		ctx.fillStyle = "#f4f7f2";
		ctx.font = "600 12px Manrope, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(label, w / 2, box.y0 + 15);
	}
}
function feetBall(d, scale, layout) {
	const stride = Math.sin(d.phase * 2) * 4 * scale;
	const dir = d.flip ? 1 : -1;
	if (layout) return {
		x: d.x + dir * 7 * scale,
		y: d.y + 5 * scale + stride * .2
	};
	return {
		x: d.x + stride,
		y: d.y + 9 * scale + dir * 3.5 * scale
	};
}
function bounds(w, h, wide) {
	if (wide) return {
		x0: 78,
		y0: 20,
		x1: w - 78,
		y1: h - 48
	};
	return {
		x0: 36,
		y0: 58,
		x1: w - 14,
		y1: h - 58
	};
}
function toPx(xPct, yPct, w, h, wide) {
	const { x0, y0, x1, y1 } = bounds(w, h, wide);
	if (!wide) return {
		x: x0 + xPct / 100 * (x1 - x0),
		y: y0 + yPct / 100 * (y1 - y0)
	};
	return {
		x: x0 + yPct / 100 * (x1 - x0),
		y: y0 + xPct / 100 * (y1 - y0)
	};
}
function drawPitch(ctx, w, h, wide) {
	const { x0, y0, x1, y1 } = bounds(w, h, wide);
	const fw = x1 - x0;
	const fh = y1 - y0;
	const bands = wide ? 12 : 9;
	for (let i = 0; i < bands; i++) {
		ctx.fillStyle = i % 2 ? "#187a40" : "#146536";
		if (wide) ctx.fillRect(x0 + fw / bands * i, y0, fw / bands + 1, fh);
		else ctx.fillRect(x0, y0 + fh / bands * i, fw, fh / bands + 1);
	}
	ctx.strokeStyle = "rgba(255,255,255,0.78)";
	ctx.lineWidth = 2;
	ctx.strokeRect(x0, y0, fw, fh);
	ctx.beginPath();
	if (wide) {
		ctx.moveTo((x0 + x1) / 2, y0);
		ctx.lineTo((x0 + x1) / 2, y1);
	} else {
		ctx.moveTo(x0, (y0 + y1) / 2);
		ctx.lineTo(x1, (y0 + y1) / 2);
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.arc((x0 + x1) / 2, (y0 + y1) / 2, Math.min(fw, fh) * .13, 0, Math.PI * 2);
	ctx.stroke();
	if (wide) {
		const depth = fw * .18;
		const span = fh * .5;
		const sixD = fw * .07;
		const sixS = fh * .28;
		ctx.strokeRect(x0, (y0 + y1) / 2 - span / 2, depth, span);
		ctx.strokeRect(x1 - depth, (y0 + y1) / 2 - span / 2, depth, span);
		ctx.strokeRect(x0, (y0 + y1) / 2 - sixS / 2, sixD, sixS);
		ctx.strokeRect(x1 - sixD, (y0 + y1) / 2 - sixS / 2, sixD, sixS);
		goal(ctx, x0 - 18, (y0 + y1) / 2 - 36, 18, 72);
		goal(ctx, x1, (y0 + y1) / 2 - 36, 18, 72);
	} else {
		const depth = fh * .16;
		const span = fw * .56;
		const sixD = fh * .065;
		const sixS = fw * .32;
		ctx.strokeRect((x0 + x1) / 2 - span / 2, y0, span, depth);
		ctx.strokeRect((x0 + x1) / 2 - span / 2, y1 - depth, span, depth);
		ctx.strokeRect((x0 + x1) / 2 - sixS / 2, y0, sixS, sixD);
		ctx.strokeRect((x0 + x1) / 2 - sixS / 2, y1 - sixD, sixS, sixD);
		goal(ctx, (x0 + x1) / 2 - 40, y0 - 16, 80, 16);
		goal(ctx, (x0 + x1) / 2 - 40, y1, 80, 16);
	}
}
function drawStand(ctx, x, y, w, h, primary, secondary, t) {
	if (w < 8 || h < 8) return;
	ctx.save();
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.clip();
	ctx.fillStyle = "#141b20";
	ctx.fillRect(x, y, w, h);
	const cols = Math.max(6, Math.floor((Math.max(w, h) > 80 ? w : h) / 11));
	const rows = Math.max(3, Math.floor((w > h ? h : w) / 14));
	const wide = w >= h;
	for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
		const bob = Math.sin(t * 2.8 + c * .65 + r * 1.3) * 1.5;
		const px = wide ? x + 4 + (w - 8) / cols * c : x + 4 + (w - 8) / rows * r;
		const py = wide ? y + 8 + (h - 10) / rows * r + bob : y + 6 + (h - 8) / cols * c + bob;
		ctx.fillStyle = (c + r) % 4 === 0 ? secondary : primary;
		ctx.fillRect(px, py, 6, 7);
		ctx.fillStyle = (c + r * 2) % 7 === 0 ? "#c98b62" : "#e2b48a";
		ctx.beginPath();
		ctx.arc(px + 3, py - 2, 2.4, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}
function drawCoach(ctx, x, y, color, phase, scale) {
	const arm = Math.sin(phase) * 5 * scale;
	ctx.save();
	ctx.translate(x, y);
	ctx.fillStyle = "rgba(0,0,0,0.35)";
	ctx.beginPath();
	ctx.ellipse(0, 18 * scale, 11 * scale, 3.2 * scale, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#141414";
	ctx.lineWidth = 3 * scale;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(-3 * scale, 4 * scale);
	ctx.lineTo(-4 * scale, 16 * scale);
	ctx.moveTo(3 * scale, 4 * scale);
	ctx.lineTo(5 * scale, 16 * scale);
	ctx.stroke();
	ctx.fillStyle = "#1a1f24";
	roundRect(ctx, -8 * scale, -10 * scale, 16 * scale, 16 * scale, 3 * scale);
	ctx.fill();
	ctx.fillStyle = color;
	ctx.fillRect(-2.4 * scale, -10 * scale, 4.8 * scale, 16 * scale);
	ctx.fillStyle = "#e2b48a";
	ctx.beginPath();
	ctx.arc(0, -16 * scale, 4.3 * scale, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = color;
	ctx.fillRect(-5 * scale, -21 * scale, 10 * scale, 3.4 * scale);
	ctx.strokeStyle = "#e2b48a";
	ctx.lineWidth = 2.2 * scale;
	ctx.beginPath();
	ctx.moveTo(7 * scale, -4 * scale);
	ctx.lineTo((13 + arm) * scale, -9 * scale);
	ctx.stroke();
	ctx.restore();
}
function goal(ctx, x, y, w, h) {
	ctx.save();
	ctx.fillStyle = "rgba(255,255,255,0.14)";
	ctx.fillRect(x, y, w, h);
	ctx.strokeStyle = "#f4f7f5";
	ctx.lineWidth = 3;
	ctx.strokeRect(x, y, w, h);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(255,255,255,0.45)";
	for (let i = 1; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(x + w / 4 * i, y);
		ctx.lineTo(x + w / 4 * i, y + h);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y + h / 3 * i);
		ctx.lineTo(x + w, y + h / 3 * i);
		ctx.stroke();
	}
	ctx.restore();
}
function drawRunner(ctx, x, y, kit, player, gk, phase, selected, scale, lean = 0) {
	const run = Math.sin(phase);
	const primary = gk ? gkTone(kit.primary).shirt : kit.primary;
	const trim = gk ? gkTone(kit.primary).trim : kit.secondary;
	const socks = gk ? gkTone(kit.primary).socks : kit.socks;
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(lean);
	ctx.fillStyle = "rgba(0,0,0,0.28)";
	ctx.beginPath();
	ctx.ellipse(0, 16 * scale, 8 * scale, 3 * scale, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = socks;
	ctx.lineWidth = 3 * scale;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(-3.2 * scale, 4 * scale);
	ctx.lineTo((-4.5 + run * 5) * scale, 15 * scale);
	ctx.moveTo(3.2 * scale, 4 * scale);
	ctx.lineTo((4.5 - run * 5) * scale, 15 * scale);
	ctx.stroke();
	ctx.fillStyle = trim;
	ctx.fillRect(-6 * scale, 2 * scale, 12 * scale, 5 * scale);
	ctx.fillStyle = primary;
	roundRect(ctx, -7 * scale, -8 * scale, 14 * scale, 12 * scale, 3 * scale);
	ctx.fill();
	if (gk) {
		ctx.fillStyle = trim;
		for (let i = 0; i < 3; i++) ctx.fillRect(-7 * scale, (-6 + i * 3.4) * scale, 14 * scale, 1.3 * scale);
	} else if (kit.design % 3 === 1) {
		ctx.fillStyle = trim;
		ctx.fillRect(-1.2 * scale, -8 * scale, 2.4 * scale, 12 * scale);
	}
	ctx.strokeStyle = "#e2b48a";
	ctx.lineWidth = 2.3 * scale;
	ctx.beginPath();
	ctx.moveTo(-6 * scale, -4 * scale);
	ctx.lineTo((-11 + run) * scale, 1 * scale);
	ctx.moveTo(6 * scale, -4 * scale);
	ctx.lineTo((11 - run) * scale, 1 * scale);
	ctx.stroke();
	if (gk) {
		glove(ctx, (-11 + run) * scale, 1 * scale, scale);
		glove(ctx, (11 - run) * scale, 1 * scale, scale);
	}
	ctx.fillStyle = "#e2b48a";
	ctx.beginPath();
	ctx.arc(0, -12 * scale, 4.1 * scale, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = luminance(primary) > .62 ? "#14201b" : "#fff";
	ctx.font = `700 ${Math.round(9 * scale)}px Outfit, sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(String(player?.number ?? ""), 0, -2 * scale);
	if (selected) {
		ctx.shadowBlur = 0;
		ctx.strokeStyle = "#f2c200";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(0, 2 * scale, 16 * scale, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.restore();
}
function glove(ctx, x, y, scale) {
	ctx.save();
	ctx.fillStyle = "#f7f4ee";
	ctx.strokeStyle = "#1a1a1a";
	ctx.lineWidth = .8;
	ctx.beginPath();
	ctx.arc(x, y, 4.1 * scale, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
function drawBall(ctx, x, y, r, t) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(t * 2.2);
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.beginPath();
	ctx.ellipse(2, r + 6, r * .8, r * .35, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(0, 0, r, 0, Math.PI * 2);
	ctx.fillStyle = "#f4f4f4";
	ctx.fill();
	ctx.strokeStyle = "#1a1a1a";
	ctx.lineWidth = 1;
	ctx.beginPath();
	for (let i = 0; i < 5; i++) {
		const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
		const px = Math.cos(a) * r * .36;
		const py = Math.sin(a) * r * .36;
		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
	ctx.fillStyle = "#161616";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(0, 0, r, 0, Math.PI * 2);
	ctx.stroke();
	ctx.restore();
}
function gkTone(team) {
	const grass = "#187a40";
	const shirt = [
		"#f2c200",
		"#ff5a1f",
		"#6c3ce0",
		"#111111",
		"#f7f4ee",
		"#2f6fed"
	].map((c) => ({
		c,
		d: colorDist(c, team) + colorDist(c, grass) * 1.35
	})).sort((a, b) => b.d - a.d)[0].c;
	return {
		shirt,
		trim: luminance(shirt) > .62 ? "#111111" : "#f7f4ee",
		socks: luminance(shirt) > .62 ? "#1a1a1a" : shirt
	};
}
function colorDist(a, b) {
	const pa = rgb(a);
	const pb = rgb(b);
	return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
}
function rgb(hex) {
	const h = hex.replace("#", "");
	if (h.length < 6) return [
		0,
		0,
		0
	];
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16)
	];
}
function luminance(hex) {
	const h = hex.replace("#", "");
	if (h.length < 6) return 0;
	const r = parseInt(h.slice(0, 2), 16) / 255;
	const g = parseInt(h.slice(2, 4), 16) / 255;
	const b = parseInt(h.slice(4, 6), 16) / 255;
	return .2126 * r + .7152 * g + .0722 * b;
}
function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function ManagerApp() {
	const boot = useFm((s) => s.boot);
	const screen = useFm((s) => s.screen);
	const live = useFm((s) => s.live);
	const playerId = useFm((s) => s.playerId);
	const running = screen === "match" && !!live && !live.done && !live.paused && !live.menu && !live.userPause;
	const matchMins = useFm((s) => s.save?.matchMins === 3 || s.save?.matchMins === 5 ? s.save.matchMins : 2);
	(0, import_react.useEffect)(() => {
		boot();
	}, [boot]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const ms = Math.round(matchMins * 60 * 1e3 / 90);
		const id = window.setInterval(() => useFm.getState().tick(), ms);
		return () => window.clearInterval(id);
	}, [running, matchMins]);
	const bare = screen === "boot" || screen === "pick" || screen === "kits" || screen === "sacked" || screen === "honors";
	const cutscene = useFm((s) => s.cutscene);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `desk${screen === "match" ? " desk-match" : ""}${screen === "boot" ? "" : " desk-play"}`,
		children: [
			screen !== "boot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "fp-corner",
				children: "Football pro"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desk-scroll",
				children: [
					screen === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {}),
					screen === "honors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Honors, {}),
					screen === "pick" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {}),
					screen === "kits" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kits, {}),
					screen === "sacked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sacked, {}),
					!bare && screen === "desk" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {}),
					screen === "squad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Squad, {}),
					screen === "player" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerCard, {}, playerId ?? "p"),
					screen === "tactics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tactics, {}),
					screen === "match" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Match, {}),
					screen === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {}),
					screen === "market" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Market, {}),
					screen === "inbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {}),
					screen === "money" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {}),
					screen === "calendar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {}),
					screen === "cups" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cups, {})
				]
			}),
			!bare && screen !== "match" && screen !== "player" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			cutscene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrophyScene, {}) : null
		]
	});
}
function TrophyScene() {
	const g = useFm((s) => s.cutscene);
	const save = useFm((s) => s.save);
	if (!g) return null;
	const club = save?.clubs.find((c) => c.id === save.clubId);
	const kit = save?.kit.home;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "trophy-scene",
		role: "dialog",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Заслуга сезона"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "trophy-photo",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "trophy-team",
					children: kit ? [
						0,
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
						kit,
						size: 46 + (i === 2 ? 8 : 0)
					}, i)) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrophyShape, { kind: g.cup })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "word",
				children: g.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					g.who,
					club ? ` · ${club.name}` : "",
					" · ",
					g.season,
					"/",
					String(g.season + 1).slice(2)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					onClick: () => {
						useFm.getState().dismissTrophy();
						useFm.getState().go("honors");
					},
					children: "В заслуги"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn ghost",
					onClick: () => useFm.getState().dismissTrophy(),
					children: "Дальше"
				})]
			})
		]
	});
}
function TrophyShape({ kind }) {
	const metal = kind === "uel" ? "#c4622d" : kind === "uecl" ? "#1f8a6a" : kind === "fnl3" ? "#a56b3c" : kind === "media" ? "#1a1a1a" : kind === "cup" ? "#d5dbe3" : kind === "fnl" || kind === "fnl2" ? "#c5ccd4" : "#e4c56a";
	const ears = kind === "ucl";
	const ball = kind === "cup";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "trophy-svg",
		viewBox: "0 0 120 150",
		"aria-hidden": true,
		children: [
			ears ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 28c-16 8-16 36 2 42M102 28c16 8 16 36-2 42",
				fill: "none",
				stroke: metal,
				strokeWidth: "7"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: ball ? "M40 18h40v8H40z" : "M34 16h52l-6 10H40z",
				fill: metal
			}),
			ball ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "14",
				r: "8",
				fill: "#f4f4f4",
				stroke: "#222"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M38 28h44c2 22-2 40-8 52H46c-6-12-10-30-8-52z",
				fill: metal
			}),
			!ears && kind !== "cup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M38 36c-10 4-12 18-4 22M82 36c10 4 12 18 4 22",
				fill: "none",
				stroke: metal,
				strokeWidth: "5"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "54",
				y: "80",
				width: "12",
				height: "28",
				fill: metal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "108",
				width: "48",
				height: "10",
				rx: "2",
				fill: kind === "media" ? "#d6a85c" : metal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "120",
				width: "64",
				height: "12",
				rx: "2",
				fill: "#2a2418"
			})
		]
	});
}
function BootLogo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "boot-logo",
		viewBox: "0 0 80 80",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "36",
				fill: "#101820",
				stroke: "#c47a12",
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "18",
				fill: "#f4f1ea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 26l6.2 4.5 2.4 7.2-4.6 5.8H36l-4.6-5.8 2.4-7.2z",
				fill: "#161616"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 34l-6 2 1 8 7 2M52 34l6 2-1 8-7 2M33 50l-2 8h18l-2-8",
				fill: "none",
				stroke: "#161616",
				strokeWidth: "1.6"
			})
		]
	});
}
function BootArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "boot-art",
		viewBox: "0 0 800 420",
		role: "img",
		"aria-label": "Ночной стадион",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "sky",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "#14102a"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#0c1c2e"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "grass",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "#1f8a45"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#0e5a2c"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "800",
				height: "420",
				fill: "url(#sky)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "140",
				cy: "70",
				rx: "90",
				ry: "28",
				fill: "rgba(196,122,18,0.18)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "660",
				cy: "70",
				rx: "90",
				ry: "28",
				fill: "rgba(196,122,18,0.18)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "70,150 730,150 780,250 20,250",
				fill: "#1a2433"
			}),
			[
				0,
				1,
				2,
				3
			].map((row) => Array.from({ length: 28 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 90 + i * 22,
				cy: 168 + row * 18,
				r: "4",
				fill: i % 3 === 0 ? "#c47a12" : i % 3 === 1 ? "#2f6fed" : "#e7efe9",
				opacity: "0.85"
			}, `${row}-${i}`))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "90,250 710,250 760,400 40,400",
				fill: "url(#grass)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: "rgba(255,255,255,0.82)",
				strokeWidth: "3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "90,250 710,250 760,400 40,400" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "65",
						y1: "325",
						x2: "735",
						y2: "325"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "400",
						cy: "325",
						rx: "54",
						ry: "22"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "300,250 500,250 540,292 260,292" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "180,400 620,400 560,360 240,360" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "400",
				cy: "368",
				r: "16",
				fill: "#f4f1ea",
				stroke: "#161616",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M400 356l5 4 2 6-4 4h-6l-4-4 2-6z",
				fill: "#161616"
			})
		]
	});
}
function Boot() {
	const folder = useFm((s) => s.folder);
	const notice = useFm((s) => s.notice);
	const stamp = useFm((s) => s.stamp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack boot-menu",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "boot-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootArt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "boot-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Сезон 2026/27"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "word fp-title",
						children: "Football pro"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: "Нажмите «Играть» — матч сразу идёт на поле, прямо в этом окне."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Сохранения лежат в Web Storage этого браузера. Кабинет ",
					stamp || "····",
					". На другом устройстве и у другого человека слоты свои, пустые."
				]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn wide",
				onClick: () => useFm.getState().playNow(),
				children: "Играть"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stack",
				children: folder.slots.map((slot, i) => {
					const save = slot?.save;
					const club = save?.clubs.find((c) => c.id === save.clubId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "card stack",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "spread",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Слот ", i + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tiny",
								children: save ? `${save.season}/${String(save.season + 1).slice(2)}` : "пусто"
							})]
						}), save && club ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { margin: 0 },
								children: save.manager
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tiny",
								style: { margin: 0 },
								children: [
									club.name,
									" · ",
									leagueMeta(club.league).short
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn",
									onClick: () => useFm.getState().activate(i),
									children: "Продолжить"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn ghost",
									onClick: () => useFm.getState().fresh(i),
									children: "Новый тренер"
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn",
							onClick: () => useFm.getState().fresh(i),
							children: "Создать тренера"
						})]
					}, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn ghost wide",
				onClick: () => useFm.getState().go("honors"),
				children: "Заслуги тренеров"
			})
		]
	});
}
function Honors() {
	const rows = honorsOf(useFm((s) => s.folder));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn quiet",
				onClick: () => useFm.getState().go(useFm.getState().save ? "desk" : "boot"),
				children: "Назад"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Стена кабинета"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				style: { fontSize: "2rem" },
				children: "Заслуги"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Сюда попадают только кубки и чемпионства этого кабинета. Запись остаётся, даже если стереть карьеру. Человек, который откроет ссылку, эту стену не увидит."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: rows.length ? rows.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: g.who }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { margin: "4px 0 0" },
							children: g.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tiny",
							style: { margin: 0 },
							children: [
								g.season,
								"/",
								String(g.season + 1).slice(2)
							]
						})
					]
				}, `${g.who}-${g.text}-${i}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { margin: 0 },
						children: "Пока пусто. Выиграйте лигу или кубок — здесь появится табличка."
					})
				})
			})
		]
	});
}
function Pick() {
	const [name, setName] = (0, import_react.useState)("А. Рубанова");
	const [league, setLeague] = (0, import_react.useState)("rpl");
	const clubs = catalog().filter((c) => c.league === league).sort((a, b) => b.rep - a.rep);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn quiet",
				onClick: () => useFm.getState().go("boot"),
				children: "Назад"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				style: { fontSize: "2rem" },
				children: "Тренер и клуб"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "tiny",
				children: ["Фамилия и имя — так подпишутся заслуги", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Выберите клуб. Дальше сразу кнопка «Начать карьеру» — сезон откроется в этой же игре."
			}),
			[{
				title: "Россия",
				ids: [
					"rpl",
					"fnl",
					"fnl2",
					"fnl3",
					"media",
					"amateur"
				]
			}, {
				title: "Другие страны",
				ids: [
					"tur",
					"bra",
					"ned",
					"por",
					"bel",
					"gre",
					"srb",
					"pol",
					"aut",
					"den"
				]
			}].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: LEAGUES.filter((l) => g.ids.includes(l.id)).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: league === l.id ? "chip on" : "chip",
					onClick: () => setLeague(l.id),
					children: l.short
				}, l.id))
			}, g.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [leagueMeta(league).name, ". Медийная лига — отдельно: там 2Drots и остальные медиа-клубы. В РПЛ 1–2 места идут в Лигу чемпионов, 3-е — в квалификацию, 4-е в Лигу Европы, 5–6 в Лигу конференций."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: clubs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "club",
					onClick: () => useFm.getState().prepare(c.id, name),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { club: c }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								style: { display: "block" },
								children: [
									c.city,
									" · ",
									c.stadium
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tiny",
							children: money(c.budget)
						})
					]
				}, c.id))
			})
		]
	});
}
function Desk() {
	const save = useFm((s) => s.save);
	const notice = useFm((s) => s.notice);
	const club = save.clubs.find((c) => c.id === save.clubId);
	const fx = userFixture(save);
	const opp = fx ? save.clubs.find((c) => c.id === (fx.home === club.id ? fx.away : fx.home)) : void 0;
	const { place, table } = placeOf(save);
	const unread = save.inbox.filter((m) => !m.read).length;
	const done = seasonDone(save);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "spread",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { club }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "word",
						style: { fontSize: "1.7rem" },
						children: club.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						style: { margin: 0 },
						children: [
							leagueMeta(club.league).short,
							" · ",
							formatDate(save.date)
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "right" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: place || "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tiny",
						children: "место"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Следующий матч"
				}), done || !fx || !opp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Календарь вашей лиги закрыт." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					onClick: () => useFm.getState().closeSeason(),
					children: "Подвести итог сезона"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									club: fx.home === club.id ? club : opp,
									size: 32
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fx.home === club.id ? club.short : opp.short })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tiny",
								children: [
									fx.label ?? (fx.home === club.id ? "дома" : "в гостях"),
									" · ",
									formatDate(fx.date)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fx.home === club.id ? opp.short : club.short }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									club: fx.home === club.id ? opp : club,
									size: 32
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						style: { margin: 0 },
						children: [
							formatDate(fx.date),
							" · ",
							opp.stadium
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn wide",
						onClick: () => useFm.getState().toMatch(),
						children: "К матчу"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Почта" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn quiet",
							onClick: () => useFm.getState().go("inbox"),
							children: unread ? `${unread} новых` : "Открыть"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: save.inbox[0]?.title ?? "Пусто"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Таблица" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn quiet",
							onClick: () => useFm.getState().go("table"),
							children: "Вся"
						})]
					}), table.slice(0, 4).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread tiny",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							i + 1,
							". ",
							r.club.short
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.pts })]
					}, r.club.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card spread",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Бюджет ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: money(save.budget) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Зарплаты ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: wageText(wageBill(save)) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Доверие ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: save.confidence })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Средний тонус состава ",
					Math.round(playersOf(save, club.id).reduce((s, p) => s + p.cond, 0) / 20),
					". Ниже 65 нужна восстановительная, иначе в матче команда играет слабее."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn ghost",
					onClick: () => useFm.getState().go("tactics"),
					children: "Тактика"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn ghost",
					onClick: () => useFm.getState().go("squad"),
					children: "Состав"
				})]
			})
		]
	});
}
function Kits() {
	const draft = useFm((s) => s.draft);
	const notice = useFm((s) => s.notice);
	const [paint, setPaint] = (0, import_react.useState)("primary");
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(draft?.manager ?? "");
	if (!draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "btn",
		onClick: () => useFm.getState().go("pick"),
		children: "Назад"
	});
	const club = catalog().find((c) => c.id === draft.clubId);
	const begin = () => useFm.getState().start(draft.clubId, name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn quiet",
				onClick: () => useFm.getState().go("pick"),
				children: "К клубам"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "word",
				style: { fontSize: "1.8rem" },
				children: [
					"Карьера «",
					club.name,
					"»"
				]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "tiny",
				children: ["Тренер", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card stack",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Домашняя" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
						kit: draft.home,
						size: 96
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card stack",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Гостевая" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
						kit: draft.away,
						size: 96
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "start-bar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn wide",
					onClick: begin,
					children: "Начать карьеру"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn ghost",
				onClick: () => setEdit((v) => !v),
				children: edit ? "Скрыть редактор формы" : "Поменять форму"
			}),
			edit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Домашняя" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "chips",
							children: homeTones(club).map((tone, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "chip",
								onClick: () => useFm.getState().tuneKit("home", {
									primary: tone.primary,
									secondary: tone.secondary,
									socks: tone.socks
								}),
								children: ["Тон ", i + 1]
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Designs, {
							kit: draft.home,
							onPick: (design) => useFm.getState().tuneKit("home", { design })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Гостевая" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "chips",
							children: [
								"primary",
								"secondary",
								"socks"
							].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: paint === key ? "chip on" : "chip",
								onClick: () => setPaint(key),
								children: key === "primary" ? "Основа" : key === "secondary" ? "Отделка" : "Гетры"
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "swatches",
							children: PALETTE.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "swatch",
								style: { background: color },
								onClick: () => useFm.getState().tuneKit("away", { [paint]: color })
							}, color))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Designs, {
							kit: draft.away,
							onPick: (design) => useFm.getState().tuneKit("away", { design })
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Форма уже в цветах клуба. Можно начать сразу или открыть редактор и сменить фасон."
			})
		]
	});
}
function Designs({ kit, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "designs",
		children: DESIGNS.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: kit.design === i ? "design-chip on" : "design-chip",
			title: name,
			onClick: () => onPick(i),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
				kit: {
					...kit,
					design: i
				},
				size: 48
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				i + 1,
				". ",
				name
			] })]
		}, name))
	});
}
function Squad() {
	const save = useFm((s) => s.save);
	const [roster, setRoster] = (0, import_react.useState)(false);
	const [g, setG] = (0, import_react.useState)("all");
	const list = playersOf(save, save.clubId).filter((p) => g === "all" || (g === "GK" ? p.pos === "GK" : g === "def" ? "DR DL DC".includes(p.pos) : g === "mid" ? "DM MC AM MR ML".includes(p.pos) : "ST AM MR ML".includes(p.pos))).sort((a, b) => overall(b) - overall(a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Состав"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Схема и ползунки как в тактике. Кто не в основе — в узкой колонке справа от поля. Она не закрывает точки и настройки."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineupDesk, {
				slots: save.tactics.slots,
				onSwap: (index, playerId) => {
					useFm.getState().pickSlot(index);
					useFm.getState().assign(playerId);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn ghost",
				onClick: () => setRoster((v) => !v),
				children: roster ? "Скрыть список" : "Весь состав"
			}),
			roster ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: [
					["all", "Все"],
					["GK", "Вратари"],
					["def", "Защита"],
					["mid", "Полузащита"],
					["att", "Атака"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: g === id ? "chip on" : "chip",
					onClick: () => setG(id),
					children: label
				}, id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "prow",
					onClick: () => useFm.getState().openPlayer(p.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pos",
							children: POS_RU[p.pos]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							playerName(p),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "tiny",
								children: [
									p.age,
									" · настрой ",
									p.mor,
									" · ",
									p.injured ? `травма ${p.injured} дн.` : p.ban ? "дискв." : `тонус ${Math.round(p.cond)}`
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tiny",
							children: [p.goals, " г"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ovr",
							children: overall(p)
						})
					]
				}, p.id))
			})] }) : null
		]
	});
}
function PlayerCard() {
	const save = useFm((s) => s.save);
	const id = useFm((s) => s.playerId);
	const notice = useFm((s) => s.notice);
	const p = save.players.find((x) => x.id === id) ?? (id ? peek(id) : void 0);
	const [years, setYears] = (0, import_react.useState)(p?.contract && p.contract > 1 ? Math.round(p.contract) : 3);
	const [wage, setWage] = (0, import_react.useState)(p?.wage ?? 20);
	const [clause, setClause] = (0, import_react.useState)(p?.clause || "без особых условий");
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "btn",
		onClick: () => useFm.getState().go("squad"),
		children: "Назад"
	});
	const mine = p.clubId === save.clubId;
	const club = save.clubs.find((c) => c.id === p.clubId);
	const attrs = p.pos === "GK" ? [
		["Вратарская", p.gk],
		["Игра руками", p.def],
		["Характер", p.men],
		["Выбор позиции", p.pas]
	] : [
		["Скорость", p.pac],
		["Удар", p.sho],
		["Пас", p.pas],
		["Техника", p.tec],
		["Отбор", p.def],
		["Мощь", p.strn],
		["Выносливость", p.sta],
		["Характер", p.men]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn quiet",
				onClick: () => useFm.getState().go(mine ? "squad" : "market"),
				children: "Назад"
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "spread",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kicker",
						children: [
							POS_LONG[p.pos],
							" · ",
							p.nat
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "word",
						style: { fontSize: "2rem" },
						children: playerName(p)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						children: [
							p.age,
							" лет · ",
							p.foot,
							" нога · №",
							p.number,
							" · ",
							originOf(save, p),
							" · ",
							club?.name ?? (p.clubId.startsWith("pool:") ? "трансферный лист" : "свободный агент")
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ovr",
					style: { fontSize: "2rem" },
					children: overall(p)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scoutText(p) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card stack",
				children: [attrs.map(([label, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "spread tiny",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${v * 5}%` } })
				})] }, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "spread tiny",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Настрой" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.mor })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${p.mor}%` } })
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card spread tiny",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Игры ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.apps })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Голы ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.goals })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Пасы ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.assists })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Оценка ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.apps ? (p.ratingSum / p.apps).toFixed(2) : "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Рейтинг ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: overall(p) }),
						" · потолок ",
						p.pot
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Цена ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: dollarText(p.value) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Контракт ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [p.contract, " г."] }),
						" · ",
						wageText(p.wage)
					] }),
					p.clause ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Условие: ", p.clause] }) : null
				]
			}),
			mine ? p.renewed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Контракт уже продлён" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						children: [
							"В этом сезоне ",
							playerName(p),
							" уже подписывал новые условия. Второй раз продлить нельзя — только после межсезонья. Сейчас: ",
							p.contract,
							" г., ",
							wageText(p.wage),
							p.clause ? `, ${p.clause}` : "",
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => putXi(save, p.id),
						children: "В основу"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => useFm.getState().list(p.id),
						children: p.listed ? "Снять с трансфера" : "Выставить"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Новый контракт" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: "Годы, зарплата и пункт списываются из трансферного бюджета. После подписи продление в этом сезоне закрывается."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chips",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: years === n ? "chip on" : "chip",
							onClick: () => setYears(n),
							children: [n, " г."]
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "tiny",
						children: [
							"Зарплата, тыс. ₽ / нед. · сейчас ",
							wageText(wage),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: Math.max(8, Math.round(p.wage * .8)),
								max: Math.round(p.wage * 1.8),
								value: wage,
								onChange: (e) => setWage(Number(e.target.value))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chips",
						children: [
							"без особых условий",
							"отступные ×2",
							"бонус за 10 голов",
							"опция аренды",
							"капитанская надбавка"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: clause === c ? "chip on" : "chip",
							onClick: () => setClause(c),
							children: c
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn",
							onClick: () => useFm.getState().renew(p.id, years, wage, clause),
							children: "Подписать"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn ghost",
							onClick: () => putXi(save, p.id),
							children: "В основу"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => useFm.getState().list(p.id),
						children: p.listed ? "Снять с трансфера" : "Выставить"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BidBox, {
				playerId: p.id,
				value: p.value,
				free: p.clubId === "free",
				open: windowOpen(save.date, save.season)
			})
		]
	});
}
function BidBox({ playerId, value, free, open }) {
	const ask = dollarText(value);
	const [usd, setUsd] = (0, import_react.useState)(Math.max(5e4, Math.round(value * 1e6 / 92)));
	const offer = (k) => useFm.getState().offerBid(playerId, rubFromDollars(Math.round(value * 1e6 / 92 * k)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Запрос клуба ",
					ask,
					". Сумма в долларах, тысячи через точку."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chips",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "chip",
						onClick: () => offer(.8),
						children: "80%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "chip on",
						onClick: () => offer(1),
						children: ["100% · ", ask]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "chip",
						onClick: () => offer(1.25),
						children: "125%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "tiny",
				children: ["Своя сумма, $", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: usd,
					min: 0,
					step: 5e4,
					onChange: (e) => setUsd(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				onClick: () => useFm.getState().offerBid(playerId, rubFromDollars(usd)),
				children: free ? "Подписать" : `Предложить ${dollarText(rubFromDollars(usd))}`
			}),
			!open && !free ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Окно закрыто. Лето до 12 сентября, зима 20 января — 25 февраля."
			}) : null
		]
	});
}
function putXi(save, id) {
	const slots = [...save.tactics.slots];
	while (slots.length < 11) slots.push("");
	const have = slots.indexOf(id);
	if (have >= 0) slots[have] = "";
	else {
		const empty = slots.findIndex((s) => !s);
		slots[empty >= 0 ? empty : 10] = id;
	}
	useFm.getState().patchTactic({ slots });
	useFm.getState().go("tactics");
}
function StyleChips({ style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "chips",
		children: STYLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: style === s.id ? "chip on" : "chip",
			onClick: () => useFm.getState().patchTactic({ style: s.id }),
			children: s.name
		}, s.id))
	});
}
function LineupDesk({ slots, onSwap, compact, selectedId }) {
	const save = useFm((s) => s.save);
	const [slot, setSlot] = (0, import_react.useState)(null);
	const [hold, setHold] = (0, import_react.useState)(null);
	const form = FORMATIONS[save.tactics.formation];
	const fromPitch = selectedId ? slots.indexOf(selectedId) : -1;
	const active = slot != null ? slot : fromPitch >= 0 ? fromPitch : null;
	const bench = playersOf(save, save.clubId).filter((p) => !slots.includes(p.id) && p.injured <= 0 && p.ban <= 0).sort((a, b) => overall(b) - overall(a));
	const swap = (index, playerId) => {
		onSwap(index, playerId);
		setSlot(null);
		setHold(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: Object.keys(FORMATIONS).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: save.tactics.formation === id ? "chip on" : "chip",
					onClick: () => useFm.getState().patchTactic({ formation: id }),
					children: id
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `lineup-row${compact ? " compact" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `pitch${compact ? " compact" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pitch-inset",
						children: form.map((spot, i) => {
							const p = save.players.find((x) => x.id === slots[i]);
							const pos = shapeSlot(spot, save.tactics);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: active === i ? "dot on" : "dot",
								style: {
									left: `${pos.x}%`,
									top: `${pos.y}%`
								},
								onClick: () => hold ? swap(i, hold) : setSlot(i),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: POS_RU[spot.pos] }), p ? p.last : "пусто"]
							}, i);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "bench-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Запас" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tiny",
							children: active != null ? `Выбран ${POS_RU[form[active].pos]}. Кого выпустить?` : hold ? "Нажмите точку на схеме." : "Точка, затем игрок."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "plist",
							children: bench.length ? bench.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: hold === p.id ? "prow on" : "prow",
								title: `${playerName(p)} · тонус ${Math.round(p.cond)}`,
								onClick: () => active != null ? swap(active, p.id) : setHold(p.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pos",
										children: POS_RU[p.pos]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.last }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ovr",
										children: overall(p)
									})
								]
							}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tiny",
								children: "Свободных игроков нет."
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: shapeText(save.tactics)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleChips, { style: save.tactics.style }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "Менталитет",
				value: save.tactics.mentality + 2,
				max: 4,
				text: [
					"Очень низко",
					"Низко",
					"Баланс",
					"Атака",
					"Все вперёд"
				][save.tactics.mentality + 2],
				onChange: (v) => useFm.getState().patchTactic({ mentality: v - 2 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "Прессинг",
				value: save.tactics.press,
				text: [
					"Нет",
					"Низкий",
					"Середина",
					"Высокий",
					"Прессинг"
				][save.tactics.press] ?? String(save.tactics.press),
				onChange: (v) => useFm.getState().patchTactic({ press: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "Темп",
				value: save.tactics.tempo,
				text: [
					"Медленно",
					"Спокойно",
					"Середина",
					"Быстро",
					"Рвать"
				][save.tactics.tempo] ?? String(save.tactics.tempo),
				onChange: (v) => useFm.getState().patchTactic({ tempo: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "Линия обороны",
				value: save.tactics.line,
				text: [
					"Низко",
					"Ниже",
					"Середина",
					"Высоко",
					"Вперёд"
				][save.tactics.line] ?? String(save.tactics.line),
				onChange: (v) => useFm.getState().patchTactic({ line: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				label: "Ширина",
				value: save.tactics.width,
				text: [
					"Узко",
					"Уже",
					"Середина",
					"Широко",
					"Во фланг"
				][save.tactics.width] ?? String(save.tactics.width),
				onChange: (v) => useFm.getState().patchTactic({ width: v })
			})
		]
	});
}
function Tactics() {
	const save = useFm((s) => s.save);
	const notice = useFm((s) => s.notice);
	const strength = xiStrength(save, save.tactics.slots, save.tactics.formation, save.tactics);
	const squad = playersOf(save, save.clubId);
	const tone = Math.round(squad.reduce((s, p) => s + p.cond, 0) / Math.max(1, squad.length));
	const sharp = Math.round(squad.reduce((s, p) => s + p.sharp, 0) / Math.max(1, squad.length));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "spread",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "word",
					children: "Тактика"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn quiet",
					onClick: () => useFm.getState().auto(),
					children: "Авто"
				})]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Семь стилей двигают ползунки и точки на схеме. Атака ",
					strength.att.toFixed(1),
					", оборона ",
					strength.def.toFixed(1),
					", общий ",
					strength.avg.toFixed(1),
					". Тонус ",
					tone,
					", острота ",
					sharp,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineupDesk, {
				slots: save.tactics.slots,
				onSwap: (index, playerId) => {
					useFm.getState().pickSlot(index);
					useFm.getState().assign(playerId);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Кнопки под ползунками сразу двигают менталитет, прессинг, темп, линию или ширину. Раз в день ещё меняют тонус и остроту игроков."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid2",
				children: [
					[
						"attack",
						"Установка: атака",
						"Менталитет, темп и прессинг вверх"
					],
					[
						"defence",
						"Установка: оборона",
						"Ниже линия, меньше прессинг"
					],
					[
						"set",
						"Стандарты",
						"Шире фланги, спокойнее темп"
					],
					[
						"physical",
						"Объём",
						"Темп и прессинг вверх, тонус вниз"
					],
					[
						"rest",
						"Восстановление",
						"Спокойнее план, тонус вверх"
					]
				].map(([id, label, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: save.focus === id ? "btn" : "btn ghost",
					onClick: () => useFm.getState().doTrain(id),
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						style: {
							display: "block",
							fontWeight: 500
						},
						children: hint
					})]
				}, id))
			})
		]
	});
}
function Slider({ label, value, onChange, text, max = 4 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "tiny",
		children: [
			label,
			": ",
			text,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max,
				value,
				onChange: (e) => onChange(Number(e.target.value)),
				style: { width: "100%" }
			})
		]
	});
}
function Match() {
	const save = useFm((s) => s.save);
	const live = useFm((s) => s.live);
	const [out, setOut] = (0, import_react.useState)("");
	const [forced, setForced] = (0, import_react.useState)(false);
	const [land, setLand] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const q = window.matchMedia("(orientation: landscape)");
		const apply = () => setLand(q.matches);
		apply();
		q.addEventListener("change", apply);
		return () => q.removeEventListener("change", apply);
	}, []);
	const wide = land || forced;
	const fx = (live ? save.fixtures.find((f) => f.id === live.fixtureId) : void 0) ?? userFixture(save);
	if (!fx) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Матчей больше нет." });
	const home = save.clubs.find((c) => c.id === fx.home);
	const away = save.clubs.find((c) => c.id === fx.away);
	const info = report(save, fx.home === save.clubId ? fx.away : fx.home);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `stack match-screen${wide ? " match-wide" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "spread",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn quiet",
						onClick: () => useFm.getState().go("desk"),
						children: "В кабинет"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn quiet",
						onClick: () => setForced((v) => !v),
						children: wide ? "Поле обычно" : "Поле шире"
					}),
					live && !live.done && !live.paused && !live.userPause ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn quiet",
						onClick: () => useFm.getState().pauseMatch(),
						children: "Пауза"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "spread",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
							kit: fx.home === save.clubId ? save.kit.home : autoKit(home, "home"),
							size: 36
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: home.short })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "score",
						children: live ? `${live.hg}:${live.ag}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: away.short }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
							kit: fx.away === save.clubId ? save.kit.away : autoKit(away, "away"),
							size: 36
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				style: {
					textAlign: "center",
					margin: 0
				},
				children: [
					fx.label ? `${fx.label} · ` : "",
					live ? `${live.minute}' · xG ${live.xgH.toFixed(2)}:${live.xgA.toFixed(2)}` : formatDate(fx.date),
					" ",
					info.derby ? "· дерби" : ""
				]
			}),
			!live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Справка на соперника"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { margin: 0 },
						children: info.text
					}),
					info.danger ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						children: [
							"Опасен ",
							playerName(info.danger),
							", рейтинг ",
							overall(info.danger),
							", настрой ",
							info.danger.mor,
							"."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						children: [
							"Состав ",
							info.myOvr,
							" против ",
							info.theirOvr,
							". Оба тайма вместе — ",
							save.matchMins === 3 || save.matchMins === 5 ? save.matchMins : 2,
							" мин."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn wide",
						onClick: () => useFm.getState().kickoff(false),
						children: "Смотреть матч"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost wide",
						onClick: () => useFm.getState().kickoff(true),
						children: "Сразу результат"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForfeitButton, { wide: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: "Если сыграть не можете — техническое поражение до свистка. Сопернику засчитают победу 3:0."
					})
				]
			}) : live.technical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, { save }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchLive, {
					save,
					live,
					home,
					away,
					selected: out,
					wide,
					onSelect: live.userPause || live.paused ? setOut : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tiny pitch-hint",
					style: { textAlign: "center" },
					children: "Большую часть матча мяч в ногах: игроки ведут его и отдают передачи. Штрафные, пенальти, угловые и ауты — короткие остановки. Поверните телефон — поле станет шире."
				}),
				(live.userPause || live.paused) && !live.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchPlan, {
					save,
					live,
					out,
					setOut
				}) : null,
				live.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, { save }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "fm-line",
					children: [live.minute > 0 ? `${live.minute}'  ` : "", live.line]
				})
			] })
		]
	});
}
function MatchPlan({ save, live, out, setOut }) {
	const half = live.paused && live.minute === 45 && !live.events.some((e) => e.kind === "ht");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card stack match-plan",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: half ? "Перерыв" : "Пауза" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn wide",
					onClick: () => useFm.getState().resumeSim(),
					children: "Просимулировать дальше"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForfeitButton, { wide: true })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Дальше матч идёт своим ходом. Техническое поражение сразу закрывает игру: в протоколе 3:0 в пользу соперника. Запасные — колонка справа от поля, ползунки под ней и ничего не перекрывают. Замена на остановке, лимит пять. Уже вышли: ",
					live.subsUsed,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineupDesk, {
				compact: true,
				slots: live.xi,
				selectedId: out,
				onSwap: (index, playerId) => {
					const id = live.xi[index];
					if (!id) return;
					setOut(id);
					useFm.getState().queueSub(id, playerId);
				}
			}),
			live.pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					"Ждут остановки: ",
					live.pending.map((s) => save.players.find((p) => p.id === s.in)?.last).filter(Boolean).join(", "),
					"."
				]
			}) : null
		]
	});
}
function ForfeitButton({ wide }) {
	const [arm, setArm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `btn ghost danger${wide ? " wide" : ""}`,
		onClick: () => arm ? useFm.getState().forfeit() : setArm(true),
		children: arm ? "Подтвердить 0:3" : "Техническое поражение"
	});
}
function Result({ save }) {
	const live = useFm((s) => s.live);
	const { place } = placeOf(save);
	const gf = live.home ? live.hg : live.ag;
	const ga = live.home ? live.ag : live.hg;
	const word = gf > ga ? "Победа" : gf === ga ? "Ничья" : "Поражение";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: live.technical ? "Техническое поражение" : word
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { margin: 0 },
				children: live.technical ? `В протоколе 3:0 в пользу соперника${live.home ? " — на табло 0:3" : " — на табло 3:0"}. Вы ${place}-е. Доверие ${save.confidence}.` : `xG ${live.xgH.toFixed(2)} : ${live.xgA.toFixed(2)}. Вы ${place}-е. Доверие ${save.confidence}.`
			}),
			live.technical && !Object.keys(live.ratings).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Состав на поле не выходил, оценки не ставятся."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: live.xi.map((id) => {
					const p = save.players.find((x) => x.id === id);
					if (!p) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread tiny",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							POS_RU[p.pos],
							" ",
							p.last
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: live.ratings[id] != null ? live.ratings[id].toFixed(1) : "—" })]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				onClick: () => useFm.getState().go("desk"),
				children: "Дальше"
			})
		]
	});
}
function Table() {
	const save = useFm((s) => s.save);
	const league = useFm((s) => s.league);
	const real = tableOf(save, league);
	const russian = league === "rpl" || league === "fnl" || league === "fnl2" || league === "fnl3";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Таблица"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: LEAGUES.filter((l) => save.clubs.some((c) => c.league === l.id) || l.id === league).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: league === l.id ? "chip on" : "chip",
					onClick: () => useFm.getState().setLeague(l.id),
					children: l.short
				}, l.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "#" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Клуб" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "И" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "В" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Н" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "П" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "М" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "О" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: real.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: `${r.club.id === save.clubId ? "me" : ""} zone-${rowZone(league, i, real.length)}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [i + 1, russian && i === 4 ? "*" : ""] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.club.short }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.p }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.w }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.d }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.l }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								r.gf,
								":",
								r.ga
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.pts }) })
						]
					}, r.club.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: league === "rpl" ? "РПЛ: 1–2 Лига чемпионов, 3-е квалификация ЛЧ (не прошли — Лига Европы), 4-е Лига Европы, 5–6 Лига конференций. Вылетают четыре места, не пять: 13–14 играют стыки, 15–16 уходят сразу. Звёздочка — 5-е место играет квалификацию со всеми российскими лигами." : league === "fnl3" ? "ФНЛ-3: 1–2 прямо в ФНЛ-2. 5-е место — квалификация с 5-ми ФНЛ-2, Первой лиги и РПЛ. Вылета нет: слабый сезон или два подряд могут стоить работы, но клуб остаётся." : league === "fnl" || league === "fnl2" ? "Два первых выходят прямо. 5-е играет пирамиду: большинство побед поднимает на лигу выше. Четыре последних вылетают." : league === "media" ? "Медийная лига идёт отдельно от РПЛ и ФНЛ. В Кубок России каждый сезон попадают четыре случайные команды отсюда." : `${leagueMeta(league).name}. Зарубежный чемпионат идёт своей таблицей.`
			}),
			seasonDone(save) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				onClick: () => useFm.getState().closeSeason(),
				children: "Закрыть сезон и перейти дальше"
			}) : null
		]
	});
}
function Market() {
	const save = useFm((s) => s.save);
	const [q, setQ] = (0, import_react.useState)("");
	const [pos, setPos] = (0, import_react.useState)("all");
	const [nation, setNation] = (0, import_react.useState)("all");
	const [afford, setAfford] = (0, import_react.useState)(false);
	const [minOvr, setMinOvr] = (0, import_react.useState)(50);
	const [wish, setWish] = (0, import_react.useState)("all");
	const budgetUsd = Math.round(save.budget * 1e6 / 92);
	const rows = marketRows(save, nation).filter((p) => pos === "all" || p.pos === pos).filter((p) => fitsWish(p, wish)).filter((p) => !afford || Math.round(p.value * 1e6 / 92) <= budgetUsd).filter((p) => overall(p) >= minOvr).filter((p) => !q || `${p.first} ${p.last} ${p.nat} ${originOf(save, p)}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => overall(b) - overall(a)).slice(0, 40);
	const pickNation = (id) => {
		setNation(id);
		const meta = NATIONS.find((n) => n.id === id);
		if (meta?.inGame) useFm.getState().scout(meta.inGame);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Рынок"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tiny",
				children: [
					windowOpen(save.date, save.season) ? "Окно открыто." : "Окно закрыто. Свободных агентов подписать можно всегда.",
					" Бюджет ",
					dollarText(save.budget),
					". Цены в долларах. Страна — это лига. Топ-15 по уровню FC 27, остальные — ближайший уровень Football Manager."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "search",
				placeholder: "Фамилия или страна",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chips",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: nation === "all" ? "chip on" : "chip",
					onClick: () => setNation("all"),
					children: "Все страны"
				}), NATIONS.filter((n) => n.top).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: nation === n.id ? "chip on" : "chip",
					onClick: () => pickNation(n.id),
					children: n.country
				}, n.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: NATIONS.filter((n) => !n.top).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: nation === n.id ? "chip on" : "chip",
					onClick: () => pickNation(n.id),
					children: n.country === "Россия" ? n.league : n.country
				}, n.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chips",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: afford ? "chip on" : "chip",
					onClick: () => setAfford((v) => !v),
					children: "По бюджету"
				}), [
					["all", "Все"],
					["tec", "Техничный"],
					["strn", "Сильный"],
					["pac", "Быстрый"],
					["sho", "Удар"],
					["pas", "Пас"],
					["def", "Отбор"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: wish === id ? "chip on" : "chip",
					onClick: () => setWish(id),
					children: label
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "tiny",
				children: [
					"Рейтинг от ",
					minOvr,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 50,
						max: 90,
						value: minOvr,
						onChange: (e) => setMinOvr(Number(e.target.value)),
						style: { width: "100%" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: [
					"all",
					"GK",
					"DC",
					"DR",
					"DL",
					"DM",
					"MC",
					"AM",
					"MR",
					"ML",
					"ST"
				].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: pos === id ? "chip on" : "chip",
					onClick: () => setPos(id),
					children: id === "all" ? "Все" : POS_RU[id]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plist",
				children: [rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "prow",
					onClick: () => useFm.getState().openPlayer(p.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pos",
							children: POS_RU[p.pos]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							playerName(p),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "tiny",
								children: [
									originOf(save, p),
									" · ",
									p.age,
									" лет · настрой ",
									p.mor,
									" · ",
									dollarText(p.value)
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ovr",
							children: overall(p)
						})
					]
				}, p.id)), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tiny",
					children: "Никого по этому фильтру. Снизьте рейтинг или снимите «по бюджету»."
				}) : null]
			})
		]
	});
}
function Inbox() {
	const save = useFm((s) => s.save);
	const [open, setOpen] = (0, import_react.useState)(save.inbox[0]?.id ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "word",
			children: "Почта"
		}), save.inbox.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "card stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "club",
				onClick: () => {
					setOpen(m.id);
					useFm.getState().read(m.id);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: { flex: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						style: { display: "block" },
						children: [
							m.from,
							" · ",
							m.date,
							" ",
							m.read ? "" : "· новое"
						]
					})]
				})
			}), open === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { margin: 0 },
				children: m.body
			}), m.offer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn",
					onClick: () => useFm.getState().accept(m.id),
					children: ["Продать за ", money(m.offer.fee)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn ghost",
					onClick: () => useFm.getState().reject(m.id),
					children: "Отказать"
				})]
			}) : null] }) : null]
		}, m.id))]
	});
}
function Money() {
	const save = useFm((s) => s.save);
	const club = save.clubs.find((c) => c.id === save.clubId);
	const bill = wageBill(save);
	const cap = wageCap(club.rep);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Финансы"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Трансферный бюджет" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: money(save.budget) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Счёт клуба" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: money(save.balance) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Зарплаты в неделю" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: wageText(bill) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Потолок" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: wageText(cap) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${Math.min(100, bill / cap * 100)}%` } })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: "Спонсор приходит 1-го числа. Зарплаты списываются по понедельникам. Долг на счёте злит совет."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Доверие" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: save.confidence })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${save.confidence}%` } })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: "Ниже 16 после восьми туров совет увольняет. Победа крупного клуба ценится выше, чем ничья аутсайдера."
					})
				]
			})
		]
	});
}
function Calendar() {
	const save = useFm((s) => s.save);
	const club = save.clubs.find((c) => c.id === save.clubId);
	const rows = save.fixtures.filter((f) => f.home === club.id || f.away === club.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "spread",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "word",
					children: "Календарь"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn quiet",
					onClick: () => useFm.getState().advanceDay(),
					children: "+ день"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				children: "Зимняя пауза с 7 декабря по 1 марта. Если уйти с игрового дня кнопкой «+ день», матч досимулирует помощник."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: rows.map((f) => {
					const opp = save.clubs.find((c) => c.id === (f.home === club.id ? f.away : f.home));
					const home = f.home === club.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread card",
						style: { padding: 10 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tiny",
								children: [
									f.date.slice(8),
									".",
									f.date.slice(5, 7),
									" · ",
									f.label ?? f.comp ?? "лига"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								home ? "Д" : "Г",
								" ",
								opp?.short
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.played ? `${home ? f.hg : f.ag}:${home ? f.ag : f.hg}` : "—" })
						]
					}, f.id);
				})
			})
		]
	});
}
function Sacked() {
	const save = useFm((s) => s.save);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		style: { paddingTop: 28 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Совет директоров"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Вы уволены"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Доверие упало до ",
				save.confidence,
				". Ниже — клубы, которые готовы поговорить."
			] }),
			save.offers.map((o) => {
				const c = save.clubs.find((x) => x.id === o.clubId);
				if (!c) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "club",
					onClick: () => useFm.getState().job(c.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { club: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						style: { display: "block" },
						children: [
							leagueMeta(c.league).short,
							" · ",
							c.city
						]
					})] })]
				}, c.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn ghost",
				onClick: () => useFm.getState().go("pick"),
				children: "Начать заново"
			})
		]
	});
}
function Cups() {
	const save = useFm((s) => s.save);
	const mine = save.fixtures.filter((f) => (f.home === save.clubId || f.away === save.clubId) && f.comp && f.comp !== "league");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "word",
				children: "Кубки"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "FONBET Кубок России"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tiny",
						children: [
							"102 клуба: 16 РПЛ — 4 группы по 4, два круга. Путь регионов: Первая лига, ФНЛ-2, ФНЛ-3, любители и четыре клуба медийной лиги по жребию сезона (",
							mediaInCup(save).map((c) => c.short).join(", "),
							"). Дальше сетка 1/8, четверть, полуфинал и финал."
						]
					}),
					[
						"A",
						"B",
						"C",
						"D"
					].map((letter) => {
						const games = save.fixtures.filter((f) => f.comp === "cup" && f.label?.includes(`группа ${letter}`));
						if (!games.length) return null;
						const ids = /* @__PURE__ */ new Set();
						games.forEach((f) => {
							ids.add(f.home);
							ids.add(f.away);
						});
						const rows = [...ids].map((id) => ({
							id,
							pts: 0,
							gf: 0,
							ga: 0
						}));
						for (const f of games) {
							if (!f.played || f.hg == null || f.ag == null) continue;
							const h = rows.find((r) => r.id === f.home);
							const a = rows.find((r) => r.id === f.away);
							h.gf += f.hg;
							h.ga += f.ag;
							a.gf += f.ag;
							a.ga += f.hg;
							if (f.hg > f.ag) h.pts += 3;
							else if (f.hg < f.ag) a.pts += 3;
							else {
								h.pts++;
								a.pts++;
							}
						}
						rows.sort((a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Группа ", letter] }), rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "spread tiny",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								i + 1,
								". ",
								save.clubs.find((c) => c.id === r.id)?.short ?? r.id
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.pts })]
						}, r.id))] }, letter);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Еврокубки · сетка"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tiny",
						children: save.euro.comp ? `${save.euro.comp === "ucl" ? "Лига чемпионов" : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций"} · ${save.euro.stage === "qual" ? "квалификация" : save.euro.stage === "league" ? "общий этап" : save.euro.stage === "ko" ? "плей-офф" : save.euro.stage === "out" ? "вылет" : "турнир закрыт"}. Очки ${save.euro.pts}, мячи ${save.euro.gf}:${save.euro.ga}. 3-е место РПЛ начинает с квалификации: не прошли — падаете в Лигу Европы. Сетка дальше как в большом симуляторе: общий этап, 1/8, 1/4, 1/2, финал.` : "В этом сезоне еврокубков нет. Они открываются местами РПЛ: 1–2 ЛЧ, 3-е квалификация, 4-е Лига Европы, 5–6 Лига конференций."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bracket",
						children: [
							"Квалификация",
							"Общий этап",
							"1/8",
							"1/4",
							"1/2",
							"Финал"
						].map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip",
							children: name
						}, name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plist",
				children: mine.map((f) => {
					const opp = save.clubs.find((c) => c.id === (f.home === save.clubId ? f.away : f.home));
					const home = f.home === save.clubId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "spread card",
						style: { padding: 10 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tiny",
								children: [
									f.date.slice(8),
									".",
									f.date.slice(5, 7),
									" · ",
									f.label ?? f.comp
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								home ? "Д" : "Г",
								" ",
								opp?.short ?? "?"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.played ? `${home ? f.hg : f.ag}:${home ? f.ag : f.hg}` : "—" })
						]
					}, f.id);
				})
			})
		]
	});
}
function Nav() {
	const screen = useFm((s) => s.screen);
	const save = useFm((s) => s.save);
	const items = [
		["desk", "Кабинет"],
		["squad", "Состав"],
		["tactics", "Тактика"],
		["table", "Лига"],
		["more", "Прочее"]
	];
	const [more, setMore] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const diff = save?.difficulty ?? "experienced";
	const mins = save?.matchMins === 3 || save?.matchMins === 5 ? save.matchMins : 2;
	const diffs = [
		[
			"novice",
			"Новичок",
			"Почти все ваши матчи заканчиваются победой. Так весь сезон."
		],
		[
			"experienced",
			"Опытный",
			"Решает рейтинг состава. Равный соперник может забрать очки."
		],
		[
			"pro",
			"Профессионал",
			"Нужен заметный перевес. Близкие команды чаще играют вничью."
		],
		[
			"world",
			"Мировой класс",
			"80 против 75 — тяжело. 85 против 75 уже легче. С сильным соперником ничьих больше, чем побед."
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("market");
						},
						children: "Рынок"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("inbox");
						},
						children: "Почта"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("money");
						},
						children: "Финансы"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("calendar");
						},
						children: "Календарь"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("cups");
						},
						children: "Кубки"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						onClick: () => {
							setMore(false);
							useFm.getState().go("honors");
						},
						children: "Заслуги"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn wide",
				onClick: () => setSaved(useFm.getState().manualSave() ? "Карьера записана в этот кабинет." : "Сначала выберите клуб."),
				children: "Сохранить"
			}),
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				style: { margin: 0 },
				children: saved
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				style: { margin: 0 },
				children: "Сложность ботов на все матчи и сезоны"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: diffs.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: diff === id ? "chip on" : "chip",
					onClick: () => useFm.getState().setOption({ difficulty: id }),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				style: { margin: 0 },
				children: diffs.find((d) => d[0] === diff)?.[2]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tiny",
				style: { margin: 0 },
				children: "Время матча, оба тайма"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: [
					2,
					3,
					5
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: mins === n ? "chip on" : "chip",
					onClick: () => useFm.getState().setOption({ matchMins: n }),
					children: [n, " мин"]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "danger",
				onClick: () => {
					if (!confirm) {
						setConfirm(true);
						return;
					}
					useFm.getState().wipeCareer();
					setMore(false);
				},
				children: confirm ? "Точно удалить карьеру" : "Удалить карьеру"
			})
		]
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "nav",
		children: items.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: id === "more" ? more ? "on" : "" : screen === id ? "on" : "",
			onClick: () => id === "more" ? (setSaved(""), setConfirm(false), setMore((v) => !v)) : (setMore(false), useFm.getState().go(id)),
			children: label
		}, id))
	})] });
}
function mark(short) {
	const parts = short.replace(/\./g, "").split(/\s+/).filter(Boolean);
	if (parts.length > 1) return parts.map((p) => p[0]).join("").slice(0, 3);
	return short.slice(0, 3);
}
function Badge({ club, size = 44 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "badge",
		style: {
			background: club.color,
			color: club.color2 === "#ffffff" ? "#fff" : club.color2,
			width: size,
			height: size
		},
		children: mark(club.short)
	});
}
var SplitComponent = ManagerApp;
//#endregion
export { SplitComponent as component };
