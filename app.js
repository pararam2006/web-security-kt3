const express = require('express');
const app = express();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(express.urlencoded({ extended: true }));
app.use(csrfProtection);
app.set('view engine', 'ejs');

// "База данных" пользователя
let user = {
    id: 1,
    email: 'user@example.com'
};

// Главная страница с формой
app.get('/', (req, res) => {
    res.render('profile', {
        email: user.email,
        csrfToken: req.csrfToken()
    });
});

// Уязвимый обработчик смены email (нет CSRF-защиты)
app.post('/update-email', (req, res) => {
    user.email = req.body.email;
    res.redirect('/');
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));