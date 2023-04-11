const mongoose = require('mongoose');

const dbConnect = () => {
    const user = 'minclanfigueiras';
    const pass = 'L0htG8NyMuBTetm1';
    const dbName = 'netflix';

    const uri = `mongodb+srv://${user}:${pass}@cluster0.gzhjcko.mongodb.net/${dbName}?retryWrites=true&w=majority`;


    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('conectado a mongodb'))
        .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;