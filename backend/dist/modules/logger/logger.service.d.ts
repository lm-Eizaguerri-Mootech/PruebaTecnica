import 'winston-daily-rotate-file';
export declare class LoggerService {
    private loggerInfo;
    private loggerError;
    private loggerWarn;
    private loggerAll;
    constructor();
    createLoggers(): void;
    replaceConsole(): void;
}
