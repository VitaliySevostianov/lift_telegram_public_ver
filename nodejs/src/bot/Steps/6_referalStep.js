module.exports = function referal(ctx, db){       
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
    }
    else if(isNaN(+ctx.message.text.split(' ').join('')) == false){													//Отправление данных в бд
        db.update('bot_users',{user_requisites: ctx.message.text},{user_id: ctx.from.id});
        db.get('bot_users', {user_id: ctx.from.id}).then((success) => {
        ctx.reply(`Поздравляем! Вы зарегистрировались на Краундфайндинговой платформе LIFT today`)
        setTimeout(() => ctx.reply(`Вас зовут ${success.rows[0].first_name}${success.rows[0].last_name == null ? '.' : " " + success.rows[0].last_name + "."}
Ваш ник telegram: @${success.rows[0].username}`), 200);

        setTimeout(() => ctx.replyWithPhoto(success.rows[0].user_photo, {
            caption: `Ваше фото, ${success.rows[0].first_name}`
        }), 300);

        if(success.rows[0].user_photo === undefined){
            setTimeout(() => ctx.reply(`Нам не хватает только вашей фотографии, установите её в приложении а затем напишите что-нибудь`), 500);
            return ctx.wizard.next();
        }else{
            setTimeout(() => ctx.reply(`Введите код (id), полученый вами, от человека который вас пригласил`), 850);
            ctx.wizard.selectStep(7);
        }
        })

    }else{
        ctx.reply('Введите ваши реквизиты в формате 1234 5678 9012 3456');
        return ctx.wizard.selectStep(5);
    }
}