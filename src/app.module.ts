import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmConfigService } from './config/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    //TypeOrmModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      //useFactory: (configService: ConfigService) =>
      //<ConnectionOptions>{
      //type: configService.get<string>('database.type'),
      //host: configService.get<string>('database.host'),
      //port: configService.get<number>('database.port'),
      //username: configService.get<string>('database.user'),
      //password: configService.get<string>('database.password'),
      //database: configService.get<string>('database.database'),
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //synchronize: true,
      //},
      //inject: [ConfigService],
      //useFactory: async () => await getConnectionOptions(),
    }),
    UsersModule,
    LocationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
