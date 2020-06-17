module.exports = function requisites(ctx, db){   
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
    }
    else if(isNaN(+ctx.message.text) == false){
        db.update('bot_users',{user_phone: ctx.message.text},{user_id: ctx.from.id});
        ctx.reply(`Укажите ваши реквизиты, карты СберБанка , ЯндексКошелька. Мы переведём вам туда денежные средства. Опишите одним сообщение!`);
        return ctx.wizard.next();
    }else{
        ctx.reply('Введите номер телефона в формате 88005553535');
        return ctx.wizard.selectStep(4);
    }
}
