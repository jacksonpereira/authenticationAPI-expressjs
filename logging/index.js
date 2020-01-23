const {
    createLogger,
    format,
    transports
} = require('winston');

module.exports = () => {
    const logger = createLogger({
        defaultMeta: {
            service: 'authenticationAPI'
        },
        format: format.combine(
            // ignorePrivate(),
            format.json(),
        ),
        transports: [
            new transports.File({
                filename: 'authenticationAPI.log'
            })
        ]
    });

    return {
        error: (method, hostname, url, message) => {
            // logger.error(`Error ${timestamp} ${service} ${method} ${hostname} ${url} ${message}`);
            logger.error({
                timestamp: new Date(),
                level: 'Error',
                service: logger.defaultMeta.service,
                method: method,
                originHostname: hostname,
                url: url,
                message: message
            });
        },
        // logger.info(`Error ${timestamp} ${service} ${method} ${hostname} ${url} ${message}`);
        info: (method, hostname, url, message) => {
            logger.info({
                timestamp: new Date(),
                level: 'Info',
                service: logger.defaultMeta.service,
                method: method,
                originHostname: hostname,
                url: url,
                message: message
            });
        },
        // logger.warning(`Error ${timestamp} ${service} ${method} ${hostname} ${url} ${message}`);
        warning: (method, hostname, url, message) => {
            logger.warning({
                timestamp: new Date(),
                level: 'Warning',
                service: logger.defaultMeta.service,
                method: method,
                originHostname: hostname,
                url: url,
                message: message
            });
        }
    }
}