const express = require('express');
const data = require('./data');

const router = express.Router();
router.get('/',(req,res,next) => {
    res.send(`<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
    <input id="message" name="message" type="text" placeHolder="message">

	<input id="username" type="hidden" name="username">

	<button type="submit">send</button>

</form>`)
})

router.post('/',(req,res,next) => {
    data.push(`{${req.body.username}:${req.body.message}`)
    console.log(data);
    //res.send(`<h6>${red.body.username}:${req.body.message}</h6>`)
    console.log(`${red.body.username}:${req.body.message}`)
    res.redirect('/')
})
localStorage.getItem('username')
module.exports = router;