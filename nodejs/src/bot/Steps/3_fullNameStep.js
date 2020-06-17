module.exports = function fullName(ctx, db){   
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
    }
    else if(isNaN(+ctx.message.text) == false){
        db.update('bot_users',{user_money_aim: ctx.message.text},{user_id: ctx.from.id});
        ctx.reply('Как вас зовут Ф.И.О ? Опишите одним сообщение!');
        return ctx.wizard.next();
    }else{
        ctx.reply('Нужно ввести сумму без букв');
        return ctx.wizard.selectStep(2);
    }
}