const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const crypto = require('crypto');
const app = express();

const hashPassword = password => {
	return crypto.createHash('md5').update(password).digest('hex');
};

app.set('view engine', 'ejs');
app.use(express.static('public'));

dotenv.config();

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: 'test',
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use('/', urlencodedParser);

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.post('/login', (req, res) => {
	const query = 'SELECT username FROM user WHERE username = ? AND password = ?';
	const user = req.body;

	user.loginpassword = hashPassword(user.loginpassword);

	db.query(
		query,
		[user.loginusername, user.loginpassword],
		async (err, result) => {
			if (err) res.send(err);
			else {
				if (result.length > 0)
					res.render('welcome.ejs', { username: user.loginusername });
				else res.render('loginError.ejs');
			}
		}
	);
});

app.post('/register', (req, res) => {
	const query =
		'INSERT INTO user(username, password, phone, email, birthdate) VALUES (?, ?, ?, ?, ?)';
	const user = req.body;

	user.regpassword = hashPassword(user.regpassword);

	db.query(
		query,
		[
			user.regusername,
			user.regpassword,
			user.email,
			user.phone,
			user.birthdate,
		],
		(err, result) => {
			if (err) res.send(err);
			else res.redirect('/');
		}
	);
});

app.listen(3001, () => {
	console.log(`Example app listening on port 3001`);
});
