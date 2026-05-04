import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllBooksResponse } from './queries/get-all-books/get-all-books.response';
import { GetAllBookFilters } from './queries/get-all-books/get-all-book.filters';
import { GetAllBooksRequest } from './queries/get-all-books/get-all-books.request';
import { GetOneBooksResponse } from './queries/get-one-books/get-one-books.response';
import { GetOneBooksRequest } from './queries/get-one-books/get-one-books.request';
import { CreateBooksRequest } from './commands/create-books/create-books.request';
import { CreateBooksResponse } from './commands/create-books/create-books.response';
import { CreateBooksCommand } from './commands/create-books/create-books.command';
import { UpdateBooksResponse } from './commands/update-books/update-books.response';
import { UpdateBooksRequest } from './commands/update-books/update-books.request';
import { DeleteBooksRequest } from './commands/delete-books/delete-books.request';

@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllBooksResponse] })
  async getAll(@Query() filters: GetAllBookFilters) {
    return await this.queryBus.execute(new GetAllBooksRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBooksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBooksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ], { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiCreatedResponse({ type: CreateBooksResponse })
  async create(
    @Body() payload: CreateBooksRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file = files.file?.[0];

    const cmd = new CreateBooksCommand(
      payload.authorId,
      payload.categoryId,
      payload.title,
      payload.pages,
      payload.year,
      payload.description,
      image,
      file,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file && fs.existsSync(file.path)) fs.rmSync(file.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ], { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiOkResponse({ type: UpdateBooksResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBooksRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file = files.file?.[0];

    const cmd = new UpdateBooksRequest();
    cmd.id = id;
    cmd.authorId = payload.authorId;
    cmd.categoryId = payload.categoryId;
    cmd.title = payload.title;
    cmd.description = payload.description;
    cmd.pages = payload.pages;
    cmd.year = payload.year;
    cmd.image = image;
    cmd.file = file;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file && fs.existsSync(file.path)) fs.rmSync(file.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBooksRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}