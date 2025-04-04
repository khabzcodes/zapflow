/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const LOG_CONFIG = {
  development: {
    enabled: true,
    minLevel: LogLevel.DEBUG,
    colorize: true,
  },
  production: {
    enabled: true,
    minLevel: LogLevel.INFO,
    colorize: false,
  },
  test: {
    enabled: false,
    minLevel: LogLevel.ERROR,
    colorize: false,
  },
};

const ENV = process.env.NODE_ENV || 'development';
const config = LOG_CONFIG[ENV] || LOG_CONFIG.development;

const formatObject = (obj: any): string => {
  try {
    if (obj instanceof Error) {
      return JSON.stringify(
        {
          message: obj.message,
          stack: ENV === 'development' ? obj.stack : undefined,
          ...(obj as any),
        },
        null,
        ENV === 'development' ? 2 : 0,
      );
    }
    return JSON.stringify(obj, null, ENV === 'development' ? 2 : 0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return '[Circular or Non-Serializable Object]';
  }
};
export class Logger {
  private module: string;

  constructor(module: string) {
    this.module = module;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!config.enabled) return false;

    const levels = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
    ];
    const minLevelIndex = levels.indexOf(config.minLevel);
    const currentLevelIndex = levels.indexOf(level);

    return currentLevelIndex >= minLevelIndex;
  }

  private formatArgs(args: any[]): any[] {
    return args.map((arg) => {
      if (arg === null || arg === undefined) return arg;
      if (typeof arg === 'object') return formatObject(arg);
      return arg;
    });
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const formattedArgs = this.formatArgs(args);

    if (config.colorize) {
      let levelColor;
      const moduleColor = chalk.cyan;
      const timestampColor = chalk.gray;

      switch (level) {
        case LogLevel.DEBUG:
          levelColor = chalk.blue;
          break;
        case LogLevel.INFO:
          levelColor = chalk.green;
          break;
        case LogLevel.WARN:
          levelColor = chalk.yellow;
          break;
        case LogLevel.ERROR:
          levelColor = chalk.red;
          break;
      }

      const coloredPrefix = `${timestampColor(`[${timestamp}]`)} ${levelColor(
        `[${level}]`,
      )} ${moduleColor(`[${this.module}]`)}`;

      if (level === LogLevel.ERROR) {
        console.error(coloredPrefix, message, ...formattedArgs);
      } else {
        console.log(coloredPrefix, message, ...formattedArgs);
      }
    } else {
      // No colors in production
      const prefix = `[${timestamp}] [${level}] [${this.module}]`;

      if (level === LogLevel.ERROR) {
        console.error(prefix, message, ...formattedArgs);
      } else {
        console.log(prefix, message, ...formattedArgs);
      }
    }
  }

  debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }
}

export function createLogger(module: string): Logger {
  return new Logger(module);
}
