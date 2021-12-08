const fs = require('fs')
let aa = fs.readFileSync('users.json','UTF-8')
aa = aa ? JSON.parse(aa) : "USERS Bosh"
console.table(aa)