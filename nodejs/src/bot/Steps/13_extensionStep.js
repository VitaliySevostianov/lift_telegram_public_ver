module.exports = function extension(ctx, db){     
    // if(ctx.message != undefined){
    //     if(ctx.message.text){
    //     db.get('bot_users', {user_id: ctx.from.id}).then(success => {
    //         ctx.reply(`Вы продлили доступ ещё на год!`);
    //         db.update('bot_users', {user_remaining_days: +success.rows[0].user_remaining_days + 365}, {user_id: ctx.from.id})
    //         return ctx.wizard.selectStep(9);
    //     })
    //     }
    // }else if(ctx.update.callback_query.data != undefined){
    //     ctx.reply(`Сначала закончите данную операцию`);
    //     return ctx.wizard.selectStep(11);
    // }
}