/** Log levels */
export type LogLevel = "log" | "warn" | "error";

/** Log messages */
export type LogMessage = string | object | [] | boolean;

/** Signature of a logging function */
export interface LogFn {
  (message?: LogMessage, ...optionalParams: LogMessage[]): void;
}

/** Basic logger interface */
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

const NO_OP: LogFn = (
  _message?: LogMessage,
  ..._optionalParams: LogMessage[]
) => {};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    if (level === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === "warn") {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console);
  }
}
