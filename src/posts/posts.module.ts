import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { BlogPostsService } from './posts.service';
import { BlogPostSchema } from './schemas/blogpost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  controllers: [PostsController],
  providers: [BlogPostsService],
  exports: [MongooseModule],
})
export class PostsModule {}
