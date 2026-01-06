import winston from "winston";
import vars from "./vars";

const { release_mode, logfile } = vars;

function releaseMode(release_mode: string) {
  switch (release_mode) {
    case "dev":
      return "debug";
    case "prod":
      return "error";
  }
}

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp as string}] ${level}: ${message as string}`;
});

const transports: winston.transport[] = [new winston.transports.Console()];

if (logfile) {
  transports.push(new winston.transports.File({ filename: logfile }));
}

const loggerConfig = {
  level: releaseMode(release_mode),
  format: combine(
    winston.format((info) => ({
      ...info,
      level: info.level.toUpperCase(),
    }))(),
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: transports,
};

const logger = winston.createLogger(loggerConfig);

export default logger;
