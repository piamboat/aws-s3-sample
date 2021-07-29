import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesRepository } from './images.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([ImagesRepository]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
