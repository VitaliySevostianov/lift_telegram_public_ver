const Telegram    = require('telegraf/telegram')
const telegram    = new Telegram(process.env.TELEGRAM)

module.exports = function keyboard(ctx, db){     
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 200);
        return ctx.wizard.selectStep(1);
    }else{														//Временно!

        db.get('bot_users', {user_id: ctx.from.id}).then(success => {
            userData = success.rows[0]
            db.update('bot_users', {
            user_photo: userData.user_photo,
            user_phone: userData.user_phone,
            user_aim: userData.user_aim,
            user_money_aim: userData.user_money_aim,
            user_requisites: userData.user_requisites,
            user_balance: 0,
            user_recieved: 0,
            user_remaining_days: 365,
            },
            { user_id: ctx.from.id })
        }).then(() => {
            telegram.sendMessage(ctx.from.id,`Отлично! Вы будете каждый день получать уведомление о том, кто сегодня получил случайным образом помощь от сообщества. Участник который получает помощь выбирает бот.
Информация, новости, вопросы-ответы,
о проекте LIFT today. Переходи по ссылке.
Чат сообщества: @lift_tobay_info
Сайт: www.lift.today`,{
            reply_markup: {
                keyboard:[
                [
                    {
                    text: 'Кошелёк',
                    callback_data: 'Кошелёк'
                    },
                    {
                    text: 'Партнёрам',
                    callback_data: 'Партнёрам'
                    },
                    {
                    text: 'Сводка',
                    callback_data: 'Сводка'
                    },
                ]
                ]
            }
            });
            return ctx.wizard.next();
        })
    }
}