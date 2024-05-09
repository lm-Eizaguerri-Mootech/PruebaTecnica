"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
let LoggerService = class LoggerService {
    constructor() {
        this.createLoggers();
        this.replaceConsole();
    }
    createLoggers() {
        const textFormat = winston_1.format.printf((log) => {
            return `${log.timestamp}- [${log.level.toUpperCase().charAt(0)}] ${log.message}`;
        });
        const dateFormat = winston_1.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
        this.loggerInfo = (0, winston_1.createLogger)({
            level: 'Info',
            format: winston_1.format.combine(dateFormat, textFormat),
            transports: [
                new winston_1.transports.DailyRotateFile({
                    filename: 'log/info/info-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '7d'
                })
            ]
        });
        this.loggerAll = (0, winston_1.createLogger)({
            format: winston_1.format.combine(dateFormat, textFormat),
            transports: [
                new winston_1.transports.DailyRotateFile({
                    filename: 'log/all/all-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '7d'
                }),
                new winston_1.transports.Console()
            ]
        });
    }
    replaceConsole() {
        console.log = (mesagge, params) => {
            if (params) {
                this.loggerInfo.info(mesagge + " " + JSON.stringify(params));
                this.loggerAll.info(mesagge + " " + JSON.stringify(params));
            }
            else {
                this.loggerInfo.info(mesagge + " ");
                this.loggerAll.info(mesagge + " ");
            }
        };
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map