module.exports = function phone(ctx, db){      
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
    }
    else if(isNaN(+ctx.message.text)){
        db.update('bot_users',{user_full_name: ctx.message.text}, {user_id: ctx.from.id})// ФИО
        ctx.reply('Напишите ваш номер телефона? Опишите одним сообщение!');
        return ctx.wizard.next();
    }else{
        ctx.reply('Нужно ввести сумму без букв');
        return ctx.wizard.selectStep(3);
    }
}