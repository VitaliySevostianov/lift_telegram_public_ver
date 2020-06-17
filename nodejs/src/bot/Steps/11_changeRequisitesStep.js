const wallet = require('../Functions/wallet')
const partners = require('../Functions/partners')
const summary = require('../Functions/summary')

module.exports = function changeReq(ctx, db){     
    if(ctx.message != undefined){
        if(isNaN(+ctx.message.text.split(' ').join('')) == false){
        let user_requisites = ctx.message.text;
        db.update('bot_users', {user_requisites: user_requisites}, {user_id: ctx.from.id}).then(() => {
            ctx.reply('Реквизиты изменены')
            return ctx.wizard.selectStep(9);
        })
        }else if(ctx.message.text == 'Кошелёк'){
        wallet(ctx, db);
        }else if(ctx.message.text == 'Сводка'){ //баланс, сколько дней отсалось, инлайн клава для продления
        summary(ctx, db)
        }else if(ctx.update.message.text == 'Партнёрам'){
        partners(ctx, db)
        }else{
        ctx.reply('Введите ваши реквизиты в формате 1234 5678 9012 3456');
        return ctx.wizard.selectStep(10);
        }
    }else if(ctx.update.callback_query.data != undefined){
        ctx.reply('Сначала закончите данную операцию');
        return ctx.wizard.selectStep(10);
    }
}