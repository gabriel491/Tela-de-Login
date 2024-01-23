const express = require('express');

const routes = express.Router();
// Criando usuário manualmente
const users = [{
    id: 1,
    name: 'Gabriel',
    email: 'gabriel@gmail.com',
    password: '1213'
}]

routes.post('/login', (req, res) => {
    // pegando email, password diretamente do body
    const { email, password } = req.body;

    // validando os dados do usuário
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // exibir todos os dados do usuário
        return res.status(200).json(user);
    }

    return res.status(401).json({ message: 'Credenciais Inválidas' })
});

module.exports = routes;