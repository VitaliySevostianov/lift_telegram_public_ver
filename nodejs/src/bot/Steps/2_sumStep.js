module.exports = function requiredSum(ctx, db){   
    if(ctx.message.text == '/start'){
    ctx.reply("Набрав команду /start вы начали регистрацию с начала");
    setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
    return ctx.wizard.selectStep(1);
    }
    else if(isNaN(+ctx.message.text)){
        db.update('bot_users',{user_aim: ctx.message.text},{user_id: ctx.from.id});
        ctx.reply('Какая сумма вам нужна? Опишите одним сообщение!');
        return ctx.wizard.next();
    }else{
        ctx.reply('Нужно вводить не только числа');
        return ctx.wizard.selectStep(1);
    }
}