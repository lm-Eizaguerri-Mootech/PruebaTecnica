import { Injectable } from '@nestjs/common';
import { Logger, format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {


  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor(){
    this.createLoggers()
    this.replaceConsole()
  }

  createLoggers(){

    const textFormat = format.printf((log) => {
      return `${log.timestamp}- [${log.level.toUpperCase().charAt(0)}] ${log.message}`;
    })

    const dateFormat = format.timestamp({
      format:'YYYY-MM-DD HH:mm:ss'
    })

    this.loggerInfo = createLogger({
      level: 'Info',
      format: format.combine(
        dateFormat,
        textFormat
      ),
      transports:[
        new transports.DailyRotateFile({
          filename: 'log/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d'
        })
      ]
    });
    ////////////

    this.loggerAll = createLogger({
      format: format.combine(
        dateFormat,
        textFormat
      ),
      transports:[
        new transports.DailyRotateFile({
          filename: 'log/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d'
        }),
        new transports.Console()
      ]
    });
  }

  replaceConsole(){

    console.log = (mesagge: any, params: any) =>{
      if(params){
        this.loggerInfo.info(mesagge + " " +JSON.stringify(params));
        this.loggerAll.info(mesagge + " " +JSON.stringify(params));
      }else{
        this.loggerInfo.info(mesagge + " ");
        this.loggerAll.info(mesagge + " ");
      }
    }
  }

}
