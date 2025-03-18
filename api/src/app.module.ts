import 'dotenv/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { ProfilesModule } from './profiles/profiles.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UsersMiddleWare } from './users/users.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
      username: process.env.USER || 'postgres',
      password: process.env.PASSWORD || 'postgres',
      database: process.env.DATABASE || 'postgres',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProfilesModule,
    ProjectsModule,
    OrganisationsModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleWare).forRoutes(UsersController);
  }
}
