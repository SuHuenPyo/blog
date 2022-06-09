const express = require('express');
const app = express();
const port = 3300;

//router
const user = require('./routes/user/index');

// modules
const { swaggerUI, specs } = require('./utils/swagger');
const logger = require('./utils/winston');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/user',user);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))



app.listen(port,()=>{
    logger.info('Server is Running')
})

module.exports = app;