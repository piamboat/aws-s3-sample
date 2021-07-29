import { Body, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageEntity } from './image.entity';

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(ValidationPipe)
    createImage(
        @UploadedFile() image: Express.Multer.File,
        @Body() createImageDto: CreateImageDto,
    ): Promise<ImageEntity> {
        return this.imagesService.createImage(createImageDto, image)
    }

}
