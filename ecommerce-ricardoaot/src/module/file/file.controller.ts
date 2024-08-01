import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '../products/products.service';
import { AuthGuard } from '../../guards/auth.guards';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  

  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  

  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    //@Body() createFileDto: CreateFileDto 
    @Param('id', ParseUUIDPipe) id: string,   
    @UploadedFile() file: Express.Multer.File,
  ) {
    const cloudinaryResult = await this.cloudinaryService.uploadImage(file);
    const {url} = cloudinaryResult
    
    const product = await this.productsService.updateProduct(
      {imgUrl:url},
      id
    )
    console.log(cloudinaryResult)
    console.log(product)
    return cloudinaryResult
  }

}
