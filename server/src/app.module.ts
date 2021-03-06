import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configModule } from './configure.root';

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
