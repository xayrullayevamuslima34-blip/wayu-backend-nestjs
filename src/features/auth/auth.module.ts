import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/features/auth/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { AdminAuthController, AdminController } from 'src/features/auth/auth.controller';
import { AdminLoginHandler } from 'src/features/auth/admin/login.handler';
import { CreateAdminHandler } from 'src/features/auth/super-admin/commands/create-super-admin/create-super.admin.handler';
import { UpdateAdminHandler } from 'src/features/auth/super-admin/commands/update-super-admin/update-super.admin.handler';
import { DeleteAdminHandler } from 'src/features/auth/super-admin/commands/delete-super-admin/delete-super.admin.handler';
import {
  GetAllAdminHandler
} from 'src/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.handler';
import {
  GetOneAdminHandler
} from 'src/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), ConfigModule],

  controllers: [AdminController, AdminAuthController],

  providers: [AdminLoginHandler, CreateAdminHandler,
  UpdateAdminHandler, DeleteAdminHandler,
  GetAllAdminHandler, GetOneAdminHandler]
})

export class AuthModule {}