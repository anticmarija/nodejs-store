const express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());


app.use('/store/product', require('./routes/product'));
app.use('/store/category', require('./routes/category'));
app.use('/store/user', require('./routes/user'));
app.use('/store/purchase', require('./routes/purchase'));


app.listen(8000, () => {
    console.log("Server started on port 8000");
})

