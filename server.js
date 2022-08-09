const express = require('express');
const app = express();


app.get('/user/signup', (req, res) => {
    console.log(res);
})

app.listen(8080, () => {
    console.log("Server is running!!")
})