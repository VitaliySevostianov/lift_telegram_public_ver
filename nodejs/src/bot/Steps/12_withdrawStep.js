const wallet = require('../Functions/wallet')
const partners = require('../Functions/partners')
const summary = require('../Functions/summary')

module.exports = function withdraw(ctx, db){       
    if(ctx.message != undefined){
      if(isNaN(+ctx.message.text) == false){
        db.get('bot_users', {user_id: ctx.from.id}).then(success => {
          if(success.rows[0].user_balance < +ctx.message.text){
            ctx.reply(`На вашем балансе не хватает средств`);
          }else{
            let user_balance = success.rows[0].user_balance - +ctx.message.text;
            db.update('bot_users', { user_balance: user_balance }, { user_id: ctx.from.id })
            .then(() => {
              ctx.reply(`Транзакция на сумму ${ctx.message.text} прошла успешно
Деньги придут в течении двух рабочих дней`);
            })
            .then(() => {
              ctx.reply(`Оставшийся баланс: ${user_balance}`);
              return ctx.wizard.selectStep(9);
            })
          }
        })
      }else if(ctx.message.text == 'Кошелёк'){
        wallet(ctx, db);
      }else if(ctx.message.text == 'Сводка'){//баланс, сколько дней отсалось, инлайн клава для продления
        summary(ctx, db);
      }else if(ctx.update.message.text == 'Партнёрам'){
        partners(ctx, db);
      }else{
          ctx.reply(`Нужно ввести сумму вывода`);
          return ctx.wizard.selectStep(11);
      }
    }else if(ctx.update.callback_query.data != undefined){
      ctx.reply(`Сначала закончите данную операцию`);
      return ctx.wizard.selectStep(11);
    }
}