import { Body, Delete, Get, Param, ParseIntPipe, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Express } from 'express';
import internal from 'stream';

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

   @Get('/:key')
   getImageByKey(
       @Param('key', ValidationPipe) key: string,
       @Res() res,
   ): Promise<internal.Readable> {
       return this.imagesService.getImageByKey(key, res)
   }

   @Delete('/:id')
   deleteImageByKey(
       @Param('id', ParseIntPipe) id: number,
       @Body('key') key: string,
   ): Promise<void> {
       return this.imagesService.deleteImageByKey(id, key)
   }
}
