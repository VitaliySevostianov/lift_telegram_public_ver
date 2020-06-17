require('dotenv').config({ path: './.env' });
const DataBase = require('../database');
const db = new DataBase({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.TABLE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/get', (req, res) => {
	let tablename = req.body.tablename;
	db.query(`SELECT * FROM ${tablename}`).then(
		(s) => res.send(s.rows),
		(e) => console.log(e),
	);
});

app.post('/update', (req, res) => {
	let phone = req.body.phone;
	console.log(phone);
	res.send(phone);
	db.update(
		'bot_users',
		{ payed_subscription: true },
		{ user_phone: phone },
	).then(
		(s) => res.send(s),
		(e) => console.log(e),
	);
});

app.listen(228);
