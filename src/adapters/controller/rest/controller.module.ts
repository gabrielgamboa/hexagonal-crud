import { Module } from '@nestjs/common';
import { ConfigServiceModule } from './config/config-usecase.module';
import { BookController } from './book/book.controller';

@Module({
  imports: [ConfigServiceModule.register()],
  controllers: [BookController],
})
export class ControllerModule {}
