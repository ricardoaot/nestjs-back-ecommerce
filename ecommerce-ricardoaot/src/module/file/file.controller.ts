import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '../products/products.service';
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
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

/*
  const cloudinaryResult = await this.cloudinaryService.uploadImage(file);
  const { url } = cloudinaryResult;

  const updateProduct = await this.fileService.uploadProductImage(id, url);
  return updateProduct;
*/ 


  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
