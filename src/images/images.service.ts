import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from './images.repository';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageEntity } from './image.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImagesRepository)
        private imagesRepository: ImagesRepository
    ) { }

    async createImage(
        createImageDto: CreateImageDto,
        image: Express.Multer.File,
    ): Promise<ImageEntity> {
        return this.imagesRepository.createImage(createImageDto, image)
    }
}