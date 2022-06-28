const crypto = require('crypto').randomBytes(256).toString('hex');




const database={
    uri: "mongodb://localhost:27017/ShivamSrivastava",
    secret: crypto,
    db: "ShivamSrivastava"
}

module.exports=database;