const Telegram    = require('telegraf/telegram')
const telegram    = new Telegram(process.env.TELEGRAM)

module.exports = function start(ctx, db){  
    ctx.wizard.state.data = {}
    data = ctx.wizard.state.data
    let isFirstTime;
    db.get('bot_users', {user_id: ctx.from.id}).then(success => {
    let info = success.rows[0]

    if(info != undefined){
        if(info.payed_subscription != true){
        isFirstTime = false

        }
    }else{
        isFirstTime = true
        if(info == undefined){
        db.add('bot_users', {
            user_id: ctx.from.id,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username,
            user_photo: null,
            user_phone:  null,
            user_aim:  null,
            user_money_aim:  null,
            user_requisites:  null,
            user_balance:  0,
            user_recieved:  0,
            payed_subscription: false,
            user_remaining_days: 0,
            user_full_name: null
        })
        }else{
        db.update('bot_users', {
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username
        }, {user_id: ctx.from.id})
        }

        telegram.getUserProfilePhotos(ctx.from.id).then(success => {
        if(success.photos[0][2].file_id != undefined){
            db.update('bot_users',{user_photo: success.photos[0][2].file_id},{user_id: ctx.from.id})
        }
        })
    }
    }).then(() => {
    if(isFirstTime == false){
        telegram.sendMessage(ctx.from.id,`Сервер был перезапущен, выберите действие ещё раз`,{
        reply_markup: {
            keyboard:[
            [
                {
                text: 'Кошелёк',
                callback_data: 'Кошелёк'
                },
                {
                text: 'Партнёрам',
                callback_data: 'Партнёрам'
                },
                {
                text: 'Сводка',
                callback_data: 'Сводка'
                },
            ]
            ]
        }
        });
        db.get('bot_users', {user_id: ctx.from.id}).then(success => {
        if(success.rows[0] != undefined){
            db.update('bot_users', {
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                username: ctx.from.username,
                user_photo: success.rows[0].user_photo,
                user_phone: success.rows[0].user_phone,
                user_aim: success.rows[0].user_aim,
                user_money_aim: success.rows[0].user_money_aim,
                user_requisites: success.rows[0].user_requisites,
                user_balance: success.rows[0].user_balance,
                user_recieved: success.rows[0].user_recieved,
                payed_subscription: false,
                user_remaining_days: success.rows[0].user_remaining_days,
            },{user_id: ctx.from.id})
            return ctx.wizard.selectStep(9);
        }
        })
    }else if (ctx.message.text == '/start'){
        ctx.reply("Зачем вам нужны деньги ? Опишите одним сообщением !");
        return ctx.wizard.next();
    }else return
    })
}