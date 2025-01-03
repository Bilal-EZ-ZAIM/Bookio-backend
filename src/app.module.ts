import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from './uploads/uploads.module';
import { ConfigModule } from '@nestjs/config';
import { BorrowedBookModule } from './borrowed-book/borrowed-book.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aurabilanox:bb4aqlmeJEbdAJaT@cluster0.nph0r.mongodb.net/library',
      {
        connectionFactory: (connection) => {
          mongoose.set('debug', true); // Enable debugging

          connection.on('connected', () => {
            console.log('\x1b[32m%s\x1b[0m', '🎉 MongoDB Connected Successfully!');
          });

          connection.on('connecting', () => {
            console.log('\x1b[33m%s\x1b[0m', '⌛ Connecting to MongoDB...');
          });

          connection.on('disconnected', () => {
            console.log('\x1b[31m%s\x1b[0m', '❌ MongoDB Disconnected');
          });

          connection.on('error', (err) => {
            console.error('\x1b[31m%s\x1b[0m', '🔥 MongoDB Connection Error:', err);
          });

          return connection;
        },
      },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookModule,
    UploadsModule,
    BorrowedBookModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}