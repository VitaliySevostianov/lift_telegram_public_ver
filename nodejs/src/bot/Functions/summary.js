module.exports = function summary(ctx, db) {
	let counter;
	db.get('lift_help_counter', { id: 1 }).then((success) => {
		counter = success.rows[0].counter;
		db.get('bot_users', { user_id: ctx.from.id }).then((success) => {
			ctx.reply(
				`
Получили помощи: ${success.rows[0].user_recieved} р.
Вывели:  ${success.rows[0].user_recieved - success.rows[0].user_balance} р.
Ваш баланс: ${success.rows[0].user_balance} р.
Осталось дней в проекте: ${success.rows[0].user_remaining_days}

Скольким уже помогли: ${counter}

Информация, новости, вопросы-ответы,
о проекте LIFT today. Переходи по ссылке.
Чат сообщества: @lift_tobay_info
Сайт: www.lift.today`,
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: 'Продлить на год',
									callback_data: 'Продлить на год',
								},
							],
						],
					},
				},
			);
		});
	});
	return ctx.wizard.selectStep(9);
};
