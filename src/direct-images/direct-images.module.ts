import { Module } from '@nestjs/common';
import { DirectImagesController } from './direct-images.controller';
import { DirectImagesService } from './direct-images.service';

@Module({
  controllers: [DirectImagesController],
  providers: [DirectImagesService]
})
export class DirectImagesModule {}
