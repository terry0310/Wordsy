import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardModule } from './modules/flashcard.module';
import { AuthModule } from './modules/auth.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, databaseConfig.options),
    AuthModule,
    FlashcardModule,
  ],
})
export class AppModule {}