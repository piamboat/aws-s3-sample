import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { ImagesModule } from './images/images.module';
import { DirectImagesModule } from './direct-images/direct-images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ImagesModule,
    DirectImagesModule,
  ],
})
export class AppModule { }
