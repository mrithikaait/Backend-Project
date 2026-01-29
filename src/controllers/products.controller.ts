import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 🔹 CREATE PRODUCT WITH SINGLE IMAGE
  @Post('single')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createSingle(@UploadedFile() file, @Body() body) {
    const data = {
      ...body,
      image: file.filename,
    };
    return this.productsService.create(data);
  }

  // 🔹 CREATE PRODUCT WITH MULTIPLE IMAGES
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createMultiple(@UploadedFiles() files, @Body() body) {
    const imageNames = files.map((file) => file.filename);

    const data = {
      ...body,
      images: imageNames,
    };

    return this.productsService.create(data);
  }

  // 🔹 SERVER SIDE LIST WITH FILTER + SORT + PAGINATION  ✅ (MAIN LIST API)
  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query('search') search = '',
    @Query('minPrice') minPrice = '',
    @Query('maxPrice') maxPrice = '',
    @Query('sort') sort = 'asc',
  ) {
    return this.productsService.findAllServer({
      page: Number(page),
      limit: Number(limit),
      search,
      minPrice,
      maxPrice,
      sort,
    });
  }

  // 🔹 GET ONE PRODUCT BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // 🔹 UPDATE PRODUCT WITH SINGLE IMAGE
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @UploadedFile() file, @Body() body) {
    const data = {
      ...body,
      ...(file && { image: file.filename }),
    };
    return this.productsService.update(id, data);
  }

  // 🔹 DELETE PRODUCT
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
