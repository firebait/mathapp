const express = require('express');
const app = express();
const port = process.env.PORT || '3000';

app.use(express.static('./build'));

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
