import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BlogPost } from './schemas/blogpost.schema'; 
import { Query } from 'express-serve-static-core';

@Injectable()
export class BlogPostsService {
  
  constructor(
    @InjectModel(BlogPost.name)
    private blogPostModel: mongoose.Model<BlogPost>,
  ){}

  async findAll(query: Query): Promise<BlogPost[]> {

    const keyword = query.author
      ? {
          author: query.author,
        }
      : {};
    const sort = query.author ? { createdAt: 1 } : {};

    const itemsPerPage = Number(query.limit) || 10;
    const currentPage = Number(query.offset) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    const posts = await this.blogPostModel
      .find({ ...keyword })
      .limit(itemsPerPage)
      .skip(skip)
      .sort(sort as any);
    return posts;
  }

  async findById(id: string): Promise<BlogPost> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(
        'Invalid ID format, please enter a valid ID',
      );
    }

    const blogPost = await this.blogPostModel.findById(id);

    if (!blogPost) {
      throw new NotFoundException('Post not found');
    }

    return blogPost;
  }

  async create(post: BlogPost): Promise<BlogPost> {
    return await this.blogPostModel.create(post);
  }

  async findByIdAndUpdate(id: string, blogPost: BlogPost): Promise<BlogPost> {

    return await this.blogPostModel.findByIdAndUpdate(id, blogPost, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    return await this.blogPostModel.findByIdAndDelete(id);
  }
}
