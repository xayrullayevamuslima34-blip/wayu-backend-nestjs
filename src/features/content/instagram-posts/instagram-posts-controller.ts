import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts.response';
import { GetAllInstagramPostsFilters } from './queries/get-all-instagram-posts/get-all-instagram-posts.filters';
import { GetAllInstagramPostsRequest } from './queries/get-all-instagram-posts/get-all-instagram-posts.request';
import { GetOneInstagramPostsResponse } from './queries/get-one-instagram-posts/get-one-instagram-posts.response';
import { GetOneInstagramPostsRequest } from './queries/get-one-instagram-posts/get-one-instagram-posts.request';
import { CreateInstagramPostsResponse } from './commands/create-instagram-posts/create-instagram-posts.response';
import { CreateInstagramPostsRequest } from './commands/create-instagram-posts/create-instagram-posts.request';
import { CreateInstagramPostsCommand } from './commands/create-instagram-posts/create-instagram-posts.command';
import { UpdateInstagramPostsResponse } from './commands/update-instagram-posts/update-instagram-posts.response';
import { UpdateInstagramPostsRequest } from './commands/update-instagram-posts/update-instagram-posts.request';
import { DeleteInstagramPostsRequest } from './commands/delete-instagram-posts/delete-instagram-posts.request';

@Controller('instagram-posts')
export class InstagramPostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
  async getAll(@Query() filters: GetAllInstagramPostsFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateInstagramPostsResponse })
  async create(
    @Body() payload: CreateInstagramPostsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateInstagramPostsCommand(
      image,
      payload.link,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateInstagramPostsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstagramPostsRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateInstagramPostsRequest();
    cmd.id = id;
    cmd.link = payload.link;
    cmd.image = image;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteInstagramPostsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}