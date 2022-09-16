import { Module } from '@nestjs/common';
import { StoriesController } from './app.controller';
import { StoriesService } from './stories.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/models/entities/story.entitiy';

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
    TypeOrmModule.forFeature([Story]),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class AppModule {}
