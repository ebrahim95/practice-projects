const logger = require('./utils/logger')
const config = require('./utils/config')
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

server.listen(config.PORT, () => logger.info(`Server running on Port ${config.PORT}`))
