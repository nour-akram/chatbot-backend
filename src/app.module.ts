import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/User/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    UserModule,
    ChatModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const uri = configService.get<string>('MONGO_DB_CONNECTION_STRING');
        console.log('MongoDB URI:', uri);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { uri };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'chats', method: RequestMethod.POST },
        { path: 'chats', method: RequestMethod.GET },
        { path: 'chats/:chatId/messages', method: RequestMethod.POST },
      );
  }
}
