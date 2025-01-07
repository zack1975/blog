import * as mongoose from 'mongoose';
import { BlogPost } from './schemas/blogpost.schema';
import { Query } from 'express-serve-static-core';
export declare class BlogPostsService {
    private blogPostModel;
    constructor(blogPostModel: mongoose.Model<BlogPost>);
    findAll(query: Query): Promise<BlogPost[]>;
    findById(id: string): Promise<BlogPost>;
    create(post: BlogPost): Promise<BlogPost>;
    updateById(id: string, blogPost: BlogPost): Promise<BlogPost>;
    deleteById(id: string): Promise<{
        deleted: boolean;
    }>;
}
