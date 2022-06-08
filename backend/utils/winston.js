const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const { combine, timestamp, printf,splat } = winston.format;

const logDir = "./logs";

// 컬러설정
const colors = {
  error: "white redBG",
  warn: " white yellowBG",
  info: "green",
  http: "blue",
  verbose: "megenta",
  debug: "cyan",
  silly: "white",
};

winston.addColors(colors);

const logFormat = printf((info) => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat,
    splat()
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + '/log',
      filename: `log_%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `error_%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      prettyPrint: true,
      showLevel: true,
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        printf((info) => {
          return `${info.timestamp} [${info.level}] ${info.message}`;
        })
      ),
    })
  );
}

module.exports = logger;
