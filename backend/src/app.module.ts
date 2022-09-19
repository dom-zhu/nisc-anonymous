import { Module } from '@nestjs/common';
import { StoriesService } from './services/stories.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/models/entities/comment.entity';
import { StoriesController } from 'src/controllers/app.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { Token } from 'src/models/entities/token.entity';
import { Answer } from 'src/models/entities/answer.entity';
import { AnswerService } from 'src/services/answer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        port: +configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Comment, Token, Answer]),
  ],
  controllers: [StoriesController, AuthController],
  providers: [StoriesService, AuthService, AnswerService],
})
export class AppModule {}
