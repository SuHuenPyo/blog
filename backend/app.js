const express = require('express');
const app = express();
const port = 2800;

//router
const user = require('./routes/user/index');

// modules
const { swaggerUI, specs } = require('./utils/swagger');
const logger = require('./utils/winston');

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))

app.use('/user',user);


app.listen(port,()=>{
    logger.info('Server is Running')
})

module.exports = app;