import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailController } from './controllers/mail/mail.controller';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { DnsGuard } from './guards/dns/dns.guard';

@Module({
  imports: [],
  controllers: [AppController, MailController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DnsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
