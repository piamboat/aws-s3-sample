import { Body, Get, Param, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Express } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(ValidationPipe)
    createImage(
        @UploadedFile() image: Express.Multer.File,
        @Body() createImageDto: CreateImageDto,
    ): Promise<string> {
        return this.imagesService.createImage(createImageDto, image)
    }

//    @Get('/:key')
//    getImageByKey(
//        @Param('key', ValidationPipe) key: string,
//    ): Promise<boolean> {
//        return this.imagesService.getImageByKey(key)
//    }
}
