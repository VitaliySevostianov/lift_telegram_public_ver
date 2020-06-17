module.exports = function noPhoto(ctx, db){     
    if(ctx.message.text == '/start'){
        ctx.reply("Набрав команду /start вы начали регистрацию с начала");
        setTimeout(() => ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !"), 500);
        return ctx.wizard.selectStep(1);
    }else{												//Отправление данных в бд с загруженной в чат аватаркой
        telegram.getUserProfilePhotos(ctx.from.id).then(success => {
        if(success.photos[0][2].file_id !== undefined){
            db.update('bot_users',{user_photo: success.photos[0][2].file_id}, {user_id: ctx.from.id})
            ctx.reply(`Введите код (id), полученый вами, от человека который вас пригласил`);
            ctx.wizard.selectStep(7);
        }else{
            ctx.reply(`Поставьте фотографию, а затем напишите что-угодно в чат`);
        }
        })
    }
}