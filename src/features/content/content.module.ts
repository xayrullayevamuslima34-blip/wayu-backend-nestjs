import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faqs } from './faqs/faqs.entity';
import { InstagramPost } from './instagram-posts/instagram-posts.entity';
import { SocialLink } from './social-links/social-links.entity';
import { StaticInfo } from './static-info/static-info.entity';
import { UsefulLink } from './useful-links/useful-links.entity';
import { ConfigModule } from '@nestjs/config';
import { FaqsController } from './faqs/faqs.controller';
import { InstagramPostsController } from './instagram-posts/instagram-posts-controller';
import { SocialLinksController } from './social-links/social-links.controller';
import { StaticInfoController } from './static-info/static-info.controller';
import { UsefulLinksController } from './useful-links/useful-links.controller';
import { GetAllFaqsHandler } from './faqs/queries/get-all-faqs/get-all-faqs.handler';
import { GetOneFaqsHandler } from './faqs/queries/get-one-faqs/get-one-faqs.handler';
import { CreateFaqsHandler } from './faqs/commands/create-faqs/create-faqs.handler';
import { UpdateFaqsHandler } from './faqs/commands/update-faqs/update-faqs.handler';
import { DeleteFaqsHandler } from './faqs/commands/delete-faqs/delete-faqs.handler';
import {
  GetAllInstagramPostsHandler,
} from './instagram-posts/queries/get-all-instagram-posts/get-all-instagram-posts.handler';
import {
  GetOneInstagramPostsHandler,
} from './instagram-posts/queries/get-one-instagram-posts/get-one-instagram-posts.handler';
import {
  CreateInstagramPostsHandler,
} from './instagram-posts/commands/create-instagram-posts/create-instagram-posts.handler';
import {
  UpdateInstagramPostsHandler,
} from './instagram-posts/commands/update-instagram-posts/update-instagram-posts.handler';
import {
  DeleteInstagramPostsHandler,
} from './instagram-posts/commands/delete-instagram-posts/delete-instagram-posts.handler';
import { GetAllSocialLinksHandler } from './social-links/queries/get-all-social-links/get-all-social-links.handler';
import { GetOneSocialLinksHandler } from './social-links/queries/get-one-social-links/get-one-social-links.handler';
import { CreateSocialLinksHandler } from './social-links/commands/create-social-links/create-social-links.handler';
import { UpdateSocialLinksHandler } from './social-links/commands/update-social-links/update-social-links.handler';
import { DeleteSocialLinksHandler } from './social-links/commands/delete-social-links/delete-social-links.handler';
import { GetAllStaticInfoHandler } from './static-info/queries/get-all-static-info/get-all-static-info.handler';
import { GetOneStaticInfoHandler } from './static-info/queries/get-one-static-info/get-one-static-info.handler';
import { CreateStaticInfoHandler } from './static-info/commands/create-static-info/create-static-info.handler';
import { UpdateStaticInfoHandler } from './static-info/commands/update-static-info/update-static-info.handler';
import { DeleteStaticInfoHandler } from './static-info/commands/delete-static-info/delete-static-info.handler';
import { GetAllUsefulLinksHandler } from './useful-links/queries/get-all-useful-links/get-all-useful-links.handler';
import { GetOneUsefulLinksHandler } from './useful-links/queries/get-one-useful-links/get-one-useful-links.handler';
import { CreateUsefulLinksHandler } from './useful-links/commands/create-useful-links/create-useful-links.handler';
import { UpdateUsefulLinksHandler } from './useful-links/commands/update-useful-links/update-useful-links.handler';
import { DeleteUsefulLinksHandler } from './useful-links/commands/delete-useful-links/delete-useful-links.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Faqs, InstagramPost, SocialLink,
    StaticInfo, UsefulLink]),
    ConfigModule],

  controllers: [
    FaqsController,
    InstagramPostsController,
    SocialLinksController,
    StaticInfoController,
    UsefulLinksController,
  ],

  providers: [
    GetAllFaqsHandler,
    GetOneFaqsHandler,
    CreateFaqsHandler,
    UpdateFaqsHandler,
    DeleteFaqsHandler,
    GetAllInstagramPostsHandler,
    GetOneInstagramPostsHandler,
    CreateInstagramPostsHandler,
    UpdateInstagramPostsHandler,
    DeleteInstagramPostsHandler,
    GetAllSocialLinksHandler,
    GetOneSocialLinksHandler,
    CreateSocialLinksHandler,
    UpdateSocialLinksHandler,
    DeleteSocialLinksHandler,
    GetAllStaticInfoHandler,
    GetOneStaticInfoHandler,
    CreateStaticInfoHandler,
    UpdateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetAllUsefulLinksHandler,
    GetOneUsefulLinksHandler,
    CreateUsefulLinksHandler,
    UpdateUsefulLinksHandler,
    DeleteUsefulLinksHandler,
  ],
})

export class ContentModule {
}