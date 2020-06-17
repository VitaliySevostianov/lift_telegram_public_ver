module.exports = function wallet(ctx, db){
    db.get('bot_users', {user_id: ctx.from.id}).then(success => {
        let user_balance = +success.rows[0].user_balance;
        ctx.telegram.sendMessage(success.rows[0].user_id,`Ваш баланс: ${user_balance} р.

Информация, новости, вопросы-ответы,
о проекте LIFT today. Переходи по ссылке.
Чат сообщества: @lift_tobay_info
Сайт: www.lift.today`,{
        reply_markup: {
            inline_keyboard:[
            [
                {
                text: 'Вывод',
                callback_data: 'Вывод'
                },
            ]
            ]
        }
        })
    })
    return ctx.wizard.selectStep(9);
}