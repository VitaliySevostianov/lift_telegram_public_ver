const Log = require('../log/index.js');
const log = new Log(true);

require('dotenv').config({ path: '../../.env' });

const start = require('./Steps/1_startStep.js');
const requiredSum = require('./Steps/2_sumStep.js');
const fullName = require('./Steps/3_fullNameStep.js');
const phone = require('./Steps/4_phoneStep.js');
const requisites = require('./Steps/5_requisitesStep.js');
const referal = require('./Steps/6_referalStep.js');
const noPhoto = require('./Steps/7_noPhotoStep.js');
const finish = require('./Steps/8_finishStep.js');
const keyboard = require('./Steps/9_keyboardStep.js');
const actions = require('./Steps/10_actionsStep.js');
const changeReq = require('./Steps/11_changeRequisitesStep.js');
const withdraw = require('./Steps/12_withdrawStep.js');
const extension = require('./Steps/13_extensionStep.js');

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const DataBase = require('../database');

const token = process.env.TELEGRAM;
const session = require('telegraf/session');
const telegram = new Telegram(token);
const bot = new Telegraf(token);
const db = new DataBase({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.TABLE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});

let users_amount = 1;
let foundedActiveUsers = [];
let users = [];
let activeUsers = [];
let active_users_amount = 0;

db.updateArithmetical('bot_users', 'user_remaining_days', '- 1', '> 0');
setInterval(() => {
	db.getAll('bot_users').then((success) => {
		success = success.rows;

		for (var i = 0; i < success.length; i++) {
			log.text(success[i]);
			// console.log(success)
			users[i] = success[i].user_id;
			users_amount++;

			log.text(`${users.length} Юзеров`);

			if (
				success[i].user_remaining_days > 0 &&
				foundedActiveUsers[i] != users[i]
			) {
				foundedActiveUsers[i] = users[i];
				activeUsers[active_users_amount] = users[i];
				active_users_amount++;

				log.text(`${activeUsers} - Активные Юзеры`);
			}
		}
	});
}, 60000);

/////////// end

setInterval(() => {
	db.updateArithmetical(
		'bot_users',
		'user_remaining_days',
		'- 1',
		'user_remaining_days > 0',
	);
}, 3600000 * 24);

setInterval(() => {
	let random_user_index = Math.floor(Math.random() * activeUsers.length);
	log.text(random_user_index + ' - победитель');

	db.get('bot_users', { user_id: activeUsers[random_user_index] }).then(
		(success) => {
			let user_recieved =
				+success.rows[0].user_recieved + activeUsers.length;
			let user_balance =
				+success.rows[0].user_balance + +activeUsers.length;
			db.update(
				'bot_users',
				{ user_balance: user_balance, user_recieved: user_recieved },
				{ user_id: activeUsers[random_user_index] },
			);
			db.get('lift_help_counter', { id: 1 }).then((success) =>
				db.update(
					'lift_help_counter',
					{ counter: success.rows[0].counter + 1 },
					{ id: 1 },
				),
			);
			for (let i = 0; i < users.length; i++) {
				if (success.rows[0] != undefined) {
					if (users[i] != undefined) {
						telegram.sendPhoto(
							users[i],
							success.rows[0].user_photo,
							{
								caption: `Доброго вам дня!
Участников в проекте ${activeUsers.length} человек.
Сегодня мы вместе помогли!
Участник: ${success.rows[0].first_name}${
									success.rows[0].last_name == null
										? '.'
										: ' ' + success.rows[0].last_name + '.'
								}
Никнейм: ${
									success.rows[0].username == null
										? 'никнейм осутствует'
										: '@' + success.rows[0].username
								}.
Цель: ${success.rows[0].user_aim}.
Сумма: ${+success.rows[0].user_money_aim} р.
Сумма помощи сегодня: ${activeUsers.length} р.
Сумма помощи: ${
									+success.rows[0].user_money_aim -
									(+success.rows[0].user_money_aim -
										user_recieved)
								} р.
Осталось собрать: ${+success.rows[0].user_money_aim - user_recieved} р.

Информация, новости, вопросы-ответы,
о проекте LIFT today. Переходи по ссылке.
Чат сообщества: @lift_tobay_info
Сайт: www.lift.today`,
								disable_notification: true,
							},
						);
					}
				}
			}
		},
	);
}, 3600000 * 24);

const superWizard = new WizardScene(
	'super-wizard',

	(ctx) => {
		start(ctx, db);
	},

	(ctx) => {
		requiredSum(ctx, db);
	},

	(ctx) => {
		fullName(ctx, db);
	},

	(ctx) => {
		phone(ctx, db);
	},

	(ctx) => {
		requisites(ctx, db);
	},

	(ctx) => {
		referal(ctx, db);
	},

	(ctx) => {
		noPhoto(ctx, db);
	},

	(ctx) => {
		finish(ctx, db);
	},

	(ctx) => {
		keyboard(ctx, db);
	},

	(ctx) => {
		actions(ctx, db);
	},

	(ctx) => {
		changeReq(ctx, db);
	},

	(ctx) => {
		withdraw(ctx, db);
	},

	(ctx) => {
		extension(ctx, db);
	},
);

const stage = new Stage([superWizard], { default: 'super-wizard' });
bot.use(session());
bot.use(stage.middleware());
bot.launch();
