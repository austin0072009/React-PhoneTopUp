// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')("ACc3b0f23a2a7d55091a6adead93d59903", "ba65c8358f79532162dc4aad64873ff4");
const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+12135664368',
//      to: '+9509664266940'
//    })
//   .then(message => console.log(message.sid));


  async function sendSMS( message ){

    client.messages
      .create({
         body: message,
         from: '+12135664368',
         to: '+9509664266940'
       })
      .then(message => console.log(message.sid));


  }

  module.exports = {
    sendSMS
}