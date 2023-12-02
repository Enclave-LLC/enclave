import winston from "winston"

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    process.env.NODE_ENV == "development" ? winston.format.prettyPrint() : winston.format.json()
  ),
  transports: [new winston.transports.Console()]
})

export default logger
