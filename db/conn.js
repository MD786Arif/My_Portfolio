mongoose = require('mongoose');
const DB = process.env.DATABASE;

// Promisses is used for async functions
mongoose.connect(DB).then(() => {
    console.log("Connection sucessful");
}).catch((err) => console.log(err));

