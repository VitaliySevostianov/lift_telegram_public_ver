module.exports = function finish(ctx, db){    
    if(ctx.message != undefined){															                      //последний этап вступления
        if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
        }else{
        let user_upper_referal = ctx.message.text;
        db.get('bot_users', {user_id: user_upper_referal}).then(success => {
            if(success.rows[0].user_id !== undefined){
            ctx.reply(`Теперь, чтобы иметь возможность получать помощь от сообщества вам необходимо стать его участником. Для этого вам необходимо оплатить 1370 руб, вступительный взнос на 1 год, 365 дней в проекте. В комментарии оплаты укажите номер телефона и Ф.И.О, который привязан к telegram. После оплаты с вами свяжется менеджер для подтверждения информации. Для продолжения нажмите кнопку`, {
                reply_markup: {
                inline_keyboard:[
                    [
                    {
                        text: 'Готово',
                        callback_data: 'Готово'
                    },
                    ]
                ]
                }
            });
            }
        })
        }
    }else{
        if(ctx.update.callback_query.data == 'Готово'){
        ctx.reply('С вами свяжется наш менеджер, напишите что-нибудь чтобы продолжить');
        return ctx.wizard.selectStep(8);
        }
    }
}