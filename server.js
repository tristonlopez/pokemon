const express = require('express');
const port = process.env.PORT || 8001;

const app = express();



app.get('/', function(req, res)
{
    res.send("the server is running.");
});




app.listen(port, function(err)
{
    if (err)
    {
        console.error("Error starting the server: ", err);
    }
    console.log(`Server is runnig at port ${port}`);
});