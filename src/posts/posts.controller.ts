import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { UpdateBlogPostDto } from './dto/update-blogpost.dto';
import { BlogPost } from './schemas/blogpost.schema';
import { BlogPostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private blogPostsService: BlogPostsService){}

  @Get()
  async listBlogPosts(@Query() query: ExpressQuery): Promise<BlogPost[]> {
    return this.blogPostsService.findAll(query);
  }

  @Get(':id')
  async getBlogPostById(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostsService.findById(id);
  }

  @Post()
  async createBlogPost(
    @Body()
    blogPost: CreateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostsService.create(blogPost);
  }

  @Put(':id')
  async updateBlogPost(
    @Body()
    blogPost: UpdateBlogPostDto,
    @Param('id')
    id: string
  ): Promise<BlogPost>{
    await this.blogPostsService.findById(id);

    return this.blogPostsService.findByIdAndUpdate(id, blogPost);
  }

  @Delete(':id')
  async deleteBlogPost(
    @Param('id')
    id: string
  ): Promise<{ deleted: boolean }> {
    await this.blogPostsService.findById(id);
    const res = this.blogPostsService.deleteById(id);

    if (!res) {
      return { deleted: false };
    }

    return { deleted: true };
  }
}
