import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faqs } from './faqs/faqs.entity';
import { InstagramPost } from './instagram-posts/instagram-posts.entity';
import { SocialLink } from './social-links/social-links.entity';
import { StaticInfo } from './static-info/static-info.entity';
import { UsefulLink } from './useful-links/useful-links.entity';
import { ConfigModule } from '@nestjs/config';
import { FaqsAdminController, FaqsPublicController } from './faqs/faqs.controller';
import {
  InstagramPostsAdminController,
  InstagramPostsPublicController,
} from './instagram-posts/instagram-posts-controller';
import {
  SocialLinksAdminController,
  SocialLinksPublicController,
} from './social-links/social-links.controller';
import { StaticInfoAdminController, StaticInfoPublicController } from './static-info/static-info.controller';
import { GetAllFaqsPublicHandler } from './faqs/public/queries/get-all-faqs/get-all-faqs.public.handler';
import { GetOneFaqsPublicHandler } from './faqs/public/queries/get-one-faqs/get-one-faqs.public.handler';
import { CreateFaqsAdminHandler } from './faqs/admin/commands/create-faqs/create-faqs.admin.handler';
import { UpdateFaqsAdminHandler } from './faqs/admin/commands/update-faqs/update-faqs.admin.handler';
import { DeleteFaqsAdminHandler } from './faqs/admin/commands/delete-faqs/delete-faqs.admin.handler';
import { GetAllFaqsAdminHandler } from '@/features/content/faqs/admin/queries/get-all-faqs/get-all-faqs.admin.handler';
import { GetOneFaqsAdminHandler } from '@/features/content/faqs/admin/queries/get-one-faqs/get-one-faqs.admin.handler';
import {
  UsefulLinksAdminController,
  UsefulLinksPublicController,
} from '@/features/content/useful-links/useful-links.controller';
import {
   GetAllSocialLinksPublicHandler,
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.handler';
import {
  GetAllStaticInfoAdminHandler,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.handler';
import {
  GetAllInstagramPostsAdminHandler
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.handler';
import {
  GetOneInstagramPostsAdminHandler
} from '@/features/content/instagram-posts/admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.handler';
import {
  UpdateInstagramPostsAdminHandler
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.handler';
import {
  DeleteInstagramPostsAdminHandler
} from '@/features/content/instagram-posts/admin/commands/delete-instagram-posts/delete-instagram-posts.admin.handler';
import {
  GetOneInstagramPostsPublicHandler
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.handler';
import {
  GetAllInstagramPostsPublicHandler
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.handler';
import {
  GetOneSocialLinksAdminHandler
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.handler';
import {
  GetAllSocialLinksAdminHandler
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.handler';
import {
  CreateSocialLinksAdminHandler
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.handler';
import {
  UpdateSocialLinksAdminHandler
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.handler';
import {
  DeleteSocialLinksAdminHandler
} from '@/features/content/social-links/admin/commands/delete-social-links/delete-social-links.admin.handler';
import {
  GetOneSocialLinksPublicHandler
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.handler';
import {
  GetOneStaticInfoAdminHandler
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.handler';
import {
  CreateStaticInfoAdminHandler
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.handler';
import {
  UpdateStaticInfoAdminHandler
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.handler';
import {
  GetAllUsefulLinksAdminHandler,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.handler';
import {
  DeleteStaticInfoAdminHandler
} from '@/features/content/static-info/admin/commands/delete-static-info/delete-static-info.admin.handler';
import {
  GetAllStaticInfoPublicHandler
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.handler';
import {
  GetOneStaticInfoPublicHandler
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.handler';
import {
   GetOneUsefulLinksPublicHandler,
} from '@/features/content/useful-links/public/queries/get-one-useful-links/get-one-useful-links.public.handler';
import {
  CreateUsefulLinksAdminHandler,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.handler';
import {
  GetOneUsefulLinksAdminHandler
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.handler';
import {
  UpdateUsefulLinksAdminHandler
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.handler';
import {
  DeleteUsefulLinksAdminHandler
} from '@/features/content/useful-links/admin/commands/delete-useful-links/delete-useful-links.admin.handler';
import {
  GetAllUsefulLinksPublicHandler
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.handler';
import {
  CreateInstagramPostsAdminHandler
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Faqs, InstagramPost, SocialLink,
    StaticInfo, UsefulLink]),
    ConfigModule],

  controllers: [
    FaqsAdminController,FaqsPublicController,
    InstagramPostsAdminController, InstagramPostsPublicController,
    SocialLinksAdminController, SocialLinksPublicController,
    StaticInfoAdminController,  StaticInfoPublicController,
    UsefulLinksAdminController, UsefulLinksPublicController,
  ],

  providers: [
    GetAllFaqsAdminHandler,
    GetOneFaqsAdminHandler,
    CreateFaqsAdminHandler,
    UpdateFaqsAdminHandler,
    DeleteFaqsAdminHandler,
    GetAllFaqsPublicHandler,
    GetOneFaqsPublicHandler,

    GetAllInstagramPostsAdminHandler,
    GetOneInstagramPostsAdminHandler,
    CreateInstagramPostsAdminHandler,
    UpdateInstagramPostsAdminHandler,
    DeleteInstagramPostsAdminHandler,
    GetAllInstagramPostsPublicHandler,
    GetOneInstagramPostsPublicHandler,

    GetAllSocialLinksAdminHandler,
    GetOneSocialLinksAdminHandler,
    CreateSocialLinksAdminHandler,
    UpdateSocialLinksAdminHandler,
    DeleteSocialLinksAdminHandler,
    GetAllSocialLinksPublicHandler,
    GetOneSocialLinksPublicHandler,

    GetAllStaticInfoAdminHandler,
    GetOneStaticInfoAdminHandler,
    CreateStaticInfoAdminHandler,
    UpdateStaticInfoAdminHandler,
    DeleteStaticInfoAdminHandler,
    GetAllStaticInfoPublicHandler,
    GetOneStaticInfoPublicHandler,

    GetAllUsefulLinksAdminHandler,
    GetOneUsefulLinksAdminHandler,
    CreateUsefulLinksAdminHandler,
    UpdateUsefulLinksAdminHandler,
    DeleteUsefulLinksAdminHandler,
    GetAllUsefulLinksPublicHandler,
    GetOneUsefulLinksPublicHandler,
  ],
})

export class ContentModule {
}