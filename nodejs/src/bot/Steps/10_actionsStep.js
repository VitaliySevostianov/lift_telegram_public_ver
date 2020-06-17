const wallet = require('../Functions/wallet')
const partners = require('../Functions/partners')
const summary = require('../Functions/summary')

module.exports = function actions(ctx, db){      
    db.update('bot_users', {
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,},
        {user_id: ctx.from.id})
    if(ctx.update.message !== undefined){
        if( ctx.update.message.text == 'Кошелёк'){
        wallet(ctx, db);
        }
        if(ctx.update.message.text == 'Партнёрам'){
        partners(ctx, db);
        }
        if(ctx.update.message.text == 'Сводка'){ //баланс, сколько дней отсалось, инлайн клава для продления
        summary(ctx, db);
        }
    }
    if(ctx.update.callback_query !== undefined){
        if(ctx.update.callback_query.data == 'Вывод'){
        db.get('bot_users', {user_id: ctx.from.id}).then(success => {
            if(success.rows[0].user_balance > 0){
            ctx.telegram.sendMessage(ctx.from.id,`Отправлять деньги на эти реквизиты: ${success.rows[0].user_requisites}?`,{
                reply_markup: {
                inline_keyboard:[
                    [
                    {
                        text: 'Да',
                        callback_data: 'Да'
                    },
                    {
                        text: 'Изменить реквизиты',
                        callback_data: 'Изменить реквизиты'
                    },
                    ]
                ]
                }
            })
            }else{
            ctx.reply(`На вашем балансе нет средств что-бы их выводить`)
            return ctx.wizard.selectStep(9);
            }
        })
        }else if(ctx.update.callback_query.data == 'Да'){
        ctx.reply('Сколько вы хотите вывести?');
        return ctx.wizard.selectStep(11);
        }else if(ctx.update.callback_query.data == 'Изменить реквизиты'){
        ctx.reply('Введите ваши новые реквизиты');
        return ctx.wizard.next();
        }else if(ctx.update.callback_query.data == 'Продлить на год'){
            ctx.reply('С вами свяжется наш менеджер');
            db.update('bot_users', { payed_subscription: true }, { user_id: ctx.from.id });
            return ctx.wizard.selectStep(9);
        }
        return ctx.wizard.selectStep(12);

    }
}