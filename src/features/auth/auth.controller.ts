import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';
import {
  GetAllAdminResponse,
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.response';
import {
  GetAllAdminFilters,
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.filters';
import {
  GetAllAdminRequest,
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.request';
import {
  GetOneAdminResponse,
} from '@/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.response';
import {
  GetOneAdminRequest,
} from '@/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.request';
import {
  CreateAdminResponse,
} from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.response';
import { CreateAdminRequest } from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.request';
import { CreateAdminCommand } from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.command';
import {
  UpdateAdminResponse,
} from '@/features/auth/super-admin/commands/update-super-admin/update-super.admin.response';
import { UpdateAdminRequest } from '@/features/auth/super-admin/commands/update-super-admin/update-super.admin.request';
import { DeleteAdminRequest } from '@/features/auth/super-admin/commands/delete-super-admin/delete-super.admin.request';
import { AdminLoginRequest } from '@/features/auth/admin/login.request';
import { AdminLoginResponse } from '@/features/auth/admin/login.response';
import { AdminLoginCommand } from '@/features/auth/admin/login.command';


// @Roles(Role.SuperAdmin)
// @ApiBearerAuth()
@Controller('admin-creating')
export class AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllAdminResponse] })
  async getAll(@Query() filters: GetAllAdminFilters) {
    return await this.queryBus.execute(new GetAllAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateAdminResponse })
  async create(
    @Body() payload: CreateAdminRequest,
  ) {
    const cmd = new CreateAdminCommand(
      payload.role,
      payload.fullName,
      payload.login,
      payload.password,
      payload.loginType,
      payload.isActive,
      payload.birthDate,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAdminRequest,
  ) {
    const cmd = new UpdateAdminRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.password = payload.password;
    cmd.birthDate = payload.birthDate;
    cmd.isActive = payload.isActive;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Roles(Role.SuperAdmin)
@Controller('login/admin')
export class AdminAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() loginRequest: AdminLoginRequest): Promise<AdminLoginResponse> {
    const command = new AdminLoginCommand(
      loginRequest.login,
      loginRequest.password,
    );

    return await this.commandBus.execute(command);
  }
}