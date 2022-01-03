const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key');
var token = jwt.sign({ 
                        uid: 'user@examplemail.com', 
                        scope: 'admin'
                       // exp: 1634828677
                     }, 
                     privateKey, 
                     { algorithm: 'RS256' });

console.log(token);
