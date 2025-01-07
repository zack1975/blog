import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { UpdateBlogPostDto } from './dto/update-blogpost.dto';
import { BlogPost } from './schemas/blogpost.schema';
import { BlogPostsService } from './posts.service';
export declare class PostsController {
    private blogPostsService;
    constructor(blogPostsService: BlogPostsService);
    listBlogPosts(query: ExpressQuery): Promise<BlogPost[]>;
    getBlogPostById(id: string): Promise<BlogPost>;
    createBlogPost(blogPost: CreateBlogPostDto): Promise<BlogPost>;
    updateBlogPost(blogPost: UpdateBlogPostDto, id: string): Promise<BlogPost>;
    deleteBlogPost(id: string): Promise<{
        deleted: boolean;
    }>;
}
