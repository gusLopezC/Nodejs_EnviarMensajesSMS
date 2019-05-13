require('dotenv').config();

const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {

    const twiml = new MessagingResponse();
    twiml.message('Hola he recibido tu mensaje');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});


app.listen(4000, () => {
    console.log('Servidor iniciado en puerto 4000');
})

enviarMensaje();

function enviarMensaje() {

    const account_sid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    const client = require('twilio')(account_sid, authToken);


    client.messages.create({
        to: process.env.MY_PHONE_NUMER,
        from: '+12015711898',
        body: 'HOLA'
    }).then(message => console.log(message.sid));
}


