import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './modules/logger/logger.module';


@Module({
  imports: [
    UsersModule,
    LoggerModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
