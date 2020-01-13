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
                filename: 'log.log'
            })
        ]
    });

    return {
        error: (timestamp, method, url, hostname, message) => {
            // logger.error(`Error ${timestamp} ${method} ${url} ${hostname} ${message}`);
            logger.error({
                timestamp: timestamp,
                level: 'Error',
                method: method,
                url: url,
                hostname: hostname,
                message: message
            });
        },
        info: (timestamp, method, url, hostname, message) => {
            logger.info(timestamp(), {
                timestamp: timestamp,
                level: 'Info',
                method: method,
                url: url,
                hostname: hostname,
                message: message
            });
        },
        warning: (timestamp, method, url, hostname, message) => {
            logger.warning(timestamp(), {
                timestamp: timestamp,
                level: 'Warning',
                method: method,
                url: url,
                hostname: hostname,
                message: message
            });
        }
    }
}