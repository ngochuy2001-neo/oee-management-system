const express = require('express');
const app = express()
const cors = require('cors')
const port = 4000;

const dashboardRoutes = require('./routes/dashboard')

app.use(cors())
app.use('/', dashboardRoutes)
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})