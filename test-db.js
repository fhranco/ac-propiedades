const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
console.log("RAW ENV FILE CONTENT:");
console.log(env);
console.log("HEX:", Buffer.from(env).toString('hex'));
