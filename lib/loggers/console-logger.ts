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

// const formatObject = (obj: unknown): string => {
//   try {
//     if (obj instanceof Error) {
//       return JSON.stringify({
//         message: obj.message,
//         stack: ENV === 'development' ? obj.stack : undefined,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         ...(obj as any),
//       });
//     }
//     return JSON.stringify(obj, null, ENV === 'development' ? 2 : 0);
//   } catch (error) {
//     return `Error formatting object: ${error}`;
//   }
// };

export class Logger {
  private module: string;

  constructor(module: string) {
    this.module = module;
  }

  private shouldLog(level: LogLevel): boolean {
    if (config.enabled === false) return false;

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

  private formatArgs(args: unknown[]): unknown[] {
    return args.map((arg) => {
      if (arg === null || arg === undefined) return arg;
      if (typeof arg === 'object') {
        return arg;
      }
    });
  }

  log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const formattedArgs = this.formatArgs(args);

    let levelColor;
    const moduleColor = chalk.cyan;

    if (config.colorize) {
      switch (level) {
        case LogLevel.DEBUG:
          levelColor = chalk.blue;
          break;
      }
      const coloredPrefix = `${
        levelColor ? levelColor(level) : level
      } ${moduleColor()}${this.module}`;

      if (level === LogLevel.ERROR) {
        console.error(coloredPrefix, message, ...formattedArgs);
      } else {
        console.log(coloredPrefix, message, ...formattedArgs);
      }
    } else {
      const prefix = `${timestamp} ${level} ${this.module}`;
      if (level === LogLevel.ERROR) {
        console.error(prefix, message, ...formattedArgs);
      } else {
        console.log(prefix, message, ...formattedArgs);
      }
    }
  }

  debug(message: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }
}

export const createLogger = (module: string): Logger => {
  return new Logger(module);
};
