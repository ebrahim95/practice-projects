const express = require('express')
const app = express();
const PORT = process.env.port || 8080

app.use(express.static('build'))
app.listen(PORT, () => console.log(`App is running on ${PORT}`))